/**
 * WhyMathApp.jsx - the app-level "Why Mathematics?" story.
 *
 * The old version asserted things at the student: "Netflix knowing what
 * you'll watch next, that's math." True, and completely unfalsifiable from
 * the sofa. Nobody learns anything from a claim they cannot check.
 *
 * So every beat here is a demonstration instead. The student drags a
 * number and watches something they did not expect actually happen: 23
 * people is enough for a shared birthday, a sheet of paper folded 42 times
 * reaches the moon, switching doors really does double your odds. The maths
 * argues for itself and nobody has to be told it is important.
 *
 * Fresh on every open, in two independent ways:
 *   1. Four beats are drawn from a pool of twelve and shuffled, so the
 *      sequence differs (nearly 12,000 orderings).
 *   2. Beats carry several interchangeable framings and starting values,
 *      picked at random, so even a repeated beat reads differently.
 *
 * Visuals come from whyVisuals.jsx, the same kit behind the 66 topic demos,
 * so this feels like the rest of the app rather than a separate microsite.
 */

import { useState } from 'react';
import { CellGrid, A, P, LINE } from './lib/whyVisuals.jsx';
import { BEATS, HOOKS, CLOSES } from './lib/whyMathBeats.jsx';
import './WhyMathApp.css';

/* -- helpers --------------------------------------------------------- */

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
function buildSequence() {
  return {
    hook: pick(HOOKS),
    beats: shuffle(BEATS).slice(0, 4).map((b) => ({ ...b, ask: pick(b.ask), start: b.initial() })),
    close: pick(CLOSES),
  };
}

/* -- one interactive beat -------------------------------------------- */

function Beat({ beat }) {
  const [v, setV] = useState(beat.start);
  const { big, caption } = beat.read(v);
  const reached = beat.aim != null && (beat.aim >= beat.start ? v >= beat.aim : v <= beat.aim);

  return (
    <div className="why-math-beat">
      <p className="why-math-ask">{beat.ask}</p>
      {beat.visual(v)}
      <label className="why-math-slider-label">
        {beat.label}: <strong>{v}{beat.suffix || ''}</strong>
      </label>
      <input
        className="why-demo-slider"
        type="range"
        min={beat.min}
        max={beat.max}
        step={beat.step || 1}
        value={v}
        onChange={(e) => setV(Number(e.target.value))}
        aria-label={beat.label}
      />
      <p className={'why-math-answer' + (reached ? ' is-reached' : '')}>{big}</p>
      <p className="why-math-because">{caption}</p>
    </div>
  );
}

/* -- the story ------------------------------------------------------- */

export default function WhyMathApp({ onBack, onNavigate }) {
  const [story] = useState(buildSequence);
  const [i, setI] = useState(0);

  const total = story.beats.length + 2;
  const isHook = i === 0;
  const isClose = i === total - 1;
  const beat = !isHook && !isClose ? story.beats[i - 1] : null;

  const go = (mode) => {
    if (typeof onNavigate === 'function') onNavigate(mode);
    else onBack();
  };

  return (
    <div className="why-math-overlay">
      <div className="why-math-card">
        <div className="why-math-progress" aria-label={`Step ${i + 1} of ${total}`}>
          {Array.from({ length: total }).map((_, n) => (
            <span key={n} className={n <= i ? 'is-current' : ''} onClick={() => setI(n)} />
          ))}
        </div>

        <div className="why-math-stage">
          <article className="why-math-comic-panel">
            <img src="/tenali.png" alt="Tenali Raman" className="why-math-avatar" />
            <div className="why-math-speech-group">
              <p className="why-math-speech">
                {isHook ? story.hook : isClose ? story.close : 'Have a guess first, then drag it.'}
              </p>
            </div>
          </article>

          {beat && <Beat key={beat.key} beat={beat} />}

          {isHook && (
            <div className="why-math-hook-visual">
              <CellGrid rows={6} cols={14} h={78} cell={9}
                fill={(r, c) => ((r * 14 + c) % 5 === 0 ? A : (r + c) % 3 === 0 ? P : LINE)} />
              <p className="why-math-because">
                Four of these, picked fresh every time you open this. Come back tomorrow and you will get different ones.
              </p>
            </div>
          )}

          {isClose && (
            <div className="why-math-close-actions">
              <button className="why-math-cta why-math-cta-primary" onClick={() => go('gym')}>
                Start today&rsquo;s Gym
              </button>
              <button className="why-math-cta why-math-cta-primary" onClick={() => go('learning_journey')}>
                See the Learning Journey
              </button>
              <button className="why-math-cta why-math-cta-ghost" onClick={onBack}>
                Back to Home
              </button>
            </div>
          )}
        </div>

        <div className="why-math-nav">
          <button className="why-math-skip" onClick={onBack}>Skip</button>
          <div className="why-math-nav-controls">
            {i > 0 && (
              <button className="why-math-btn why-math-btn-secondary" onClick={() => setI((n) => n - 1)}>
                &larr; Back
              </button>
            )}
            {!isClose && (
              <button className="why-math-btn" onClick={() => setI((n) => n + 1)}>Next &rarr;</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
