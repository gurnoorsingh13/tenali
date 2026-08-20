/**
 * LearningMapApp.jsx — "Topic Connections": a live, animated dependency
 * graph of every math topic in Tenali, laid out by prerequisite depth
 * (a plain topological-order computation, no layout library — everything
 * traces back to one root, basicarith, so it reads as a genuine funnel).
 *
 * - Hover a node: its prerequisite chain lights up gold, everything it
 *   unlocks lights up blue, everything else dims.
 * - Click a node: jump straight into that topic's quiz (onNavigate).
 * - Nodes glow by mastery, read from GET /api/mastery: mastered topics
 *   glow bright and pulse; topics whose prerequisites are all mastered
 *   are lit normally; topics still missing prerequisites sit dimmer.
 * - Everything "emerges" on load — columns fade/rise in left to right,
 *   edges draw themselves in after their endpoints appear.
 *
 * Data comes entirely from ./lib/prerequisiteGraph.js (already the single
 * source of truth used by WhyLearnThis and the Learning Journey view).
 */

import { useState, useEffect, useMemo, useRef } from 'react';
import {
  getAllTopicKeys,
  getPrerequisites,
  getUnlocks,
  getTopicLabel,
  getTopicCategory,
  computeGoalPath,
} from './lib/prerequisiteGraph';
import { fetchMasterySet, isMockMasteryActive, logEvent, getSavedGoal, saveGoal } from './lib/masteryClient';
import './LearningMapApp.css';

const CAT_COLOR = {
  arith: '#ef5350',
  numth: '#8d6e63',
  alg: '#ab47bc',
  geom: '#42a5f5',
  calc: '#66bb6a',
  stats: '#ffa726',
  vecmat: '#26c6da',
  other: '#78909c',
};

const CAT_NAMES = { arith: 'Arithmetic', numth: 'Number Theory', alg: 'Algebra', geom: 'Geometry', calc: 'Calculus', stats: 'Stats & Prob', vecmat: 'Vectors & Matrices' };

const COL_W = 200;
const ROW_H = 84;
const NODE_W = 168;
const NODE_H = 58;
const PAD = 60;
const ROOT_ID = 'basicarith';
const TOUR_SEEN_KEY = 'tenali-graph-tour-seen';

function buildLayout() {
  const ids = getAllTopicKeys().filter((id) => getTopicCategory(id) !== 'other');

  // Depth = longest prerequisite chain leading to this node (0 = no prereqs).
  const depthCache = {};
  function depthOf(id) {
    if (depthCache[id] !== undefined) return depthCache[id];
    depthCache[id] = 0; // guard against any accidental cycle
    const prereqs = getPrerequisites(id).filter((p) => ids.includes(p));
    const d = prereqs.length === 0 ? 0 : 1 + Math.max(...prereqs.map(depthOf));
    depthCache[id] = d;
    return d;
  }
  ids.forEach(depthOf);

  const columns = {};
  ids.forEach((id) => {
    const d = depthCache[id];
    (columns[d] = columns[d] || []).push(id);
  });
  Object.values(columns).forEach((col) =>
    col.sort((a, b) => getTopicCategory(a).localeCompare(getTopicCategory(b)) || getTopicLabel(a).localeCompare(getTopicLabel(b)))
  );

  const maxDepth = Math.max(...Object.keys(columns).map(Number));
  const maxRows = Math.max(...Object.values(columns).map((c) => c.length));

  const pos = {};
  for (let d = 0; d <= maxDepth; d++) {
    const col = columns[d] || [];
    const colHeight = col.length * ROW_H;
    const offsetY = (maxRows * ROW_H - colHeight) / 2;
    col.forEach((id, i) => {
      pos[id] = {
        x: PAD + d * COL_W,
        y: PAD + offsetY + i * ROW_H,
        depth: d,
      };
    });
  }

  const width = PAD * 2 + (maxDepth + 1) * COL_W;
  const height = PAD * 2 + maxRows * ROW_H;

  const edges = [];
  ids.forEach((id) => {
    getPrerequisites(id).forEach((src) => {
      if (pos[src] && pos[id]) edges.push({ src, tgt: id });
    });
  });

  return { ids, pos, edges, width, height, maxDepth };
}

