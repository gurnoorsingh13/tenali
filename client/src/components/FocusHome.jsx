/**
 * FocusHome.jsx — what the Home screen becomes in Focus Mode.
 *
 * Replaces the three banners, the search bar and the ~60-card grid with
 * only the topics the student said they're revising. Two states:
 *
 *   1. Picker  — no topics chosen yet. Multi-select, because revising for
 *                an exam is almost never one topic.
 *   2. Board   — the chosen topics as big cards, straight into the quiz.
 *
 * The one real design decision here: picking a topic drops the student
 * *into that topic*, not at the bottom of its prerequisite ladder.
 * `computeGoalPath` can hand back six ancestors on the way to Quadratics,
 * which is the right answer for someone planning a term and the wrong one
 * for someone with an exam on Friday. The ladder is still computed and
 * still offered — collapsed, under "Shaky on the basics?" — so it's there
 * for a student who discovers they need it, without standing between them
 * and the topic they actually came to practise.
 *
 * Topic ids here are prerequisiteGraph ids, which are also valid `modeMap`
 * keys (verified: all 69 graph ids resolve), so `onSelect(id)` launches the
 * quiz with no translation layer.
 */

import { useEffect, useMemo, useState } from 'react'
import {
  getAllTopicKeys,
  getTopicLabel,
  getTopicCategory,
  computeGoalPath,
} from '../lib/prerequisiteGraph'
import { fetchMasterySet, logEvent } from '../lib/masteryClient'
import { useStudyMode } from '../lib/studyMode'
import './StudyMode.css'

const CATEGORY_LABELS = {
  arith: 'Arithmetic',
  numth: 'Number Theory',
  alg: 'Algebra',
  geom: 'Geometry',
  stats: 'Statistics & Probability',
  calc: 'Calculus',
  vecmat: 'Vectors & Matrices',
  other: 'Other',
}
const CATEGORY_ORDER = ['arith', 'numth', 'alg', 'geom', 'stats', 'calc', 'vecmat', 'other']

function groupByCategory(ids) {
  const groups = {}
  ids.forEach((id) => {
    const cat = getTopicCategory(id)
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(id)
  })
  Object.values(groups).forEach((list) =>
    list.sort((a, b) => getTopicLabel(a).localeCompare(getTopicLabel(b)))
  )
  return CATEGORY_ORDER.filter((c) => groups[c]).map((c) => ({
    cat: c,
    label: CATEGORY_LABELS[c] || c,
    topics: groups[c],
  }))
}

/* ── Picker ──────────────────────────────────────────────────────────── */

function TopicPicker({ initial, onConfirm, onCancel }) {
  const [chosen, setChosen] = useState(() => new Set(initial || []))
  const [query, setQuery] = useState('')

  const allTopics = useMemo(() => getAllTopicKeys(), [])
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return allTopics
    return allTopics.filter((id) => getTopicLabel(id).toLowerCase().includes(q))
  }, [allTopics, query])
  const groups = useMemo(() => groupByCategory(visible), [visible])

  const toggle = (id) => {
    setChosen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="focus-home">
      <div className="focus-home-head">
        <span className="focus-home-badge">🎯 Focus Mode</span>
        <h2 className="focus-home-title">What are you revising?</h2>
        <p className="focus-home-sub">
          Pick the topics on your exam. Everything else gets out of the way until
          you switch back.
        </p>
      </div>

      <input
        className="focus-picker-search"
        type="text"
        placeholder="Search topics…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search topics"
      />

      {chosen.size > 0 && (
        <div className="focus-picker-chosen">
          {[...chosen].map((id) => (
            <button
              key={id}
              type="button"
              className="focus-chip is-chosen"
              onClick={() => toggle(id)}
              title="Remove"
            >
              {getTopicLabel(id)} <span aria-hidden="true">✕</span>
            </button>
          ))}
        </div>
      )}

      <div className="focus-picker-groups">
        {groups.map((g) => (
          <section key={g.cat} className="focus-picker-group">
            <h3 className="focus-picker-group-title">{g.label}</h3>
            <div className="focus-picker-chip-row">
              {g.topics.map((id) => (
                <button
                  key={id}
                  type="button"
                  className={`focus-chip${chosen.has(id) ? ' is-chosen' : ''}`}
                  aria-pressed={chosen.has(id)}
                  onClick={() => toggle(id)}
                >
                  {getTopicLabel(id)}
                </button>
              ))}
            </div>
          </section>
        ))}
        {groups.length === 0 && (
          <p className="focus-empty">No topic matches “{query}”.</p>
        )}
      </div>

      <div className="focus-home-actions">
        <button
          type="button"
          className="focus-btn-primary"
          disabled={chosen.size === 0}
          onClick={() => onConfirm([...chosen])}
        >
          {chosen.size === 0
            ? 'Pick at least one topic'
            : `Start revising ${chosen.size} topic${chosen.size === 1 ? '' : 's'}`}
        </button>
        <button type="button" className="focus-btn-quiet" onClick={onCancel}>
          Back to Explore
        </button>
      </div>
    </div>
  )
}

