/**
 * topicGraph.js — the single server-side source of truth for the 69-topic
 * prerequisite graph, served over GET /api/topic-graph.
 *
 * This same node/edge set used to be hardcoded three separate times:
 * graph/index.html, graph/path.html, and client/src/lib/prerequisiteGraph.js
 * (the one the live app actually reads). All three were verified identical
 * before this file existed — no drift had happened yet, but nothing stopped
 * it from happening next time someone edited one and not the other two.
 *
 * This file is the copy graph/index.html and graph/path.html now fetch at
 * load time instead of hardcoding their own. client/src/lib/prerequisiteGraph.js
 * remains a separate copy — it's bundled into the React app and used
 * synchronously by dozens of pure functions (getPrerequisites, getUnlocks,
 * computeGoalPath, etc.), so it can't be an async fetch without touching
 * every call site. Keeping the two legacy dev tools in sync with each other,
 * instead of drifting independently, is the real, achievable win here.
 */

const nodes = [
  // ─── Arithmetic foundations ───
  { id: 'basicarith',   label: 'Basic Arithmetic',   sub: '+, −, ×  single→4-digit',         cat: 'arith' },
  { id: 'addition',     label: 'Addition',            sub: 'Multi-digit addition drill',       cat: 'arith' },
  { id: 'multiply',     label: 'Multiplication',      sub: 'Times tables 2-19',                cat: 'arith' },
  { id: 'rounding',     label: 'Rounding',            sub: 'D.P., sig. figs, estimation',      cat: 'arith' },
  { id: 'fractionadd',  label: 'Fractions (Add)',     sub: 'LCD, mixed numbers',               cat: 'arith' },
  { id: 'percent',      label: 'Percentages',         sub: 'Find %, increase, reverse, compound', cat: 'arith' },
  { id: 'profitloss',   label: 'Profit & Loss',       sub: 'CP, SP, discounts, markup',        cat: 'arith' },
  { id: 'ratio',        label: 'Ratio',               sub: 'Simplify, divide, proportion',     cat: 'arith' },
  { id: 'sdt',          label: 'Speed / Dist / Time', sub: 'd=st, average speed, units',       cat: 'arith' },
  { id: 'squaring',     label: 'Squaring',            sub: '(a+b)² identity drill',            cat: 'arith' },

  // ─── Number theory ───
  { id: 'hcflcm',       label: 'HCF & LCM',          sub: 'Euclidean algorithm, word probs',  cat: 'numth' },
  { id: 'primefactor',  label: 'Prime Factors',       sub: 'Prime decomposition',              cat: 'numth' },
  { id: 'bases',        label: 'Number Bases',        sub: 'Binary, hex, conversions',         cat: 'numth' },

  // ─── Algebra ───
  { id: 'indices',      label: 'Indices',             sub: 'Laws, negative, fractional exp',   cat: 'alg' },
  { id: 'surds',        label: 'Surds',               sub: 'Simplify, add, rationalise',       cat: 'alg' },
  { id: 'stdform',      label: 'Standard Form',       sub: 'Scientific notation ops',          cat: 'alg' },
  { id: 'log',          label: 'Logarithms',          sub: 'Evaluate, laws, solve equations',  cat: 'alg' },
  { id: 'sqrt',         label: 'Square Root',         sub: 'Nearest-integer √ drill',          cat: 'alg' },
  { id: 'quadratic',    label: 'Quadratic (eval)',    sub: 'y = ax²+bx+c  substitution',      cat: 'alg' },
  { id: 'funceval',     label: 'Functions',           sub: 'Evaluate f(x), f(x,y), f(x,y,z)', cat: 'alg' },
  { id: 'polymul',      label: 'Poly Multiply',       sub: 'Expand products of polys',         cat: 'alg' },
  { id: 'polyfactor',   label: 'Poly Factor',         sub: 'Factorise quadratics',             cat: 'alg' },
  { id: 'qformula',     label: 'Quadratic Formula',   sub: 'Find roots of ax²+bx+c = 0',      cat: 'alg' },
  { id: 'simul',        label: 'Simultaneous Eq.',    sub: '2×2 and 3×3 linear systems',       cat: 'alg' },
  { id: 'ineq',         label: 'Inequalities',        sub: 'Linear & quadratic inequalities',  cat: 'alg' },
  { id: 'sequences',    label: 'Sequences',           sub: 'AP & GP: nth term, sum',           cat: 'alg' },
  { id: 'variation',    label: 'Variation',            sub: 'Direct & inverse proportion',      cat: 'alg' },
  { id: 'binomial',     label: 'Binomial Theorem',    sub: 'nCr, expansion, coefficients',     cat: 'alg' },
  { id: 'complex',      label: 'Complex Numbers',     sub: 'Add, multiply, modulus',           cat: 'alg' },
  { id: 'bounds',       label: 'Bounds',              sub: 'Error intervals, propagation',     cat: 'alg' },

  // ─── Geometry ───
  { id: 'angles',       label: 'Angles',              sub: 'Straight line, point, parallel',   cat: 'geom' },
  { id: 'triangles',    label: 'Triangles',           sub: 'Angle sum, isosceles, exterior',   cat: 'geom' },
  { id: 'polygons',     label: 'Polygons',            sub: 'Interior / exterior angles',       cat: 'geom' },
  { id: 'congruence',   label: 'Congruence',          sub: 'SSS, SAS, ASA conditions',         cat: 'geom' },
  { id: 'similarity',   label: 'Similarity',          sub: 'Scale factor, area/vol ratios',    cat: 'geom' },
  { id: 'pythag',       label: "Pythagoras' Theorem", sub: 'Hypotenuse, legs, 3D',             cat: 'geom' },
  { id: 'circleth',     label: 'Circle Theorems',     sub: 'Semicircle, cyclic quad, tangent', cat: 'geom' },
  { id: 'mensur',       label: 'Mensuration',         sub: 'Area, perimeter, volume, SA',      cat: 'geom' },
  { id: 'transform',    label: 'Transformations',     sub: 'Reflect, rotate, translate, enlarge', cat: 'geom' },
  { id: 'bearings',     label: 'Bearings',            sub: '3-figure bearings, back bearing',  cat: 'geom' },
  { id: 'coordgeom',    label: 'Coord. Geometry',     sub: 'Midpoint, distance, gradient',     cat: 'geom' },
  { id: 'lineq',        label: 'Line Equation',       sub: 'y = mx + c from two points',       cat: 'geom' },
  { id: 'trig',         label: 'Trigonometry',        sub: 'SOH-CAH-TOA, sine/cosine rule',   cat: 'geom' },

  // ─── Calculus ───
  { id: 'diff',         label: 'Differentiation',     sub: 'Power rule, turning points',       cat: 'calc' },
  { id: 'integ',        label: 'Integration',         sub: 'Antiderivatives, definite ∫',      cat: 'calc' },

  // ─── Stats & Probability ───
  { id: 'stats',        label: 'Statistics',           sub: 'Mean, median, mode, range',        cat: 'stats' },
  { id: 'prob',         label: 'Probability',          sub: 'Simple, combined, conditional',    cat: 'stats' },
  { id: 'sets',         label: 'Sets',                 sub: 'Union, intersection, Venn',        cat: 'stats' },

  // ─── Vectors & Matrices ───
  { id: 'vectors',      label: 'Vectors',              sub: 'Add, scale, magnitude',            cat: 'vecmat' },
  { id: 'dotprod',      label: 'Dot Products',         sub: 'Dot product, matrix multiply',     cat: 'vecmat' },
  { id: 'matrix',       label: 'Matrices',             sub: 'Add, scalar ×, det, multiply',     cat: 'vecmat' },

  // ─── Other / Non-prerequisite ───
  { id: 'gk',           label: 'General Knowledge',    sub: 'Multiple-choice trivia',           cat: 'other' },
  { id: 'vocab',        label: 'Vocabulary',            sub: 'Word definitions',                 cat: 'other' },
  { id: 'spot',         label: 'Twin Hunt',             sub: 'Find the common object',           cat: 'other' },

  // ─── New puzzles ───
  { id: 'lineareq',     label: 'Linear Equations',     sub: 'Solve ax + b = c',                 cat: 'alg' },
  { id: 'decimals',     label: 'Decimals',             sub: '+, −, ×, ÷ with decimal places',   cat: 'arith' },
  { id: 'permcomb',     label: 'Perm. & Comb.',        sub: 'nPr, nCr, counting principles',    cat: 'stats' },
  { id: 'limits',       label: 'Limits',               sub: 'Limits at a point, infinity',      cat: 'calc' },
  { id: 'invtrig',      label: 'Inverse Trig',         sub: 'arcsin, arccos, arctan',           cat: 'geom' },
  { id: 'remfactor',    label: 'Remainder Theorem',    sub: 'Polynomial division, roots',       cat: 'alg' },
  { id: 'heron',        label: "Heron's Formula",      sub: 'Area from three sides',            cat: 'geom' },
  { id: 'shares',       label: 'Shares & Dividends',   sub: 'Stock, dividends, returns',        cat: 'arith' },
  { id: 'banking',      label: 'Banking (RD)',         sub: 'Recurring deposits, interest',     cat: 'arith' },
  { id: 'gst',          label: 'GST',                  sub: 'Goods and Services Tax',           cat: 'arith' },
  { id: 'section',      label: 'Section Formula',      sub: 'Internal & external division',     cat: 'geom' },
  { id: 'linprog',      label: 'Linear Programming',   sub: 'Optimise linear objective',        cat: 'alg' },
  { id: 'circmeasure',  label: 'Circular Measure',     sub: 'Radians, arc length, area',        cat: 'geom' },
  { id: 'conics',       label: 'Conic Sections',       sub: 'Circle, parabola, ellipse',        cat: 'geom' },
  { id: 'diffeq',       label: 'Differential Eq.',     sub: 'Solve dy/dx = f(x)',               cat: 'calc' },

]

