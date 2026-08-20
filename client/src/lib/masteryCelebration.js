/**
 * masteryCelebration.js — turns "you just got a question right" into
 * "you just unlocked something," in real time, without touching any of
 * the ~63 quiz screens individually.
 *
 * How it hooks in: every check submission goes through `POST /<key>-api/check`
 * and the server marks a topic mastered on the *first* correct answer there
 * (server/lil/masteryEngine.js) — but that write happens fire-and-forget,
 * *after* the response is already sent back to the browser (server/index.js),
 * so the client can't just read it off the check response. Instead of wiring
 * a hook into every quiz component, this wraps `window.fetch` once (the same
 * monkey-patch trick the server itself uses on res.json), watches for a
 * `correct: true` reply from any `*-api/check` endpoint, and polls
 * GET /api/mastery briefly afterward for the write to land.
 *
 * Fires a `tenali-mastery-celebration` window CustomEvent — the same
 * cross-component pattern already used for `tenali-auth-change` — so any
 * component (just <MasteryUnlockToast/> today) can listen without this
 * module needing to know about React at all.
 */

import { fetchMasterySet, logEvent } from './masteryClient';
import { getAllTopicKeys, getTopicIdFromApiPath, getPrerequisites, getUnlocks, getTopicLabel } from './prerequisiteGraph';

const GRAPH_TOPIC_KEYS = new Set(getAllTopicKeys());
const CHECK_URL_RE = /\/([a-z0-9-]+)-api\/check(?:[/?]|$)/i;

let snapshot = null; // Set of mastered topic ids, lazily loaded, kept warm after each diff
let installed = false;

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function ensureSnapshot() {
  if (!snapshot) snapshot = await fetchMasterySet();
  return snapshot;
}

async function handlePossibleMastery(topicId) {
  const before = await ensureSnapshot();
  // The mastery threshold here is deliberately loose (first correct answer,
  // per masteryEngine.js) — only the *first* transition into "mastered" is
  // worth celebrating, or this fires on nearly every question.
  if (before.has(topicId)) return;

  for (let attempt = 0; attempt < 4; attempt++) {
    await sleep(attempt === 0 ? 500 : 700);
    let fresh;
    try {
      fresh = await fetchMasterySet();
    } catch {
      continue;
    }
    if (fresh.has(topicId)) {
      const unlocked = getUnlocks(topicId).filter((id) => {
        const prereqs = getPrerequisites(id);
        const wasReady = prereqs.every((p) => before.has(p));
        const isReadyNow = prereqs.every((p) => fresh.has(p));
        return !wasReady && isReadyNow;
      });
      snapshot = fresh;
      window.dispatchEvent(new CustomEvent('tenali-mastery-celebration', {
        detail: {
          topicId,
          label: getTopicLabel(topicId),
          unlocked: unlocked.map((id) => ({ id, label: getTopicLabel(id) })),
        },
      }));
      logEvent('mastery_celebrated', topicId, { unlockedCount: unlocked.length });
      return;
    }
    snapshot = fresh;
  }
}

export function installMasteryWatcher() {
  if (installed) return;
  installed = true;
  const origFetch = window.fetch.bind(window);
  window.fetch = async (...args) => {
    const res = await origFetch(...args);
    try {
      const input = args[0];
      const url = typeof input === 'string' ? input : input && input.url;
      const method = (args[1] && args[1].method) || (input && input.method) || 'GET';
      const m = url && method.toUpperCase() === 'POST' ? CHECK_URL_RE.exec(url) : null;
      if (m) {
        const topicId = getTopicIdFromApiPath(m[1].toLowerCase() + '-api');
        if (GRAPH_TOPIC_KEYS.has(topicId)) {
          res.clone().json().then((data) => {
            if (data && data.correct === true) handlePossibleMastery(topicId);
          }).catch(() => {});
        }
      }
    } catch {
      /* never let this watcher break a real request */
    }
    return res;
  };
}
