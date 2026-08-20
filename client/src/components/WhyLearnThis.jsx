/**
 * WhyLearnThis.jsx — optional, skippable "why does this topic matter" link
 * for the quiz setup screen.
 *
 * Renders a small toggle link ("Why learn this?"). Clicking it expands a
 * panel with:
 *   1. A real, specific, hand-written reason the topic is worth learning
 *      (from ../data/topicMotivation.json, keyed by short topic id).
 *   2. "Builds on" — the topic's direct prerequisites, checked off if
 *      already mastered — and "Unlocks" — what it directly leads to, each
 *      showing a live "N of M ready" count. Both computed from the
 *      prerequisite graph and GET /api/mastery, the same signal used by
 *      the Learning Journey view and the Topic Connections map, so a
 *      student sees one consistent story everywhere, not three.
 *
 * If `onNavigate` is passed (usually the screen's own `setMode`), chips
 * are clickable and jump straight into that topic's quiz. Without it,
 * they render as plain, non-interactive labels — still informative, just
 * not a shortcut.
 *
 * Mastery is fetched lazily, only once the panel is actually opened —
 * this component lives on 63 quiz screens, most never opened in a given
 * session, so there's no reason to fire a fetch on every mount.
 *
 * Never blocks the Start button. A topic with no `why` entry renders
 * nothing at all — same fail-safe behavior as KeyTerms.jsx.
 */

import { useState, useEffect } from 'react'
import topicMotivation from '../data/topicMotivation.json'
import { getPrerequisites, getUnlocks, getTopicLabel } from '../lib/prerequisiteGraph'
import { fetchMasterySet, unlockReadiness, isMockMasteryActive, logEvent } from '../lib/masteryClient'
import { useStudyMode } from '../lib/studyMode'
import WhyDemo from '../lib/whyDemos.jsx'

const MAX_CHIPS = 5

function PrereqChips({ ids, mastered, onNavigate }) {
  if (!ids || ids.length === 0) return null
  const shown = ids.slice(0, MAX_CHIPS)
  const overflow = ids.length - shown.length
  return (
    <div className="why-panel-chip-row">
      <span className="why-panel-chip-label">Builds on</span>
      <div className="why-panel-chips">
        {shown.map(id => {
          const isMastered = mastered && mastered.has(id)
          const label = (isMastered ? '✓ ' : '') + getTopicLabel(id)
          return onNavigate ? (
            <button
              key={id}
              type="button"
              className={'why-chip why-chip-clickable' + (isMastered ? ' why-chip-mastered' : '')}
              onClick={() => { logEvent('prereq_chip_clicked', id, { mastered: !!isMastered }); onNavigate(id) }}
              title={isMastered ? `Already mastered` : `Go to ${getTopicLabel(id)}`}
            >
              {label}
            </button>
          ) : (
            <span key={id} className={'why-chip' + (isMastered ? ' why-chip-mastered' : '')}>{label}</span>
          )
        })}
        {overflow > 0 && <span className="why-chip why-chip-more">+{overflow} more</span>}
      </div>
    </div>
  )
}

function UnlockChips({ ids, mastered, onNavigate }) {
  if (!ids || ids.length === 0) return null
  const targets = ids
    .map(id => ({ id, label: getTopicLabel(id), ...unlockReadiness(id, mastered) }))
    .sort((a, b) => (b.ready / b.total) - (a.ready / a.total))
  const shown = targets.slice(0, MAX_CHIPS)
  const overflow = targets.length - shown.length
  return (
    <div className="why-panel-chip-row">
      <span className="why-panel-chip-label">Unlocks</span>
      <div className="why-panel-chips">
        {shown.map(t => {
          const ready = mastered ? ` · ${t.ready}/${t.total} ready` : ''
          return onNavigate ? (
            <button
              key={t.id}
              type="button"
              className={'why-chip why-chip-clickable' + (t.ready >= t.total && mastered ? ' why-chip-mastered' : '')}
              onClick={() => { logEvent('unlock_chip_clicked', t.id, { ready: t.ready, total: t.total }); onNavigate(t.id) }}
              title={`Go to ${t.label}`}
            >
              {t.label}{ready}
            </button>
          ) : (
            <span key={t.id} className="why-chip">{t.label}{ready}</span>
          )
        })}
        {overflow > 0 && <span className="why-chip why-chip-more">+{overflow} more</span>}
      </div>
    </div>
  )
}

