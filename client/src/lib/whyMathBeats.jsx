/**
 * whyMathBeats.jsx - the content pool behind "Why Mathematics?".
 *
 * Split out from WhyMathApp.jsx for two reasons. It keeps presentation
 * separate from content, the same way topicMotivation.json sits behind
 * WhyLearnThis. And it makes the beats testable: whyMath.test.jsx walks
 * every beat across its whole slider range, which is the only way to catch
 * a division by zero or a NaN hiding at one end of a range that a random
 * opening might not reach for weeks.
 *
 * Exports data only, no components, so react-refresh stays happy.
 */

import { Stage, Bars, CellGrid, FnPlot, Dots, INK, LINE, A, P, B, G } from './whyVisuals.jsx';

const f = (n, d = 0) => n.toLocaleString('en-IN', { maximumFractionDigits: d });

function humanTime(s) {
  if (s < 60) return `${f(s)} seconds`;
  if (s < 3600) return `${f(s / 60)} minutes`;
  if (s < 86400) return `${f(s / 3600)} hours`;
  if (s < 3.15e7) return `${f(s / 86400)} days`;
  const y = s / 3.15e7;
  if (y < 1e6) return `${f(y)} years`;
  if (y < 1e9) return `${f(y / 1e6)} million years`;
  return `${f(y / 1e9)} billion years`;
}

/* -- the beat pool ---------------------------------------------------
 * Each beat: a question, a slider, a live visual, and a punchline that
 * changes once the student reaches the value that makes the point.
 * `aim` marks that value so the UI can nudge them towards it.
 */

