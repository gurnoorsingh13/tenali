/**
 * Tests for Explore / Focus study mode (lib/studyMode.js)
 *
 * Scenarios:
 * 1. A student who has never touched the toggle
 * 2. Entering Focus Mode with a revision list
 * 3. Leaving Focus Mode mid-revision and coming back
 * 4. Focus Mode switched on but no topics picked yet (→ show the picker)
 * 5. Corrupted / hostile localStorage contents
 * 6. localStorage unavailable entirely (private browsing, quota)
 * 7. Cross-component change notification
 * 8. The prerequisite ladder shown on the Focus board
 */

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';

// ─── Environment ───────────────────────────────────────────────────
// vitest.config.js asks for jsdom, but jsdom isn't installed in every
// checkout (there's no `test` script or vitest dependency yet), so this
// falls back to a minimal window built on Node's own EventTarget. Nothing
// here touches the DOM — studyMode.js only needs localStorage and
// add/removeEventListener — so both environments exercise the same code.
if (typeof globalThis.window === 'undefined') {
  const target = new EventTarget();
  globalThis.window = {
    addEventListener: target.addEventListener.bind(target),
    removeEventListener: target.removeEventListener.bind(target),
    dispatchEvent: target.dispatchEvent.bind(target),
  };
}

// ─── Helper: Simulate localStorage ─────────────────────────────────
function installStorage(impl) {
  Object.defineProperty(window, 'localStorage', {
    value: impl,
    writable: true,
    configurable: true,
  });
}

const workingStorage = () => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] ?? null),
    setItem: vi.fn((key, value) => { store[key] = String(value); }),
    removeItem: vi.fn((key) => { delete store[key]; }),
    clear: () => { store = {}; },
    __store: () => store,
  };
};

let mod;