/* ── Board ───────────────────────────────────────────────────────────── */

function FocusBoard({ topics, mastered, onSelect, onChangeTopics, onExit }) {
  const [showLadder, setShowLadder] = useState(false)

  const doneCount = topics.filter((id) => mastered.has(id)).length
  const pct = topics.length ? Math.round((doneCount / topics.length) * 100) : 0

  // Prerequisites the student hasn't mastered, across everything they're
  // revising. Each computeGoalPath result is already topologically ordered,
  // so merging them de-duplicated by first appearance keeps a sequence that
  // is valid to work through top to bottom.
  const ladder = useMemo(() => {
    const chosen = new Set(topics)
    const seen = new Set()
    const out = []
    topics.forEach((goal) => {
      computeGoalPath(goal, mastered).steps.forEach((s) => {
        if (s.mastered || chosen.has(s.id) || seen.has(s.id)) return
        seen.add(s.id)
        out.push(s)
      })
    })
    return out
  }, [topics, mastered])

  return (
    <div className="focus-home">
      <div className="focus-home-head">
        <span className="focus-home-badge">🎯 Focus Mode</span>
        <h2 className="focus-home-title">
          {doneCount === topics.length
            ? 'All revised — nice work.'
            : 'Your revision list'}
        </h2>
        <p className="focus-home-sub">
          {doneCount} of {topics.length} done · extras are hidden until you switch back
        </p>
        <div className="focus-progress-track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className="focus-progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="focus-topic-grid">
        {topics.map((id) => {
          const done = mastered.has(id)
          return (
            <button
              key={id}
              type="button"
              className={`focus-topic-card${done ? ' is-done' : ''}`}
              onClick={() => { logEvent('focus_topic_started', id); onSelect(id) }}
            >
              <span className="focus-topic-name">{getTopicLabel(id)}</span>
              <span className="focus-topic-state">
                {done ? '✅ Practised' : 'Practise →'}
              </span>
            </button>
          )
        })}
      </div>

      {ladder.length > 0 && (
        <div className="focus-ladder">
          <button
            type="button"
            className="focus-ladder-toggle"
            aria-expanded={showLadder}
            onClick={() => {
              setShowLadder((v) => !v)
              if (!showLadder) logEvent('focus_ladder_opened', null, { count: ladder.length })
            }}
          >
            {showLadder ? '▾' : '▸'} Shaky on the basics? {ladder.length} earlier
            topic{ladder.length === 1 ? '' : 's'} feed into your list
          </button>
          {showLadder && (
            <>
              <p className="focus-ladder-note">
                Optional — only worth a detour if the topics above aren’t clicking.
              </p>
              <div className="focus-picker-chip-row">
                {ladder.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className="focus-chip"
                    onClick={() => { logEvent('focus_ladder_topic_started', s.id); onSelect(s.id) }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <div className="focus-home-actions">
        <button type="button" className="focus-btn-quiet" onClick={onChangeTopics}>
          Change topics
        </button>
        <button type="button" className="focus-btn-quiet" onClick={onExit}>
          Leave Focus Mode
        </button>
      </div>
    </div>
  )
}

/* ── Entry ───────────────────────────────────────────────────────────── */

export default function FocusHome({ onSelect }) {
  const { focusTopics, setFocusTopics, exitFocusMode } = useStudyMode()
  const [editing, setEditing] = useState(false)
  const [mastered, setMastered] = useState(() => new Set())

  useEffect(() => {
    let cancelled = false
    fetchMasterySet().then((set) => { if (!cancelled) setMastered(set) })
    return () => { cancelled = true }
  }, [focusTopics])

  if (editing || focusTopics.length === 0) {
    return (
      <TopicPicker
        initial={focusTopics}
        onConfirm={(topics) => {
          setFocusTopics(topics)
          setEditing(false)
          logEvent('focus_topics_set', null, { topics, count: topics.length })
        }}
        onCancel={() => {
          setEditing(false)
          // Cancelling out of the very first pick means they never really
          // entered Focus Mode — send them back rather than leaving them on
          // an empty board.
          if (focusTopics.length === 0) exitFocusMode()
        }}
      />
    )
  }

  return (
    <FocusBoard
      topics={focusTopics}
      mastered={mastered}
      onSelect={onSelect}
      onChangeTopics={() => setEditing(true)}
      onExit={exitFocusMode}
    />
  )
}