export const BEATS = [
  {
    key: 'birthday',
    ask: ['How many people before two share a birthday?', 'Guess: how big does a room need to be for a shared birthday?'],
    label: 'People in the room',
    min: 2, max: 60, initial: () => 5 + Math.floor(Math.random() * 8), aim: 23,
    visual: (n) => {
      let p = 1;
      for (let i = 0; i < n; i++) p *= (365 - i) / 365;
      return <Bars h={46} max={100} items={[
        { label: 'shared', value: (1 - p) * 100, display: `${f((1 - p) * 100, 1)}%`, colour: A },
        { label: 'all different', value: p * 100, display: `${f(p * 100, 1)}%`, colour: LINE }]} />;
    },
    read: (n) => {
      let p = 1;
      for (let i = 0; i < n; i++) p *= (365 - i) / 365;
      return {
        big: `${f((1 - p) * 100, 1)}% chance two match`,
        caption: n >= 23
          ? 'Twenty three. That is it. Your gut compared everyone to you, but the room is comparing everyone to everyone, and that is 253 different pairs.'
          : 'Most people guess somewhere near 180. Keep dragging.',
      };
    },
  },
  {
    key: 'folding',
    ask: ['Fold a sheet of paper in half, over and over. How thick before it reaches the moon?', 'How many folds of ordinary paper to reach the moon?'],
    label: 'Folds',
    min: 0, max: 45, initial: () => 6 + Math.floor(Math.random() * 6), aim: 42,
    visual: (n) => <FnPlot h={76} xMin={0} xMax={45} yMin={-4} yMax={30} axes
      fns={[{ f: (x) => Math.log2(0.1 * Math.pow(2, x)), colour: A }]}
      points={[{ x: n, y: Math.log2(0.1 * Math.pow(2, n)), colour: P }]} />,
    read: (n) => {
      const km = (0.1 * Math.pow(2, n)) / 1e6;
      return {
        big: km >= 1 ? `${f(km)} km thick` : `${f(0.1 * Math.pow(2, n), 2)} mm thick`,
        caption: km >= 384400
          ? 'Forty two folds. One sheet of paper, and you have passed the moon. The graph is squashed or the line would have left the screen by fold twenty.'
          : 'Nothing much seems to happen for the first twenty. That is the trap with doubling.',
      };
    },
  },
  {
    key: 'monty',
    ask: ['Three doors, one prize. You pick one, a door with nothing is opened. Should you switch?', 'The three door problem: stick with your pick, or switch?'],
    label: 'Games played',
    min: 30, max: 900, step: 30, initial: () => 30 + 30 * Math.floor(Math.random() * 3), aim: 300,
    visual: (n) => <Bars h={46} max={n} items={[
      { label: 'switch', value: (2 / 3) * n, display: `${f((2 / 3) * n)} wins`, colour: A },
      { label: 'stay', value: (1 / 3) * n, display: `${f((1 / 3) * n)} wins`, colour: LINE }]} />,
    read: (n) => ({
      big: `Switching wins ${f((2 / 3) * n)} of ${f(n)}`,
      caption: 'Your first pick was right one time in three, and that never changed. So the other door is holding the other two thirds. Switching is twice as good, and it feels wrong to almost everyone.',
    }),
  },
  {
    key: 'primes',
    ask: ['Why can nobody read your bank messages?', 'What actually keeps your money safe online?'],
    label: 'Digits in the key',
    min: 4, max: 40, step: 2, initial: () => 6 + 2 * Math.floor(Math.random() * 3), aim: 30,
    visual: (d) => <Bars h={46} max={20} items={[
      { label: 'multiply', value: 1, display: 'one step', colour: G },
      { label: 'undo it', value: Math.min(20, d / 2), display: `${Math.pow(10, d / 2).toExponential(0)} tries`, colour: '#c0504d' }]} />,
    read: (d) => ({
      big: `${humanTime(Math.pow(10, d / 2) / 1e9)} to break`,
      caption: 'Multiplying two primes together takes no time at all. Pulling them back out has nothing to guide the search. Your bank is protected by that gap and nothing else.',
    }),
  },
  {
    key: 'giants',
    ask: ['Why are there no giants?', 'Why can an ant lift 50 times its weight but you cannot?'],
    label: 'Scale the creature up',
    min: 1, max: 10, step: 0.5, initial: () => 1.5 + 0.5 * Math.floor(Math.random() * 3), aim: 10,
    visual: (k) => <Bars h={46} max={1000} items={[
      { label: 'leg strength', value: k * k, display: `${f(k * k, 1)}x`, colour: B },
      { label: 'body weight', value: k * k * k, display: `${f(k * k * k, 1)}x`, colour: A }]} />,
    read: (k) => ({
      big: `Weight ${f(k * k * k, 1)}x, strength only ${f(k * k, 1)}x`,
      caption: 'Strength depends on how thick the bones are, which is an area, so it grows with the square. Weight is a volume and grows with the cube. Scale a person to ten times their height and their legs snap under them.',
    }),
  },
  {
    key: 'average',
    ask: ['Two classes, identical average. Same story?', 'Can an average lie to you?'],
    label: 'Spread of the second class',
    min: 0, max: 45, initial: () => Math.floor(Math.random() * 10), aim: 45,
    visual: (s) => <Stage h={70} label="same average, different spread">
      <line x1="100" y1="8" x2="100" y2="62" stroke={A} strokeWidth="1.5" strokeDasharray="3 3" />
      {[-4, -2, 0, 2, 4].map((v, i) => <circle key={`t${i}`} cx={100 + v * 1.8} cy="24" r="5.5" fill={B} opacity="0.85" />)}
      {[-s, -s / 2, 0, s / 2, s].map((v, i) => <circle key={`w${i}`} cx={100 + v * 1.8} cy="50" r="5.5" fill={P} opacity="0.85" />)}
    </Stage>,
    read: (s) => ({
      big: 'Both classes average exactly 50',
      caption: s > 25
        ? 'Identical average, opposite realities. One class is bunched at the middle, the other has children failing and children topping. Every headline that quotes only an average is hiding a picture like this.'
        : 'Now pull the purple class apart and watch the average refuse to move.',
    }),
  },
  {
    key: 'a4',
    ask: ['Why does A4 paper fold perfectly in half, every time?', 'Why is A4 that exact odd shape?'],
    label: 'Fold it in half',
    min: 0, max: 4, initial: () => 0, aim: 4,
    visual: (n) => {
      let w = 120, h = 120 / Math.SQRT2;
      for (let i = 0; i < n; i++) { const nw = h; h = w / 2; w = nw; }
      return <Stage h={80} label="A series paper">
        <rect x={100 - w / 2} y={40 - h / 2} width={w} height={h} rx="2"
              fill="var(--clr-accent-soft)" stroke={A} strokeWidth="2" />
        <text x="100" y="44" fontSize="10" fill={INK} textAnchor="middle" fontWeight="700">A{4 + n}</text>
      </Stage>;
    },
    read: (n) => ({
      big: `A${4 + n}, and still the same shape`,
      caption: 'Cut any other rectangle in half and the proportions change. Only a ratio of 1 to root 2 survives folding, which is why every sheet in the A series looks identical and why photocopiers can scale between them without cropping anything.',
    }),
  },
  {
    key: 'gps',
    ask: ['How does your phone know where you are?', 'What does a satellite actually tell your phone?'],
    label: 'Satellites in range',
    min: 1, max: 3, initial: () => 1, aim: 3,
    visual: (n) => <Stage h={86} label="trilateration">
      {[[70, 40, 34], [130, 38, 30], [104, 70, 26]].slice(0, n).map((c, i) => (
        <circle key={i} cx={c[0]} cy={c[1]} r={c[2]} fill="none"
                stroke={[B, P, G][i]} strokeWidth="1.8" opacity="0.9" />
      ))}
      {n === 3 && <circle cx="100" cy="44" r="4.5" fill={A} />}
    </Stage>,
    read: (n) => ({
      big: [`Somewhere on this circle`, `Down to two possible points`, `Exactly one place: you`][n - 1],
      caption: 'Each satellite only says how far away you are, which puts you somewhere on a sphere. Three spheres cross at a single point. No map, no cameras, just distances and geometry.',
    }),
  },
  {
    key: 'discount',
    ask: ['50% off, then another 20% off. How much have you saved?', 'Two discounts in a row. Do they add up?'],
    label: 'Second discount',
    min: 0, max: 50, step: 5, initial: () => 5 * Math.floor(Math.random() * 4), aim: 20,
    visual: (p) => <Bars h={62} max={2400} items={[
      { label: 'sticker', value: 2400, display: '2400', colour: LINE },
      { label: 'after 50%', value: 1200, display: '1200', colour: B },
      { label: `then ${p}%`, value: 1200 * (1 - p / 100), display: f(1200 * (1 - p / 100)), colour: A }]} />,
    read: (p) => ({
      big: `You saved ${Math.round((1 - (1 - p / 100) / 2) * 100)}%, not ${50 + p}%`,
      caption: 'The second cut only bites what survived the first. Shops are perfectly happy for you to add the two numbers together, and most people do, for their whole lives.',
    }),
  },
  {
    key: 'octave',
    ask: ['Why do two different notes sound like "the same note"?', 'What makes a chord sound right?'],
    label: 'Multiply the frequency by',
    min: 1, max: 4, step: 0.25, initial: () => 1.25 + 0.25 * Math.floor(Math.random() * 3), aim: 2,
    visual: (r) => <FnPlot h={76} xMin={0} xMax={12} yMin={-1.6} yMax={1.6}
      fns={[{ f: (x) => Math.sin(x * 1.6), colour: B },
            { f: (x) => Math.sin(x * 1.6 * r) * 0.85, colour: Number.isInteger(r) ? A : P }]} />,
    read: (r) => ({
      big: r === 2 ? 'Exactly double: the same note, an octave up' : `${r} times the frequency`,
      caption: r === 2
        ? 'Double the frequency and the waves line up perfectly every cycle, so your ear hears one note rather than two. Every octave on every instrument ever built is this one ratio.'
        : 'Watch the two waves drift in and out of step. Simple ratios like 3:2 sound sweet, awkward ones sound tense. That is all harmony is.',
    }),
  },
  {
    key: 'pigeonhole',
    ask: ['Do two people in your city have exactly the same number of hairs?', 'Can you prove something about millions of people without meeting any of them?'],
    label: 'People in the city (lakhs)',
    min: 1, max: 90, initial: () => 3 + Math.floor(Math.random() * 8), aim: 90,
    visual: (l) => <Dots n={Math.min(48, Math.max(3, Math.round(l / 2)))} h={64}
      fill={(i) => (i % 7 === 0 ? A : LINE)} />,
    read: (l) => {
      const people = l * 100000;
      const share = Math.floor(people / 150000);
      return {
        big: share >= 1 ? `At least ${share + 1} people share an exact hair count` : 'Not guaranteed yet',
        caption: 'Nobody has more than about 150,000 hairs. Once the city has more people than that, two of them must match, and you have proved it without counting a single head.',
      };
    },
  },
  {
    key: 'rule72',
    ask: ['How long until money doubles?', 'What does an interest rate actually do over time?'],
    label: 'Interest rate',
    min: 1, max: 24, initial: () => 4 + Math.floor(Math.random() * 6), aim: 12, suffix: '%',
    visual: (r) => <FnPlot h={76} xMin={0} xMax={30} yMin={0} yMax={800}
      fns={[{ f: (t) => 100 * Math.pow(1 + r / 100, t), colour: A },
            { f: (t) => 100 + 100 * (r / 100) * t, colour: LINE, dashed: true }]} />,
    read: (r) => ({
      big: `Doubles in about ${f(72 / r, 1)} years`,
      caption: 'Divide 72 by the rate and you have it, near enough, in your head. The dashed line is what most people picture. The curve is what actually happens, and it is the same shape whether it is your savings or your loan.',
    }),
  },
];

export const HOOKS = [
  'Nobody ever gave you a straight answer. So here are six, and you can check every one of them yourself.',
  'You were told maths is important. You were never shown it. Let us try that instead.',
  'No speeches. Just drag the sliders and see whether the numbers surprise you.',
  'Six things that are true, that almost nobody guesses right the first time.',
];

export const CLOSES = [
  'Not every one of those has to land. One is enough to make the next hour worth it.',
  'You do not have to love maths yet. You just needed a reason that survives being checked.',
  'Every one of those was a thing you can now explain to somebody else. That is the whole idea.',
];
