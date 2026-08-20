import { useEffect, useState } from 'react';
import { useStudyMode } from '../lib/studyMode';

let nextId = 0;

/**
 * Listens for `tenali-mastery-celebration` (dispatched by
 * ../lib/masteryCelebration.js the moment a topic first becomes mastered)
 * and shows a small, non-blocking toast — never a full-screen modal, since
 * the underlying mastery threshold is "one correct answer" and this can
 * fire often; it should feel like a game's corner unlock notice, not an
 * interruption.
 */
export default function MasteryUnlockToast({ onOpenMap }) {
  const [toasts, setToasts] = useState([]);
  // In Focus Mode the toast survives, but only the half of it that reports
  // the student's own progress. "Now ready: …" and the jump to the map are
  // invitations to wander off mid-revision, which is the exact thing Focus
  // Mode was turned on to stop.
  const { isFocusActive } = useStudyMode();

  useEffect(() => {
    const handler = (e) => {
      const { topicId, label, unlocked } = e.detail || {};
      if (!topicId || !label) return;
      const id = ++nextId;
      setToasts((prev) => [...prev, { id, topicId, label, unlocked: unlocked || [] }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 7000);
    };
    window.addEventListener('tenali-mastery-celebration', handler);
    return () => window.removeEventListener('tenali-mastery-celebration', handler);
  }, []);

  const dismiss = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  if (toasts.length === 0) return null;

  return (
    <div className="mastery-toast-stack">
      {toasts.map((t) => (
        <div key={t.id} className="mastery-toast">
          <button className="mastery-toast-close" onClick={() => dismiss(t.id)} aria-label="Dismiss">✕</button>
          <p className="mastery-toast-title">🎉 Mastered: {t.label}</p>
          {!isFocusActive && t.unlocked.length > 0 && (
            <p className="mastery-toast-unlocked">
              🔓 Now ready: {t.unlocked.map((u) => u.label).join(', ')}
            </p>
          )}
          {!isFocusActive && (
            <button
              className="mastery-toast-map-btn"
              onClick={() => { const target = (t.unlocked[0] || {}).id || t.topicId; dismiss(t.id); onOpenMap(target); }}
            >
              See it on the map →
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