export default function LearningMapApp({ onBack, onNavigate, focusTopicId, celebrateTopicId }) {
  const layout = useMemo(buildLayout, []);
  const [hovered, setHovered] = useState(focusTopicId || null);
  const [mastery, setMastery] = useState(null); // null = loading, else Set of mastered ids
  const [zoom, setZoom] = useState(1);
  const [ready, setReady] = useState(false);
  const viewportRef = useRef(null);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  // Deep-linked from elsewhere (e.g. "See this on the map" in Learning
  // Journey) — scroll straight to that node once the entrance animation has
  // had a moment to place everything.
  useEffect(() => {
    if (!focusTopicId || !layout.pos[focusTopicId] || !viewportRef.current) return;
    const t = window.setTimeout(() => {
      const p = layout.pos[focusTopicId];
      viewportRef.current.scrollTo({
        left: Math.max(0, p.x - viewportRef.current.clientWidth / 2 + NODE_W / 2),
        top: Math.max(0, p.y - viewportRef.current.clientHeight / 2 + NODE_H / 2),
        behavior: 'smooth',
      });
    }, 400);
    return () => window.clearTimeout(t);
  }, [focusTopicId, layout]);

  useEffect(() => {
    fetchMasterySet().then(setMastery);
  }, []);

  // First-visit nudge: point brand-new users at the one node everything
  // else traces back to, instead of dropping them into 63 unlabeled choices.
  // Skipped entirely if arriving deep-linked or already mid-goal — those
  // visits already have their own destination.
  const [showTour, setShowTour] = useState(false);
  useEffect(() => {
    if (focusTopicId || goalId) return;
    try {
      if (window.localStorage.getItem(TOUR_SEEN_KEY)) return;
    } catch { /* localStorage unavailable — just skip the nudge */ }
    const t = window.setTimeout(() => {
      setShowTour(true);
      const p = layout.pos[ROOT_ID];
      if (p && viewportRef.current) {
        viewportRef.current.scrollTo({ left: 0, top: Math.max(0, p.y - viewportRef.current.clientHeight / 2 + NODE_H / 2), behavior: 'smooth' });
      }
    }, 500);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dismissTour = () => {
    setShowTour(false);
    try { window.localStorage.setItem(TOUR_SEEN_KEY, '1'); } catch { /* non-fatal */ }
  };

  // One-shot burst on a node that was just mastered/unlocked, arriving via
  // the real-time mastery-celebration toast (see lib/masteryCelebration.js).
  // Self-clears so it only plays once per visit, not on every re-render.
  const [celebrateActive, setCelebrateActive] = useState(!!celebrateTopicId);
  useEffect(() => {
    if (!celebrateTopicId) return;
    setCelebrateActive(true);
    const t = window.setTimeout(() => setCelebrateActive(false), 2600);
    return () => window.clearTimeout(t);
  }, [celebrateTopicId]);

  // ─── Goal-directed Path Finder ─────────────────────────────────────────
  // Pick a destination, get the exact remaining route from what's already
  // mastered — this takes over the graph's highlighting entirely while
  // active, replacing hover-explore mode with "here is your one path."
  const [goalId, setGoalId] = useState(() => {
    if (focusTopicId) return null; // arriving to explore one node, not to resume a goal
    const saved = getSavedGoal();
    return saved && getAllTopicKeys().includes(saved) ? saved : null;
  });
  const goalPath = useMemo(
    () => (goalId ? computeGoalPath(goalId, mastery || new Set()) : null),
    [goalId, mastery]
  );
  const goalStepIds = useMemo(
    () => new Set(goalPath ? goalPath.steps.map((s) => s.id) : []),
    [goalPath]
  );
  const currentStepId = useMemo(() => {
    if (!goalPath) return null;
    const next = goalPath.steps.find((s) => !s.mastered);
    return next ? next.id : null;
  }, [goalPath]);

  const setGoal = (id) => {
    setGoalId(id || null);
    setHovered(null);
    saveGoal(id || null);
    if (id) logEvent('goal_set', id, { alreadyMastered: mastery ? mastery.has(id) : false });
  };

  // Auto-fit the graph to the path's bounding box once it's computed.
  useEffect(() => {
    if (!goalPath || !viewportRef.current) return;
    const positions = goalPath.steps.map((s) => layout.pos[s.id]).filter(Boolean);
    if (positions.length === 0) return;
    const t = window.setTimeout(() => {
      const minX = Math.min(...positions.map((p) => p.x));
      const maxX = Math.max(...positions.map((p) => p.x));
      const minY = Math.min(...positions.map((p) => p.y));
      const el = viewportRef.current;
      el.scrollTo({
        left: Math.max(0, minX + (maxX - minX) / 2 - el.clientWidth / 2 + NODE_W / 2),
        top: Math.max(0, minY - 40),
        behavior: 'smooth',
      });
    }, 150);
    return () => window.clearTimeout(t);
  }, [goalPath, layout]);

  const { ancestors, descendants } = useMemo(() => {
    if (goalId || !hovered) return { ancestors: new Set(), descendants: new Set() };
    const anc = new Set();
    const stack = [hovered];
    while (stack.length) {
      const cur = stack.pop();
      for (const p of getPrerequisites(cur)) {
        if (!anc.has(p)) { anc.add(p); stack.push(p); }
      }
    }
    const desc = new Set();
    const stack2 = [hovered];
    while (stack2.length) {
      const cur = stack2.pop();
      for (const s of getUnlocks(cur)) {
        if (!desc.has(s)) { desc.add(s); stack2.push(s); }
      }
    }
    return { ancestors: anc, descendants: desc };
  }, [hovered]);

  const nodeState = (id) => {
    if (!mastery) return 'loading';
    if (mastery.has(id)) return 'mastered';
    const prereqs = getPrerequisites(id);
    if (prereqs.length === 0 || prereqs.every((p) => mastery.has(p))) return 'ready';
    return 'building';
  };

  const masteredCount = mastery ? layout.ids.filter((id) => mastery.has(id)).length : 0;
  const totalCount = layout.ids.length;
  const masteredPct = totalCount ? Math.round((masteredCount / totalCount) * 100) : 0;

  // Goal mode replaces hover-explore entirely while active — one clear
  // story on screen at a time, not two highlight systems fighting.
  const isDimmed = (id) => {
    if (goalId) return !goalStepIds.has(id);
    return hovered && hovered !== id && !ancestors.has(id) && !descendants.has(id);
  };
  const isDimmedEdge = (e) => {
    if (goalId) return !(goalStepIds.has(e.src) && goalStepIds.has(e.tgt));
    if (!hovered) return false;
    if (e.tgt === hovered || e.src === hovered) return false;
    const inAncestorChain = ancestors.has(e.src) && ancestors.has(e.tgt);
    const inDescChain = descendants.has(e.src) && descendants.has(e.tgt);
    return !inAncestorChain && !inDescChain;
  };
  const edgeKind = (e) => {
    if (goalId) return (goalStepIds.has(e.src) && goalStepIds.has(e.tgt)) ? 'onpath' : 'plain';
    if (e.tgt === hovered || ancestors.has(e.src) && (ancestors.has(e.tgt) || e.tgt === hovered)) return 'ancestor';
    if (e.src === hovered || descendants.has(e.tgt) && (descendants.has(e.src) || e.src === hovered)) return 'descendant';
    return 'plain';
  };

  const path = (e) => {
    const a = layout.pos[e.src];
    const b = layout.pos[e.tgt];
    const x1 = a.x + NODE_W;
    const y1 = a.y + NODE_H / 2;
    const x2 = b.x;
    const y2 = b.y + NODE_H / 2;
    const mx = (x1 + x2) / 2;
    return `M ${x1},${y1} C ${mx},${y1} ${mx},${y2} ${x2},${y2}`;
  };

  return (
    <div className="learning-map-overlay">
      <div className="learning-map-shell">
        <div className="learning-map-header">
          <button className="learning-map-back" onClick={onBack}>← Home</button>
          <div className="learning-map-title-block">
            <h2>🔗 Topic Connections</h2>
            <p>Hover a topic to trace what it needs and what it unlocks. Click any topic to jump in.</p>
          </div>
          {mastery && (
            <div className="learning-map-progress-stat" title={`${masteredCount} of ${totalCount} topics mastered`}>
              <div className="learning-map-progress-bar">
                <div className="learning-map-progress-fill" style={{ width: `${masteredPct}%` }} />
              </div>
              <span>{masteredCount}/{totalCount} mastered · {masteredPct}%</span>
            </div>
          )}
          {isMockMasteryActive() && <span className="dev-mock-badge" title="Mastery data is mocked via ?mockMastery= for local review, not real">🧪 mock mastery</span>}
          <div className="learning-map-zoom">
            <button onClick={() => setZoom((z) => Math.max(0.4, z - 0.15))}>−</button>
            <button onClick={() => setZoom(1)}>{Math.round(zoom * 100)}%</button>
            <button onClick={() => setZoom((z) => Math.min(1.6, z + 0.15))}>+</button>
          </div>
        </div>

        <div className="learning-map-legend">
          {Object.entries(CAT_COLOR).filter(([k]) => k !== 'other').map(([cat, color]) => (
            <span key={cat} className="learning-map-legend-item">
              <span className="learning-map-legend-dot" style={{ background: color }} />
              {CAT_NAMES[cat]}
            </span>
          ))}
          <span className="learning-map-legend-item"><span className="learning-map-legend-glow" /> Mastered</span>
        </div>

        <div className="learning-map-goal-row">
          <label htmlFor="goal-select" className="learning-map-goal-label">🎯 Where do you want to end up?</label>
          <select
            id="goal-select"
            className="learning-map-goal-select"
            value={goalId || ''}
            onChange={(e) => setGoal(e.target.value || null)}
          >
            <option value="">Pick a topic…</option>
            {Object.keys(CAT_NAMES).map((cat) => (
              <optgroup key={cat} label={CAT_NAMES[cat]}>
                {layout.ids.filter((id) => getTopicCategory(id) === cat).map((id) => (
                  <option key={id} value={id}>{getTopicLabel(id)}</option>
                ))}
              </optgroup>
            ))}
          </select>
          {goalId && (
            <button className="learning-map-goal-clear" onClick={() => setGoal(null)}>✕ Clear goal</button>
          )}
        </div>

        <div className="learning-map-viewport" ref={viewportRef}>
          <div
            className="learning-map-canvas"
            style={{ width: layout.width * zoom, height: layout.height * zoom }}
          >
            <svg
              width={layout.width}
              height={layout.height}
              viewBox={`0 0 ${layout.width} ${layout.height}`}
              style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
            >
              <g className="learning-map-edges">
                {layout.edges.map((e, i) => {
                  const kind = edgeKind(e);
                  const a = layout.pos[e.src];
                  const delayCol = Math.max(a.depth, layout.pos[e.tgt].depth);
                  return (
                    <path
                      key={i}
                      d={path(e)}
                      className={
                        'learning-map-edge' +
                        (kind !== 'plain' ? ' is-' + kind : '') +
                        (isDimmedEdge(e) ? ' is-dimmed' : '') +
                        (ready ? ' is-drawn' : '')
                      }
                      style={{ '--edge-delay': `${300 + delayCol * 140}ms` }}
                    />
                  );
                })}
              </g>

              <g className="learning-map-nodes">
                {layout.ids.map((id) => {
                  const p = layout.pos[id];
                  const state = nodeState(id);
                  const dimmed = isDimmed(id);
                  const cat = getTopicCategory(id);
                  return (
                    // Outer <g> holds ONLY the layout position. SVG's `transform`
                    // attribute and a CSS `transform` (from the entrance animation)
                    // don't compose — CSS silently wins and overwrites the
                    // attribute — so the animated transform lives on a nested
                    // inner <g> instead, in the outer <g>'s local coordinates.
                    <g key={id} transform={`translate(${p.x}, ${p.y})`}>
                      <g
                        className={
                          'learning-map-node' +
                          ` is-${state}` +
                          (dimmed ? ' is-dimmed' : '') +
                          (hovered === id ? ' is-hovered' : '') +
                          (ready ? ' is-in' : '') +
                          (goalId && goalStepIds.has(id) ? ' is-on-path' : '') +
                          (id === currentStepId ? ' is-current-step' : '') +
                          (id === goalId ? ' is-goal-node' : '') +
                          (showTour && id === ROOT_ID ? ' is-tour-target' : '') +
                          (celebrateActive && id === celebrateTopicId ? ' is-just-unlocked' : '')
                        }
                        style={{ '--node-delay': `${p.depth * 110}ms` }}
                        onMouseEnter={() => setHovered(id)}
                        onMouseLeave={() => setHovered((h) => (h === id ? null : h))}
                        onClick={() => { if (showTour) dismissTour(); logEvent('map_node_clicked', id, { state, onPath: goalId ? goalStepIds.has(id) : false }); onNavigate(id); }}
                      >
                      <rect
                        width={NODE_W}
                        height={NODE_H}
                        rx="10"
                        className="learning-map-node-rect"
                        style={{ '--cat-color': CAT_COLOR[cat] }}
                      />
                      <text x="12" y="24" className="learning-map-node-label">{getTopicLabel(id)}</text>
                      <text x="12" y="41" className="learning-map-node-sub">
                        {id === goalId ? '🎯 Goal' : id === currentStepId ? '▶ Start here' : state === 'mastered' ? '✓ Mastered' : state === 'ready' ? 'Ready' : 'Needs prep'}
                      </text>
                      {celebrateActive && id === celebrateTopicId && (
                        <circle className="learning-map-unlock-ring" cx={NODE_W / 2} cy={NODE_H / 2} r="8" />
                      )}
                      </g>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>
        </div>

        {showTour && (
          <div className="learning-map-tour-nudge">
            <p>👋 New here? Every path on this map starts at the glowing node on the left — <strong>Basic Arithmetic</strong>. Click it to begin.</p>
            <button className="learning-map-tour-dismiss" onClick={dismissTour}>Got it →</button>
          </div>
        )}

        {goalPath && (
          <div className="learning-map-path-panel">
            <div className="learning-map-path-panel-header">
              <h3>🎯 Path to {getTopicLabel(goalId)}</h3>
              <button className="learning-map-goal-clear" onClick={() => setGoal(null)}>✕</button>
            </div>
            {goalPath.alreadyThere ? (
              <p className="learning-map-path-done">🎉 You've already mastered everything needed for this!</p>
            ) : (
              <p className="learning-map-path-count">{goalPath.remaining} topic{goalPath.remaining === 1 ? '' : 's'} to go</p>
            )}
            <ol className="learning-map-path-list">
              {goalPath.steps.map((s) => (
                <li
                  key={s.id}
                  className={
                    'learning-map-path-step' +
                    (s.mastered ? ' is-mastered' : '') +
                    (s.id === currentStepId ? ' is-current' : '') +
                    (s.id === goalId ? ' is-goal' : '')
                  }
                  onClick={() => { logEvent('path_step_clicked', s.id, { goalId }); onNavigate(s.id); }}
                >
                  <span className="learning-map-path-step-icon">
                    {s.mastered ? '✓' : s.id === currentStepId ? '▶' : '○'}
                  </span>
                  <span className="learning-map-path-step-label">{s.label}</span>
                  {s.id === goalId && <span className="learning-map-path-step-goal-tag">goal</span>}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