/**
 * The second and third beats: "…but how?" reveals the mechanism, and the
 * demo (if the topic has one) lets the student move a number and watch the
 * claim hold. Kept behind a click so the panel still opens short — a
 * student who just wanted the one-line reason is not made to scroll past a
 * widget to reach the chips below.
 */
function WhyDeeper({ topicId, how, demoKind }) {
  const [open, setOpen] = useState(false)
  if (!how && !demoKind) return null

  return (
    <div className="why-deeper">
      <button
        type="button"
        className={'why-deeper-toggle' + (open ? ' is-open' : '')}
        aria-expanded={open}
        onClick={() => {
          const next = !open
          setOpen(next)
          if (next) logEvent('why_deeper_opened', topicId, { demo: demoKind || null })
        }}
      >
        …but how? <span className="why-link-caret" aria-hidden="true">{open ? '▴' : '▾'}</span>
      </button>
      {open && (
        <div className="why-deeper-body">
          {how && <p className="why-deeper-text">{how}</p>}
          <WhyDemo kind={demoKind} />
        </div>
      )}
    </div>
  )
}

export default function WhyLearnThis({ topicId, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mastered, setMastered] = useState(null)
  const { isFocusActive } = useStudyMode()

  useEffect(() => {
    if (!isOpen || mastered !== null) return
    fetchMasterySet().then(setMastered)
  }, [isOpen, mastered])

  // Every bail-out below has to sit *after* the hooks above — the data read
  // can return null, and doing that before useEffect changes hook order
  // between renders.
  let why = null
  let how = null
  let demoKind = null
  let readFailed = false
  try {
    if (topicId && typeof topicId === 'string' && topicMotivation && typeof topicMotivation === 'object') {
      const entry = topicMotivation[topicId]
      why = entry?.why || null
      how = entry?.how || null
      demoKind = entry?.demo?.kind || null
    }
  } catch (err) {
    if (typeof console !== 'undefined' && console.warn) {
      console.warn('WhyLearnThis: failed to read data, hiding.', err)
    }
    readFailed = true
  }
  if (readFailed) return null

  // Focus Mode hides this outright. The "Builds on / Unlocks" chips are
  // navigation into other topics, which is precisely what a student
  // revising for an exam turned Focus Mode on to avoid.
  if (isFocusActive) return null

  if (!why) return null

  let prereqIds = []
  let unlockIds = []
  try {
    prereqIds = getPrerequisites(topicId)
    unlockIds = getUnlocks(topicId)
  } catch { /* graph lookup is best-effort; panel still works with just `why` */ }

  const panelId = `why-learn-this-panel-${topicId}`

  return (
    <div className="why-learn-this">
      <button
        type="button"
        className="why-link"
        onClick={() => {
          const next = !isOpen
          setIsOpen(next)
          if (next) logEvent('why_panel_opened', topicId)
        }}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        Why learn this?
        <span className="why-link-caret" aria-hidden="true">{isOpen ? '▴' : '▾'}</span>
        {isOpen && isMockMasteryActive() && <span className="dev-mock-badge" style={{ marginLeft: 8 }}>🧪 mock</span>}
      </button>
      {isOpen && (
        <div id={panelId} className="why-panel" role="region" aria-live="polite">
          <p className="why-panel-text">{why}</p>
          <WhyDeeper topicId={topicId} how={how} demoKind={demoKind} />
          <PrereqChips ids={prereqIds} mastered={mastered} onNavigate={onNavigate} />
          <UnlockChips ids={unlockIds} mastered={mastered} onNavigate={onNavigate} />
        </div>
      )}
    </div>
  )
}