// ═══════════════════════════════════════════════════════════════
// EDGES — directed: [prerequisite, dependent]
// "You should know A before attempting B"
// Only DIRECT prerequisites (no transitive edges)
// ═══════════════════════════════════════════════════════════════
const edges = [
  // ─── Arithmetic chain ───
  ['basicarith', 'addition'],        // addition is multi-digit basic arith
  ['basicarith', 'multiply'],        // multiplication needs +, −
  ['basicarith', 'rounding'],        // rounding needs number sense
  ['multiply',   'squaring'],        // squaring uses (a+b)² which needs ×
  ['addition',   'squaring'],        // squaring also needs addition
  ['multiply',   'fractionadd'],     // fractions need × for LCD
  ['fractionadd','percent'],         // percentages build on fractions
  ['percent',    'profitloss'],      // profit/loss is applied percentages
  ['ratio',      'percent'],         // percentages are ratios out of 100
  ['basicarith', 'ratio'],           // ratios need ÷ and ×
  ['multiply',   'sdt'],             // speed=dist/time needs × and ÷
  ['ratio',      'sdt'],             // SDT is proportional reasoning

  // ─── Number theory ───
  ['multiply',    'hcflcm'],         // HCF/LCM needs multiplication/division
  ['hcflcm',      'primefactor'],    // prime factoring builds on factor understanding
  ['basicarith',  'bases'],          // base conversion needs division, mod

  // ─── Algebra: indices → surds → logs ───
  ['multiply',   'indices'],         // indices generalise repeated multiplication
  ['indices',    'surds'],           // surds are fractional indices (a^½)
  ['indices',    'log'],             // logarithms are inverse of exponentiation
  ['indices',    'stdform'],         // standard form uses powers of 10
  ['multiply',   'sqrt'],            // square root needs × understanding
  ['squaring',   'sqrt'],            // sqrt is inverse of squaring

  // ─── Algebra: polynomials & equations ───
  ['basicarith', 'funceval'],        // function evaluation is substitution + arithmetic
  ['multiply',   'quadratic'],       // evaluating ax²+bx+c needs ×
  ['indices',    'quadratic'],       // quadratic eval uses x²
  ['multiply',   'polymul'],         // polynomial multiplication extends × to expressions
  ['indices',    'polymul'],         // poly mul uses exponent rules
  ['polymul',    'polyfactor'],      // factoring is reverse of expansion
  ['polyfactor', 'qformula'],        // quadratic formula solves what factoring cannot
  ['sqrt',       'qformula'],        // formula involves √(discriminant)
  ['basicarith', 'simul'],           // simultaneous eq. needs +, −, ×
  ['funceval',   'simul'],           // simul eq. evaluates linear expressions
  ['basicarith', 'ineq'],            // inequalities need arithmetic
  ['polyfactor', 'ineq'],            // quadratic inequalities need factoring
  ['basicarith', 'sequences'],       // sequences need +, ×
  ['multiply',   'sequences'],       // GP needs multiplication
  ['indices',    'sequences'],       // GP uses aⁿ notation
  ['ratio',      'variation'],       // variation is generalised proportion
  ['indices',    'variation'],       // y = kx² etc. use powers
  ['indices',    'binomial'],        // binomial expansion uses xⁿ
  ['polymul',    'binomial'],        // binomial expands products
  ['sqrt',       'complex'],         // complex numbers arise from √(negative)
  ['qformula',   'complex'],         // complex roots from quadratic formula
  ['rounding',   'bounds'],          // bounds come from rounding precision

  // ─── Geometry ───
  ['basicarith', 'angles'],          // angle arithmetic
  ['angles',     'triangles'],       // triangle angle sum builds on angle rules
  ['angles',     'polygons'],        // polygon angles generalise triangle angles
  ['triangles',  'polygons'],        // polygon = sum of triangles
  ['triangles',  'congruence'],      // congruence is about identical triangles
  ['triangles',  'similarity'],      // similarity generalises congruence
  ['ratio',      'similarity'],      // similarity uses scale factors (ratios)
  ['triangles',  'pythag'],          // Pythagoras applies to right triangles
  ['squaring',   'pythag'],          // a² + b² = c² uses squaring
  ['angles',     'circleth'],        // circle theorems are about angles in circles
  ['triangles',  'circleth'],        // inscribed triangles in circles
  ['multiply',   'mensur'],          // area/volume use × extensively
  ['squaring',   'mensur'],          // πr² uses squaring
  ['polygons',   'mensur'],          // mensuration of regular polygons
  ['angles',     'transform'],       // rotations use angle knowledge
  ['coordgeom',  'transform'],       // transformations operate on coordinates
  ['angles',     'bearings'],        // bearings are angles from north
  ['basicarith', 'coordgeom'],       // coordinate geometry needs arithmetic
  ['pythag',     'coordgeom'],       // distance formula is Pythagoras
  ['coordgeom',  'lineq'],           // line equation uses gradient from coords
  ['fractionadd','lineq'],           // slope can be a fraction
  ['pythag',     'trig'],            // trig builds directly on right triangles
  ['angles',     'trig'],            // trig is about angle relationships
  ['ratio',      'trig'],            // sin/cos/tan are ratios

  // ─── Calculus ───
  ['indices',    'diff'],            // power rule: d/dx xⁿ = nxⁿ⁻¹
  ['polymul',    'diff'],            // differentiating polynomials
  ['quadratic',  'diff'],            // turning points of quadratics
  ['diff',       'integ'],           // integration is reverse differentiation

  // ─── Stats & Probability ───
  ['basicarith', 'stats'],           // mean, median need +, ÷
  ['fractionadd','prob'],            // probability uses fractions
  ['basicarith', 'prob'],            // counting outcomes
  ['basicarith', 'sets'],            // set cardinality is counting

  // ─── Vectors & Matrices ───
  ['basicarith', 'vectors'],         // vector addition is component-wise +
  ['vectors',    'dotprod'],         // dot product extends vector operations
  ['multiply',   'matrix'],          // matrix multiply needs ×
  ['basicarith', 'matrix'],          // matrix add needs +
  ['matrix',     'dotprod'],         // matrix multiplication is in dot products

  // ─── New prerequisite edges ───
  ['basicarith', 'decimals'],        // decimals extend basic arithmetic
  ['basicarith', 'lineareq'],        // linear equations need basic arithmetic
  ['lineareq',   'simul'],           // simultaneous equations extend linear equations
  ['basicarith', 'shares'],          // shares need basic arithmetic
  ['basicarith', 'banking'],         // banking needs basic arithmetic
  ['percent',    'gst'],             // GST is a percentage application
  ['percent',    'shares'],          // dividends are percentage of shares
  ['percent',    'banking'],         // interest rates are percentages
  ['basicarith', 'permcomb'],        // permutations/combinations need counting
  ['sequences',  'limits'],          // sequence limits
  ['limits',     'diff'],            // limits are fundamental to differentiation
  ['trig',       'invtrig'],         // inverse trig extends trigonometry
  ['trig',       'circmeasure'],     // circular measure builds on angle concepts
  ['coordgeom',  'section'],         // section formula uses coordinates
  ['coordgeom',  'conics'],          // conic sections use coordinate geometry
  ['polyfactor', 'remfactor'],       // remainder theorem uses polynomial factors
  ['polymul',    'remfactor'],       // remainder theorem relates to polynomial multiplication
  ['pythag',     'heron'],           // Heron's formula uses triangle properties
  ['triangles',  'heron'],           // Heron's formula applies to triangles
  ['mensur',     'heron'],           // Heron's formula is a mensuration formula
  ['lineareq',   'linprog'],         // linear programming uses linear equations
  ['ineq',       'linprog'],         // linear programming uses inequalities
  ['diff',       'diffeq'],          // differential equations use differentiation
  ['integ',      'diffeq'],          // differential equations use integration

]

module.exports = { nodes, edges };