beforeEach(async () => {
  installStorage(workingStorage());
  vi.resetModules();
  mod = await import('./lib/studyMode.js');
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ─── 1. Untouched ──────────────────────────────────────────────────
describe('a student who has never used the toggle', () => {
  test('starts in Explore — Focus is always opt-in', () => {
    expect(mod.getStudyMode()).toBe(mod.EXPLORE);
  });

  test('has no revision list', () => {
    expect(mod.getFocusTopics()).toEqual([]);
  });

  test('is not treated as focusing', () => {
    expect(mod.isFocusModeActive()).toBe(false);
  });
});

// ─── 2. Entering Focus ─────────────────────────────────────────────
describe('entering Focus Mode with a revision list', () => {
  test('stores both the mode and the topics', () => {
    mod.enterFocusMode(['quadratic', 'trig', 'percent']);
    expect(mod.getStudyMode()).toBe(mod.FOCUS);
    expect(mod.getFocusTopics()).toEqual(['quadratic', 'trig', 'percent']);
    expect(mod.isFocusModeActive()).toBe(true);
  });

  test('preserves pick order — the revision list is not alphabetised', () => {
    mod.enterFocusMode(['trig', 'addition', 'quadratic']);
    expect(mod.getFocusTopics()).toEqual(['trig', 'addition', 'quadratic']);
  });

  test('topics can be changed without leaving Focus Mode', () => {
    mod.enterFocusMode(['quadratic']);
    mod.setFocusTopics(['trig', 'vectors']);
    expect(mod.getStudyMode()).toBe(mod.FOCUS);
    expect(mod.getFocusTopics()).toEqual(['trig', 'vectors']);
  });
});

// ─── 3. Leaving and returning ──────────────────────────────────────
describe('leaving Focus Mode mid-revision', () => {
  test('returns to Explore', () => {
    mod.enterFocusMode(['quadratic', 'trig']);
    mod.exitFocusMode();
    expect(mod.getStudyMode()).toBe(mod.EXPLORE);
    expect(mod.isFocusModeActive()).toBe(false);
  });

  test('keeps the revision list so coming back resumes instead of re-asking', () => {
    mod.enterFocusMode(['quadratic', 'trig']);
    mod.exitFocusMode();
    expect(mod.getFocusTopics()).toEqual(['quadratic', 'trig']);

    mod.enterFocusMode(); // no argument — resume
    expect(mod.getFocusTopics()).toEqual(['quadratic', 'trig']);
    expect(mod.isFocusModeActive()).toBe(true);
  });
});

// ─── 4. Focus on, nothing picked ───────────────────────────────────
describe('Focus Mode on with no topics picked', () => {
  test('is Focus, but not yet "active" — the picker should show', () => {
    mod.enterFocusMode();
    expect(mod.getStudyMode()).toBe(mod.FOCUS);
    expect(mod.isFocusModeActive()).toBe(false);
  });

  test('emptying the list drops back out of active', () => {
    mod.enterFocusMode(['quadratic']);
    expect(mod.isFocusModeActive()).toBe(true);
    mod.setFocusTopics([]);
    expect(mod.isFocusModeActive()).toBe(false);
  });
});

// ─── 5. Corrupted storage ──────────────────────────────────────────
describe('corrupted localStorage contents', () => {
  test('malformed JSON in the topic list yields an empty list, not a crash', () => {
    window.localStorage.setItem('tenali-focus-topics', '{not json');
    expect(() => mod.getFocusTopics()).not.toThrow();
    expect(mod.getFocusTopics()).toEqual([]);
  });

  test('a non-array topic list is rejected', () => {
    window.localStorage.setItem('tenali-focus-topics', '"quadratic"');
    expect(mod.getFocusTopics()).toEqual([]);
  });

  test('non-string entries are filtered out rather than reaching the graph', () => {
    window.localStorage.setItem('tenali-focus-topics', '["quadratic", 42, null, "trig"]');
    expect(mod.getFocusTopics()).toEqual(['quadratic', 'trig']);
  });

  test('an unrecognised mode value falls back to Explore', () => {
    window.localStorage.setItem('tenali-study-mode', 'banana');
    expect(mod.getStudyMode()).toBe(mod.EXPLORE);
  });
});

// ─── 6. Storage unavailable ────────────────────────────────────────
describe('localStorage unavailable (private mode / quota)', () => {
  beforeEach(async () => {
    installStorage({
      getItem: vi.fn(() => { throw new Error('SecurityError'); }),
      setItem: vi.fn(() => { throw new Error('QuotaExceededError'); }),
      removeItem: vi.fn(() => { throw new Error('SecurityError'); }),
    });
    vi.resetModules();
    mod = await import('./lib/studyMode.js');
  });

  test('reads fall back to Explore instead of throwing', () => {
    expect(() => mod.getStudyMode()).not.toThrow();
    expect(mod.getStudyMode()).toBe(mod.EXPLORE);
    expect(mod.getFocusTopics()).toEqual([]);
  });

  test('writes fail quietly — the student still gets the mode this session', () => {
    const seen = [];
    const handler = (e) => seen.push(e.detail.mode);
    window.addEventListener('tenali-study-mode-change', handler);
    expect(() => mod.enterFocusMode(['quadratic'])).not.toThrow();
    // The event still fires even though nothing persisted, so the live UI
    // updates; only survival across a reload is lost.
    expect(seen).toEqual(['focus']);
    window.removeEventListener('tenali-study-mode-change', handler);
  });
});

// ─── 7. Change notification ────────────────────────────────────────
describe('cross-component notification', () => {
  test('entering and leaving both broadcast the new mode and topics', () => {
    const seen = [];
    const handler = (e) => seen.push(e.detail);
    window.addEventListener('tenali-study-mode-change', handler);

    mod.enterFocusMode(['trig']);
    mod.exitFocusMode();

    window.removeEventListener('tenali-study-mode-change', handler);

    expect(seen).toHaveLength(2);
    expect(seen[0]).toEqual({ mode: 'focus', topics: ['trig'] });
    expect(seen[1].mode).toBe('explore');
    expect(seen[1].topics).toEqual(['trig']);
  });
});

// ─── 8. "Why learn this?" content ──────────────────────────────────
// The panel fails silently by design — a topic with no entry renders
// nothing at all — so a typo here costs a feature with no error anywhere.
// These are the checks that would otherwise only surface by someone
// happening to open the right topic.
describe('topicMotivation data', () => {
  let data;
  let implementedKinds;

  beforeEach(async () => {
    data = (await import('./data/topicMotivation.json')).default;
    // Demo kinds are topic ids, so the registry must cover every topic.
    implementedKinds = Object.keys(data);
  });

  test('every single topic has a visual demo, not just some', () => {
    // The whole point of the visual layer is that a student never lands on
    // a topic that only talks at them.
    Object.entries(data).forEach(([id, entry]) => {
      expect(entry.demo, `${id} has no demo`).toBeTruthy();
      expect(entry.demo.kind, `${id} demo kind should be its own topic id`).toBe(id);
    });
  });

  test('every topic explains the mechanism, not just the motivation', () => {
    Object.entries(data).forEach(([id, entry]) => {
      expect(typeof entry.how, `${id} has no how`).toBe('string');
      expect(entry.how.length, `${id}.how is too thin to teach anything`).toBeGreaterThan(60);
    });
  });

  test('every topic has a non-empty why', () => {
    Object.entries(data).forEach(([id, entry]) => {
      expect(typeof entry.why, `${id}.why`).toBe('string');
      expect(entry.why.length, `${id}.why`).toBeGreaterThan(20);
    });
  });

  test('no em dashes or en dashes anywhere in the copy', () => {
    // House style: they read as machine-written. Full stops and commas do
    // the same job, so this is a hard rule rather than a preference.
    Object.entries(data).forEach(([id, entry]) => {
      ['why', 'how'].forEach((field) => {
        if (!entry[field]) return;
        expect(entry[field], `${id}.${field} contains an em dash`).not.toMatch(/—/);
        expect(entry[field], `${id}.${field} contains an en dash`).not.toMatch(/–/);
      });
    });
  });

  test('no copy opens with the same stock phrasing twice running', () => {
    // The previous pass leaned on "This is the math behind..." and
    // "Every time you..." as templates, which is what made it read as
    // generated. Guard the two worst offenders.
    const banned = [/^this is the math/i, /^every time you/i];
    Object.entries(data).forEach(([id, entry]) => {
      banned.forEach((re) => {
        expect(entry.why, `${id}.why falls back on a template opening`).not.toMatch(re);
      });
    });
  });

  test('every demo kind used is actually implemented', () => {
    Object.entries(data).forEach(([id, entry]) => {
      if (!entry.demo) return;
      expect(implementedKinds, `${id} asks for an unimplemented demo`)
        .toContain(entry.demo.kind);
    });
  });

  test('a topic with a demo also explains the mechanism', () => {
    // A slider with no "how" is a toy; the text is what makes it a lesson.
    Object.entries(data).forEach(([id, entry]) => {
      if (!entry.demo) return;
      expect(typeof entry.how, `${id} has a demo but no how`).toBe('string');
    });
  });

  test('every implemented demo is used by at least one topic', () => {
    const used = new Set(
      Object.values(data).filter((e) => e.demo).map((e) => e.demo.kind)
    );
    implementedKinds.forEach((kind) => {
      expect(used, `demo "${kind}" is implemented but unreachable`).toContain(kind);
    });
  });
});

// ─── 9. The prerequisite ladder ────────────────────────────────────
// Mirrors the merge in components/FocusHome.jsx: for each topic being
// revised, the unmastered ancestors, de-duplicated by first appearance and
// excluding anything already on the revision list.
describe('prerequisite ladder on the Focus board', () => {
  let computeGoalPath;

  beforeEach(async () => {
    ({ computeGoalPath } = await import('./lib/prerequisiteGraph.js'));
  });

  const buildLadder = (topics, mastered) => {
    const chosen = new Set(topics);
    const seen = new Set();
    const out = [];
    topics.forEach((goal) => {
      computeGoalPath(goal, mastered).steps.forEach((s) => {
        if (s.mastered || chosen.has(s.id) || seen.has(s.id)) return;
        seen.add(s.id);
        out.push(s);
      });
    });
    return out;
  };

  test('never lists a topic the student is already revising', () => {
    const topics = ['quadratic', 'polyfactor', 'basicarith'];
    const ladder = buildLadder(topics, new Set());
    ladder.forEach((s) => expect(topics).not.toContain(s.id));
  });

  test('never lists an already-mastered topic', () => {
    const mastered = new Set(['basicarith', 'multiply', 'addition']);
    const ladder = buildLadder(['quadratic'], mastered);
    ladder.forEach((s) => expect(mastered.has(s.id)).toBe(false));
  });

  test('contains no duplicates when two goals share prerequisites', () => {
    const ladder = buildLadder(['quadratic', 'qformula'], new Set());
    const ids = ladder.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('is empty when everything upstream is already mastered', () => {
    const { steps } = computeGoalPath('quadratic', new Set());
    const allButGoal = new Set(steps.map((s) => s.id).filter((id) => id !== 'quadratic'));
    expect(buildLadder(['quadratic'], allButGoal)).toEqual([]);
  });

  test('a foundational topic with no prerequisites produces no ladder', () => {
    expect(buildLadder(['basicarith'], new Set())).toEqual([]);
  });
});
