/**
 * glossaryVisuals.jsx — Inline SVG visual registry for Feature AQ.
 *
 * One small SVG component per curated glossary term. All entries share
 * `viewBox="0 0 120 120"`, the `glossary-visual` className, and stroke-based
 * `currentColor` so the wrapper controls the colour via CSS.
 */
import React from 'react';

const V = {

  // SHAPES (18)
  triangle: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="60,18 102,98 18,98" />
    </svg>
  ),
  quadrilateral: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="22,30 100,25 92,95 30,95" />
    </svg>
  ),
  pentagon: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="60,15 100,45 88,95 32,95 20,45" />
    </svg>
  ),
  hexagon: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="60,15 100,38 100,82 60,105 20,82 20,38" />
    </svg>
  ),
  heptagon: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="60,15 88,28 100,60 88,92 60,105 32,92 20,60 32,28" />
    </svg>
  ),
  octagon: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="38,18 82,18 102,38 102,82 82,102 38,102 18,82 18,38" />
    </svg>
  ),
  polygon: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="60,15 95,38 92,75 75,100 35,98 18,70 25,35" />
    </svg>
  ),
  parallelogram: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="25,30 95,30 105,90 35,90" />
    </svg>
  ),
  trapezium: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="20,30 100,30 80,90 40,90" />
    </svg>
  ),
  rectangle: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="20" y="30" width="80" height="60" />
    </svg>
  ),
  square: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="25" y="25" width="70" height="70" />
    </svg>
  ),
  circle: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="60" cy="60" r="40" />
    </svg>
  ),
  cube: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="22,40 60,22 88,40 50,58" />
      <polygon points="22,40 22,82 50,100 50,58" />
      <polygon points="50,58 88,40 88,82 50,100" />
    </svg>
  ),
  sphere: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="60" cy="60" r="40" />
      <ellipse cx="60" cy="60" rx="40" ry="14" />
      <ellipse cx="60" cy="60" rx="14" ry="40" />
    </svg>
  ),
  cylinder: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="60" cy="25" rx="30" ry="8" />
      <line x1="30" y1="25" x2="30" y2="95" />
      <line x1="90" y1="25" x2="90" y2="95" />
      <path d="M30 95 Q30 103 60 103 Q90 103 90 95" />
    </svg>
  ),
  cone: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="60" cy="95" rx="30" ry="8" />
      <line x1="32" y1="92" x2="60" y2="18" />
      <line x1="88" y1="92" x2="60" y2="18" />
    </svg>
  ),
  pyramid: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="60,18 100,90 20,90" />
      <line x1="60" y1="18" x2="60" y2="90" strokeDasharray="3 3" />
    </svg>
  ),
  prism: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="20,30 35,15 95,15 80,30" />
      <polygon points="20,30 20,85 80,85 80,30" />
      <polygon points="80,30 95,15 95,70 80,85" />
    </svg>
  ),

  // ANGLES & LINES (15)
  angle: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="20" y1="100" x2="100" y2="100" />
      <line x1="20" y1="100" x2="95" y2="35" />
      <path d="M50 100 A30 30 0 0 0 64 84" />
    </svg>
  ),
  "right angle": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="18,100 100,100 100,18" />
      <rect x="82" y="82" width="18" height="18" />
    </svg>
  ),
  "acute angle": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="20" y1="100" x2="100" y2="100" />
      <line x1="20" y1="100" x2="95" y2="65" />
      <path d="M48 100 A28 28 0 0 0 50 78" />
    </svg>
  ),
  "obtuse angle": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="20" y1="100" x2="100" y2="100" />
      <line x1="20" y1="100" x2="35" y2="30" />
      <path d="M50 100 A30 30 0 0 1 30 60" />
    </svg>
  ),
  "reflex angle": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="20" y1="100" x2="100" y2="100" />
      <line x1="20" y1="100" x2="35" y2="30" />
      <path d="M70 100 A50 50 0 1 1 30 60" />
    </svg>
  ),
  "interior angle": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="20,90 100,90 60,20" />
      <path d="M50 90 A25 25 0 0 1 42 65" />
    </svg>
  ),
  "exterior angle": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="20,85 80,85 80,30" />
      <line x1="80" y1="85" x2="110" y2="85" />
      <path d="M98 85 A18 18 0 0 0 88 67" />
    </svg>
  ),
  parallel: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="15" y1="40" x2="105" y2="40" />
      <line x1="15" y1="80" x2="105" y2="80" />
    </svg>
  ),
  perpendicular: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="15" y1="60" x2="105" y2="60" />
      <line x1="60" y1="15" x2="60" y2="105" />
      <rect x="60" y="50" width="10" height="10" />
    </svg>
  ),
  "perpendicular bisector": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="15" y1="60" x2="105" y2="60" />
      <line x1="60" y1="15" x2="60" y2="105" strokeDasharray="4 3" />
      <rect x="55" y="55" width="10" height="10" />
    </svg>
  ),
  midpoint: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="60" x2="102" y2="60" />
      <circle cx="60" cy="60" r="4" fill="currentColor" />
    </svg>
  ),
  vertical: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <line x1="60" y1="15" x2="60" y2="105" />
    </svg>
  ),
  horizontal: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <line x1="15" y1="60" x2="105" y2="60" />
    </svg>
  ),
  diagonal: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="22" y="22" width="76" height="76" />
      <line x1="22" y1="22" x2="98" y2="98" />
    </svg>
  ),
  bearing: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="60" cy="60" r="40" />
      <line x1="60" y1="20" x2="60" y2="100" />
      <polygon points="55,25 65,25 60,15" fill="currentColor" />
      <line x1="60" y1="60" x2="98" y2="35" strokeWidth="2" />
      <path d="M60 45 A15 15 0 0 1 73 52" strokeWidth="1.5" />
      <polygon points="93,32 100,35 96,42" fill="currentColor" />
      <text x="78" y="32" fill="currentColor" fontSize="12" fontFamily="serif">N</text>
    </svg>
  ),

  // CIRCLE PARTS (9)
  arc: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="60" cy="60" r="40" strokeWidth="1" strokeDasharray="3 4" />
      <path d="M60 20 A40 40 0 0 1 100 60" strokeWidth="3" />
    </svg>
  ),
  chord: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="60" cy="60" r="40" />
      <line x1="28" y1="82" x2="92" y2="38" strokeWidth="2.5" />
    </svg>
  ),
  sector: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="60" cy="60" r="40" strokeWidth="1" strokeDasharray="3 4" />
      <path d="M60 60 L96 75 A40 40 0 0 0 96 45 Z" fill="currentColor" fillOpacity="0.18" />
      <line x1="60" y1="60" x2="96" y2="75" strokeWidth="1.5" />
      <line x1="60" y1="60" x2="96" y2="45" strokeWidth="1.5" />
      <path d="M96 75 A40 40 0 0 0 96 45" strokeWidth="2.5" />
    </svg>
  ),
  segment: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="60" cy="60" r="40" strokeWidth="1" strokeDasharray="3 4" />
      <line x1="28" y1="82" x2="92" y2="38" />
      <path d="M28 82 A40 40 0 0 0 92 38" fill="currentColor" fillOpacity="0.18" />
    </svg>
  ),
  semicircle: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="20" y1="90" x2="100" y2="90" />
      <path d="M20 90 A40 40 0 0 0 100 90" />
    </svg>
  ),
  circumference: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="60" cy="60" r="40" />
      <path d="M60 20 A40 40 0 0 1 100 60" strokeWidth="3" />
      <path d="M100 60 A40 40 0 0 1 60 100" strokeWidth="3" />
    </svg>
  ),
  radius: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="60" cy="60" r="40" />
      <line x1="60" y1="60" x2="100" y2="60" strokeWidth="2.5" />
      <circle cx="60" cy="60" r="3" fill="currentColor" />
      <text x="80" y="54" fill="currentColor" stroke="none" fontSize="13" fontFamily="serif" textAnchor="middle">r</text>
    </svg>
  ),
  diameter: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="60" cy="60" r="40" />
      <line x1="20" y1="60" x2="100" y2="60" strokeWidth="2.5" />
    </svg>
  ),
  centre: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="60" cy="60" r="40" />
      <circle cx="60" cy="60" r="4" fill="currentColor" />
    </svg>
  ),

  // TRIANGLES (4)
  "equilateral triangle": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="60,18 95,90 25,90" />
      <line x1="42" y1="60" x2="48" y2="84" />
      <line x1="78" y1="60" x2="72" y2="84" />
      <line x1="52" y1="32" x2="46" y2="55" />
    </svg>
  ),
  "isosceles triangle": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="60,18 90,90 30,90" />
      <line x1="48" y1="60" x2="42" y2="84" />
      <line x1="72" y1="60" x2="78" y2="84" />
    </svg>
  ),
  "scalene triangle": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="25,30 100,55 40,98" />
    </svg>
  ),
  "right-angled triangle": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="20,95 95,95 95,28" />
      <rect x="83" y="83" width="12" height="12" />
    </svg>
  ),

  // TRANSFORMATIONS (10)
  reflection: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="60" y1="15" x2="60" y2="105" strokeWidth="1" strokeDasharray="4 3" />
      <polyline points="22,80 42,55 22,30" />
      <polyline points="98,80 78,55 98,30" />
    </svg>
  ),
  rotation: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="35,75 55,40 75,75" />
      <path d="M75 75 A40 40 0 1 1 25 60" strokeDasharray="3 3" />
      <polygon points="22,55 28,55 25,65" fill="currentColor" />
      <circle cx="55" cy="80" r="2.5" fill="currentColor" />
    </svg>
  ),
  translation: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="15,75 35,40 55,75" />
      <polyline points="65,75 85,40 105,75" />
      <line x1="55" y1="60" x2="65" y2="60" strokeWidth="1.5" />
      <polygon points="62,57 68,60 62,63" fill="currentColor" />
    </svg>
  ),
  enlargement: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="15" y="55" width="20" height="20" />
      <rect x="55" y="30" width="40" height="40" />
      <circle cx="55" cy="65" r="2" fill="currentColor" />
    </svg>
  ),
  transformation: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="15,80 35,40 55,80" />
      <polygon points="65,80 85,40 105,80" />
      <line x1="55" y1="60" x2="65" y2="60" strokeWidth="1.5" />
      <polygon points="62,57 68,60 62,63" fill="currentColor" />
    </svg>
  ),
  "scale factor": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="12" y="50" width="18" height="22" />
      <rect x="48" y="35" width="32" height="52" />
      <rect x="92" y="22" width="18" height="78" />
      <text x="60" y="105" fill="currentColor" stroke="none" fontSize="11" fontFamily="serif" textAnchor="middle" opacity="0.7">ÃƒÆ’Ã¢â‚¬â€1  ÃƒÆ’Ã¢â‚¬â€2  ÃƒÆ’Ã¢â‚¬â€3</text>
    </svg>
  ),
  symmetry: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="60" y1="15" x2="60" y2="105" strokeWidth="1" strokeDasharray="4 3" />
      <polygon points="60,20 95,95 25,95" strokeLinejoin="round" />
    </svg>
  ),
  tessellation: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="22,22 60,22 60,60 22,60" />
      <polygon points="60,22 98,22 98,60 60,60" />
      <polygon points="98,22 110,40 110,60 98,60" />
      <polygon points="22,60 60,60 60,98 22,98" />
      <polygon points="60,60 98,60 98,98 60,98" />
      <polygon points="98,60 110,60 110,98 98,98" />
    </svg>
  ),
  net: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="22,30 60,15 98,30 80,65 60,80 40,65" />
      <line x1="60" y1="15" x2="60" y2="80" strokeDasharray="3 3" />
      <line x1="22" y1="30" x2="40" y2="65" strokeDasharray="3 3" />
      <line x1="98" y1="30" x2="80" y2="65" strokeDasharray="3 3" />
    </svg>
  ),
  "cross-section": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="60" cy="60" rx="30" ry="12" strokeDasharray="3 3" />
      <line x1="20" y1="35" x2="100" y2="35" />
      <line x1="20" y1="85" x2="100" y2="85" />
      <line x1="22" y1="35" x2="22" y2="85" />
      <line x1="98" y1="35" x2="98" y2="85" />
    </svg>
  ),

  // ALGEBRA (22)
  expression: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="24" fontFamily="serif">2x + 3y &#8722; 5</text>
    </svg>
  ),
  term: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <text x="60" y="72" fill="currentColor" stroke="none" textAnchor="middle" fontSize="28" fontFamily="serif">5x</text>
      <circle cx="60" cy="60" r="24" strokeDasharray="3 3" />
    </svg>
  ),
  "like terms": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="32" y="50" fill="currentColor" textAnchor="middle" fontSize="22" fontFamily="serif">3x</text>
      <text x="88" y="50" fill="currentColor" textAnchor="middle" fontSize="22" fontFamily="serif">5x</text>
      <text x="60" y="55" fill="currentColor" textAnchor="middle" fontSize="22" fontFamily="serif">+</text>
      <text x="60" y="95" fill="currentColor" textAnchor="middle" fontSize="26" fontFamily="serif">8x</text>
    </svg>
  ),
  equation: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="26" fontFamily="serif">3x + 2 = 11</text>
    </svg>
  ),
  inequality: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="28" fontFamily="serif">x &gt; 5</text>
    </svg>
  ),
  formula: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="26" fontFamily="serif">A = &#960;r&#178;</text>
    </svg>
  ),
  function: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="26" fontFamily="serif">f(x) = 2x + 1</text>
    </svg>
  ),
  linear: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="15" y1="20" x2="15" y2="100" strokeWidth="1" />
      <line x1="15" y1="100" x2="105" y2="100" strokeWidth="1" />
      <line x1="20" y1="92" x2="100" y2="32" strokeWidth="2" />
    </svg>
  ),
  quadratic: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="15" y1="20" x2="15" y2="100" strokeWidth="1" />
      <line x1="15" y1="100" x2="105" y2="100" strokeWidth="1" />
      <path d="M18 92 Q60 12 102 92" />
    </svg>
  ),
  cubic: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="15" y1="20" x2="15" y2="100" strokeWidth="1" />
      <line x1="15" y1="100" x2="105" y2="100" strokeWidth="1" />
      <path d="M18 60 C30 100 50 100 60 50 S90 0 102 60" />
    </svg>
  ),
  expand: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="35" y="72" fill="currentColor" textAnchor="middle" fontSize="18" fontFamily="serif">2(x+3)</text>
      <text x="90" y="72" fill="currentColor" textAnchor="middle" fontSize="18" fontFamily="serif">2x+6</text>
      <polygon points="62,64 75,64 68,76" fill="currentColor" />
    </svg>
  ),
  factorise: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="35" y="72" fill="currentColor" textAnchor="middle" fontSize="18" fontFamily="serif">x&#178;+5x</text>
      <text x="90" y="72" fill="currentColor" textAnchor="middle" fontSize="18" fontFamily="serif">x(x+5)</text>
      <polygon points="62,64 75,64 68,76" fill="currentColor" />
    </svg>
  ),
  simplify: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="35" y="72" fill="currentColor" textAnchor="middle" fontSize="20" fontFamily="serif">&#178;&#8260;&#8320;&#8324;</text>
      <text x="90" y="72" fill="currentColor" textAnchor="middle" fontSize="22" fontFamily="serif">&#189;</text>
      <polygon points="62,64 75,64 68,76" fill="currentColor" />
    </svg>
  ),
  solve: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <text x="60" y="72" fill="currentColor" stroke="none" textAnchor="middle" fontSize="28" fontFamily="serif">x = 4</text>
      <circle cx="60" cy="60" r="26" strokeDasharray="3 3" />
    </svg>
  ),
  root: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="26" fontFamily="serif">x&#178; = 0</text>
    </svg>
  ),
  solution: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="28" fontFamily="serif">x = 5</text>
      <circle cx="92" cy="40" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
      <polyline points="85,42 91,48 100,36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  "y-intercept": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="15" y1="60" x2="105" y2="60" />
      <line x1="60" y1="15" x2="60" y2="105" />
      <line x1="22" y1="95" x2="98" y2="30" strokeWidth="2" />
      <circle cx="60" cy="42" r="4" fill="currentColor" />
      <text x="68" y="36" fill="currentColor" stroke="none" fontSize="13" fontFamily="serif">y-int</text>
    </svg>
  ),
  "x-intercept": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="15" y1="60" x2="105" y2="60" />
      <line x1="60" y1="15" x2="60" y2="105" />
      <line x1="22" y1="95" x2="98" y2="30" strokeWidth="2" />
      <circle cx="92" cy="48" r="4" fill="currentColor" />
      <text x="70" y="48" fill="currentColor" stroke="none" fontSize="13" fontFamily="serif">x-int</text>
    </svg>
  ),
  discriminant: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="22" fontFamily="serif">b&#178; &#8722; 4ac</text>
    </svg>
  ),
  asymptote: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="15" y1="60" x2="105" y2="60" strokeWidth="1" strokeDasharray="5 3" />
      <path d="M20 95 Q60 30 100 32" />
    </svg>
  ),
  "turning point": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 95 Q60 10 105 95" />
      <circle cx="60" cy="30" r="4" fill="currentColor" />
    </svg>
  ),
  "stationary point": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 95 C30 30 90 30 105 95" />
      <line x1="40" y1="32" x2="80" y2="32" strokeWidth="1" />
      <circle cx="60" cy="38" r="3" fill="currentColor" />
    </svg>
  ),

  // NUMBER & ARITHMETIC (48)
  digit: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="84" fill="currentColor" textAnchor="middle" fontSize="50" fontFamily="monospace" fontWeight="600">18</text>
    </svg>
  ),
  integer: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="15" y1="60" x2="105" y2="60" />
      <circle cx="25" cy="60" r="2" fill="currentColor" />
      <circle cx="40" cy="60" r="2" fill="currentColor" />
      <circle cx="55" cy="60" r="2" fill="currentColor" />
      <circle cx="70" cy="60" r="2" fill="currentColor" />
      <circle cx="85" cy="60" r="2" fill="currentColor" />
      <circle cx="100" cy="60" r="2" fill="currentColor" />
    </svg>
  ),
  fraction: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="35" y1="60" x2="85" y2="60" />
      <text x="60" y="50" fill="currentColor" stroke="none" textAnchor="middle" fontSize="28" fontFamily="serif">3</text>
      <text x="60" y="92" fill="currentColor" stroke="none" textAnchor="middle" fontSize="28" fontFamily="serif">4</text>
    </svg>
  ),
  decimal: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="78" fill="currentColor" textAnchor="middle" fontSize="40" fontFamily="serif">3.142</text>
    </svg>
  ),
  numerator: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="35" y1="60" x2="85" y2="60" />
      <text x="60" y="48" fill="currentColor" stroke="none" textAnchor="middle" fontSize="28" fontFamily="serif" fontWeight="700">3</text>
      <text x="60" y="92" fill="currentColor" stroke="none" textAnchor="middle" fontSize="28" fontFamily="serif">4</text>
      <polygon points="55,38 65,38 60,50" fill="currentColor" />
    </svg>
  ),
  denominator: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="35" y1="60" x2="85" y2="60" />
      <text x="60" y="48" fill="currentColor" stroke="none" textAnchor="middle" fontSize="28" fontFamily="serif">3</text>
      <text x="60" y="92" fill="currentColor" stroke="none" textAnchor="middle" fontSize="28" fontFamily="serif" fontWeight="700">4</text>
      <polygon points="55,82 65,82 60,72" fill="currentColor" />
    </svg>
  ),
  "proper fraction": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="35" y1="60" x2="85" y2="60" />
      <text x="60" y="50" fill="currentColor" stroke="none" textAnchor="middle" fontSize="24" fontFamily="serif">&#8531;</text>
    </svg>
  ),
  "improper fraction": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="35" y1="60" x2="85" y2="60" />
      <text x="60" y="50" fill="currentColor" stroke="none" textAnchor="middle" fontSize="24" fontFamily="serif">&#8533;</text>
    </svg>
  ),
  "mixed number": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <text x="25" y="72" fill="currentColor" stroke="none" textAnchor="middle" fontSize="32" fontFamily="serif">2</text>
      <line x1="48" y1="78" x2="98" y2="78" />
      <text x="73" y="68" fill="currentColor" stroke="none" textAnchor="middle" fontSize="22" fontFamily="serif">3</text>
      <text x="73" y="96" fill="currentColor" stroke="none" textAnchor="middle" fontSize="22" fontFamily="serif">4</text>
    </svg>
  ),
  "equivalent fraction": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="20" y1="60" x2="55" y2="60" />
      <text x="37" y="52" fill="currentColor" stroke="none" textAnchor="middle" fontSize="20" fontFamily="serif">1</text>
      <text x="37" y="88" fill="currentColor" stroke="none" textAnchor="middle" fontSize="20" fontFamily="serif">2</text>
      <text x="60" y="68" fill="currentColor" stroke="none" textAnchor="middle" fontSize="20" fontFamily="serif">=</text>
      <line x1="65" y1="60" x2="100" y2="60" />
      <text x="82" y="52" fill="currentColor" stroke="none" textAnchor="middle" fontSize="20" fontFamily="serif">2</text>
      <text x="82" y="88" fill="currentColor" stroke="none" textAnchor="middle" fontSize="20" fontFamily="serif">4</text>
    </svg>
  ),
  "recurring decimal": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <text x="60" y="76" fill="currentColor" stroke="none" textAnchor="middle" fontSize="32" fontFamily="serif">0.3&#x0304;3&#x0304;3&#x0304;</text>
    </svg>
  ),
  "terminating decimal": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="32" fontFamily="serif">0.125</text>
    </svg>
  ),
  percent: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="78" fill="currentColor" textAnchor="middle" fontSize="42" fontFamily="serif">50%</text>
    </svg>
  ),
  percentage: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="60" cy="60" r="40" />
      <path d="M60 60 L60 20 A40 40 0 0 1 99 70 Z" fill="currentColor" fillOpacity="0.25" />
    </svg>
  ),
  ratio: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="78" fill="currentColor" textAnchor="middle" fontSize="38" fontFamily="serif">3 : 1</text>
    </svg>
  ),
  proportion: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="68" fill="currentColor" textAnchor="middle" fontSize="22" fontFamily="serif">a/b = c/d</text>
    </svg>
  ),
  BODMAS: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="50" fill="currentColor" textAnchor="middle" fontSize="18" fontFamily="serif" fontWeight="600">B &#183; O &#183; D &#183; M &#183; A &#183; S</text>
      <text x="60" y="78" fill="currentColor" textAnchor="middle" fontSize="11" fontFamily="serif" opacity="0.6">brackets, orders, &#247;, &#215;, +, &#8722;</text>
    </svg>
  ),
  sum: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="24" fontFamily="serif">17 + 18 = 35</text>
    </svg>
  ),
  product: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="28" fontFamily="serif">6 &#215; 4 = 24</text>
    </svg>
  ),
  quotient: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="28" fontFamily="serif">20 &#247; 4 = 5</text>
    </svg>
  ),
  difference: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="28" fontFamily="serif">10 &#8722; 3 = 7</text>
    </svg>
  ),
  inverse: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <text x="35" y="72" fill="currentColor" stroke="none" textAnchor="middle" fontSize="28" fontFamily="serif">+5</text>
      <text x="85" y="72" fill="currentColor" stroke="none" textAnchor="middle" fontSize="28" fontFamily="serif">&#8722;5</text>
      <line x1="55" y1="62" x2="65" y2="62" />
      <polygon points="62,57 70,62 62,67" fill="currentColor" />
      <polygon points="58,57 50,62 58,67" fill="currentColor" />
    </svg>
  ),
  reciprocal: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="28" fontFamily="serif">x &#215; &#8531; = 1</text>
    </svg>
  ),
  prime: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <text x="60" y="78" fill="currentColor" stroke="none" textAnchor="middle" fontSize="50" fontFamily="serif" fontWeight="600">7</text>
      <circle cx="60" cy="60" r="34" strokeDasharray="3 3" />
    </svg>
  ),
  "prime number": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="58" fill="currentColor" textAnchor="middle" fontSize="22" fontFamily="serif">2, 3, 5, 7, 11, 13&#8230;</text>
    </svg>
  ),
  composite: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="68" fill="currentColor" textAnchor="middle" fontSize="48" fontFamily="serif" fontWeight="600">12</text>
      <text x="60" y="98" fill="currentColor" textAnchor="middle" fontSize="14" fontFamily="serif" opacity="0.6">3 &#215; 4</text>
    </svg>
  ),
  divisor: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="68" fill="currentColor" textAnchor="middle" fontSize="26" fontFamily="serif">12 &#247; 3 = 4</text>
      <text x="60" y="95" fill="currentColor" textAnchor="middle" fontSize="12" fontFamily="serif" opacity="0.6">(3 is the divisor)</text>
    </svg>
  ),
  factor: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="65" fill="currentColor" textAnchor="middle" fontSize="26" fontFamily="serif">3 &#215; 4 = 12</text>
      <text x="60" y="93" fill="currentColor" textAnchor="middle" fontSize="13" fontFamily="serif" opacity="0.6">3 and 4 are factors of 12</text>
    </svg>
  ),
  multiple: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="50" fill="currentColor" textAnchor="middle" fontSize="22" fontFamily="serif">3, 6, 9, 12, 15&#8230;</text>
      <text x="60" y="85" fill="currentColor" textAnchor="middle" fontSize="13" fontFamily="serif" opacity="0.6">(multiples of 3)</text>
    </svg>
  ),
  approximation: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="28" fontFamily="serif">&#960; &#8776; 3.14</text>
    </svg>
  ),
  round: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="68" fill="currentColor" textAnchor="middle" fontSize="26" fontFamily="serif">3.7 &#8776; 4</text>
      <text x="60" y="92" fill="currentColor" textAnchor="middle" fontSize="12" fontFamily="serif" opacity="0.6">(to nearest whole)</text>
    </svg>
  ),
  "significant figures": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="68" fill="currentColor" textAnchor="middle" fontSize="22" fontFamily="serif">0.0523 &#8594; 0.05</text>
      <text x="60" y="92" fill="currentColor" textAnchor="middle" fontSize="12" fontFamily="serif" opacity="0.6">(2 sig figs)</text>
    </svg>
  ),
  "decimal place": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="68" fill="currentColor" textAnchor="middle" fontSize="28" fontFamily="serif">3.142</text>
      <text x="60" y="92" fill="currentColor" textAnchor="middle" fontSize="12" fontFamily="serif" opacity="0.6">&#8594; 3rd decimal</text>
    </svg>
  ),
  exponent: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="80" fill="currentColor" textAnchor="middle" fontSize="48" fontFamily="serif">2<tspan fontSize="28" baselineShift="super">3</tspan></text>
    </svg>
  ),
  power: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="80" fill="currentColor" textAnchor="middle" fontSize="48" fontFamily="serif">5<tspan fontSize="28" baselineShift="super">2</tspan></text>
    </svg>
  ),
  base: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="80" fill="currentColor" textAnchor="middle" fontSize="48" fontFamily="serif"><tspan fontSize="28" baselineShift="super">2</tspan>&#8308;</text>
    </svg>
  ),
  "square root": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="36" fontFamily="serif">&#8730;9 = 3</text>
    </svg>
  ),
  "standard form": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="22" fontFamily="serif">5.2 &#215; 10&#8308;</text>
    </svg>
  ),
  "scientific notation": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="22" fontFamily="serif">6.02 &#215; 10&#178;&#179;</text>
    </svg>
  ),
  "natural number": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="26" fontFamily="serif">1, 2, 3, 4&#8230;</text>
    </svg>
  ),
  "whole number": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="26" fontFamily="serif">0, 1, 2, 3&#8230;</text>
    </svg>
  ),
  "rational number": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="40" y1="60" x2="80" y2="60" />
      <text x="60" y="52" fill="currentColor" stroke="none" textAnchor="middle" fontSize="26" fontFamily="serif">p</text>
      <text x="60" y="92" fill="currentColor" stroke="none" textAnchor="middle" fontSize="26" fontFamily="serif">q</text>
    </svg>
  ),
  "irrational number": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="78" fill="currentColor" textAnchor="middle" fontSize="44" fontFamily="serif">&#8730;2</text>
    </svg>
  ),
  "real number": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="15" y1="60" x2="105" y2="60" />
      <line x1="25" y1="55" x2="25" y2="65" />
      <line x1="60" y1="55" x2="60" y2="65" />
      <line x1="95" y1="55" x2="95" y2="65" />
    </svg>
  ),
  consecutive: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="26" fontFamily="serif">7, 8, 9, 10</text>
    </svg>
  ),
  positive: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="80" fill="currentColor" textAnchor="middle" fontSize="48" fontFamily="serif" fontWeight="600">+5</text>
    </svg>
  ),
  negative: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="80" fill="currentColor" textAnchor="middle" fontSize="48" fontFamily="serif" fontWeight="600">&#8722;5</text>
    </svg>
  ),
  "absolute value": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="38" fontFamily="serif">|&#8722;5| = 5</text>
    </svg>
  ),

  // STATISTICS (17)
  mean: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="50" fill="currentColor" textAnchor="middle" fontSize="22" fontFamily="serif">x&#772;</text>
      <line x1="35" y1="60" x2="85" y2="60" stroke="currentColor" strokeWidth="2" />
      <text x="60" y="88" fill="currentColor" textAnchor="middle" fontSize="14" fontFamily="serif">sum &#247; count</text>
    </svg>
  ),
  median: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <circle cx="20" cy="80" r="5" fill="currentColor" />
      <circle cx="40" cy="80" r="5" fill="currentColor" />
      <circle cx="60" cy="80" r="9" fill="currentColor" />
      <circle cx="80" cy="80" r="5" fill="currentColor" />
      <circle cx="100" cy="80" r="5" fill="currentColor" />
      <text x="60" y="48" fill="currentColor" textAnchor="middle" fontSize="14" fontFamily="serif" opacity="0.6">middle</text>
    </svg>
  ),
  mode: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <circle cx="22" cy="80" r="5" fill="currentColor" />
      <circle cx="42" cy="80" r="5" fill="currentColor" />
      <circle cx="62" cy="80" r="9" fill="currentColor" />
      <circle cx="82" cy="80" r="5" fill="currentColor" />
      <circle cx="100" cy="55" r="9" fill="currentColor" />
      <circle cx="100" cy="105" r="9" fill="currentColor" />
      <text x="60" y="48" fill="currentColor" textAnchor="middle" fontSize="13" fontFamily="serif" opacity="0.6">most common</text>
    </svg>
  ),
  range: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="60" x2="98" y2="60" />
      <polygon points="22,55 16,60 22,65" fill="currentColor" />
      <polygon points="98,55 104,60 98,65" fill="currentColor" />
      <text x="22" y="85" fill="currentColor" stroke="none" textAnchor="middle" fontSize="13" fontFamily="serif">min</text>
      <text x="98" y="85" fill="currentColor" stroke="none" textAnchor="middle" fontSize="13" fontFamily="serif">max</text>
    </svg>
  ),
  average: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="15" y1="20" x2="15" y2="100" strokeWidth="1" />
      <line x1="15" y1="100" x2="105" y2="100" strokeWidth="1" />
      <path d="M18 88 Q35 50 60 55 Q85 60 102 28" />
      <circle cx="60" cy="55" r="4" fill="currentColor" />
    </svg>
  ),
  frequency: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="25" y="70" width="14" height="25" fill="currentColor" stroke="none" />
      <rect x="45" y="50" width="14" height="45" fill="currentColor" stroke="none" />
      <rect x="65" y="35" width="14" height="60" fill="currentColor" stroke="none" />
      <rect x="85" y="60" width="14" height="35" fill="currentColor" stroke="none" />
      <line x1="20" y1="95" x2="105" y2="95" />
    </svg>
  ),
  outlier: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <circle cx="22" cy="85" r="4" fill="currentColor" />
      <circle cx="40" cy="80" r="4" fill="currentColor" />
      <circle cx="58" cy="82" r="4" fill="currentColor" />
      <circle cx="76" cy="78" r="4" fill="currentColor" />
      <circle cx="96" cy="28" r="6" fill="currentColor" />
      <text x="96" y="18" fill="currentColor" textAnchor="middle" fontSize="11" fontFamily="serif" opacity="0.6">outlier</text>
    </svg>
  ),
  sample: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="60" cy="60" r="45" />
      <circle cx="38" cy="48" r="5" fill="currentColor" stroke="none" />
      <circle cx="68" cy="42" r="5" fill="currentColor" stroke="none" />
      <circle cx="58" cy="72" r="5" fill="currentColor" stroke="none" />
      <circle cx="85" cy="68" r="5" fill="currentColor" stroke="none" />
    </svg>
  ),
  population: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="60" cy="60" r="45" />
      <circle cx="35" cy="42" r="3" fill="currentColor" stroke="none" />
      <circle cx="55" cy="38" r="3" fill="currentColor" stroke="none" />
      <circle cx="75" cy="42" r="3" fill="currentColor" stroke="none" />
      <circle cx="88" cy="58" r="3" fill="currentColor" stroke="none" />
      <circle cx="82" cy="78" r="3" fill="currentColor" stroke="none" />
      <circle cx="62" cy="82" r="3" fill="currentColor" stroke="none" />
      <circle cx="42" cy="76" r="3" fill="currentColor" stroke="none" />
      <circle cx="30" cy="62" r="3" fill="currentColor" stroke="none" />
      <circle cx="60" cy="60" r="3" fill="currentColor" stroke="none" />
    </svg>
  ),
  correlation: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="15" y1="20" x2="15" y2="100" />
      <line x1="15" y1="100" x2="105" y2="100" />
      <circle cx="25" cy="85" r="3" fill="currentColor" stroke="none" />
      <circle cx="40" cy="75" r="3" fill="currentColor" stroke="none" />
      <circle cx="55" cy="65" r="3" fill="currentColor" stroke="none" />
      <circle cx="70" cy="50" r="3" fill="currentColor" stroke="none" />
      <circle cx="85" cy="40" r="3" fill="currentColor" stroke="none" />
    </svg>
  ),
  "line of best fit": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="15" y1="20" x2="15" y2="100" />
      <line x1="15" y1="100" x2="105" y2="100" />
      <circle cx="25" cy="80" r="3" fill="currentColor" stroke="none" />
      <circle cx="40" cy="85" r="3" fill="currentColor" stroke="none" />
      <circle cx="55" cy="65" r="3" fill="currentColor" stroke="none" />
      <circle cx="70" cy="55" r="3" fill="currentColor" stroke="none" />
      <circle cx="85" cy="40" r="3" fill="currentColor" stroke="none" />
      <line x1="22" y1="92" x2="92" y2="32" strokeWidth="2" />
    </svg>
  ),
  histogram: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="22" y="70" width="15" height="25" fill="currentColor" stroke="none" />
      <rect x="37" y="55" width="15" height="40" fill="currentColor" stroke="none" />
      <rect x="52" y="40" width="15" height="55" fill="currentColor" stroke="none" />
      <rect x="67" y="55" width="15" height="40" fill="currentColor" stroke="none" />
      <rect x="82" y="70" width="15" height="25" fill="currentColor" stroke="none" />
      <line x1="15" y1="95" x2="105" y2="95" />
    </svg>
  ),
  "scatter graph": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="15" y1="20" x2="15" y2="100" />
      <line x1="15" y1="100" x2="105" y2="100" />
      <circle cx="25" cy="82" r="3" fill="currentColor" stroke="none" />
      <circle cx="38" cy="72" r="3" fill="currentColor" stroke="none" />
      <circle cx="50" cy="78" r="3" fill="currentColor" stroke="none" />
      <circle cx="62" cy="55" r="3" fill="currentColor" stroke="none" />
      <circle cx="75" cy="60" r="3" fill="currentColor" stroke="none" />
      <circle cx="85" cy="42" r="3" fill="currentColor" stroke="none" />
      <circle cx="92" cy="50" r="3" fill="currentColor" stroke="none" />
    </svg>
  ),
  "bar chart": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="25" y="60" width="18" height="35" fill="currentColor" stroke="none" />
      <rect x="53" y="35" width="18" height="60" fill="currentColor" stroke="none" />
      <rect x="81" y="50" width="18" height="45" fill="currentColor" stroke="none" />
      <line x1="18" y1="95" x2="105" y2="95" />
    </svg>
  ),
  "pie chart": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="60" cy="60" r="40" />
      <path d="M60 60 L60 20 A40 40 0 0 1 99 70 Z" fill="currentColor" fillOpacity="0.3" />
      <path d="M60 60 L99 70 A40 40 0 0 1 35 92 Z" fill="currentColor" fillOpacity="0.6" />
    </svg>
  ),
  "line graph": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="15" y1="20" x2="15" y2="100" />
      <line x1="15" y1="100" x2="105" y2="100" />
      <polyline points="22,88 38,72 54,55 70,60 86,40 100,28" strokeWidth="2" />
      <circle cx="38" cy="72" r="3" fill="currentColor" stroke="none" />
      <circle cx="54" cy="55" r="3" fill="currentColor" stroke="none" />
      <circle cx="70" cy="60" r="3" fill="currentColor" stroke="none" />
    </svg>
  ),
  "stem and leaf": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="60" y1="20" x2="60" y2="100" />
      <text x="38" y="42" fill="currentColor" stroke="none" textAnchor="middle" fontSize="18" fontFamily="serif">2</text>
      <text x="38" y="62" fill="currentColor" stroke="none" textAnchor="middle" fontSize="18" fontFamily="serif">3</text>
      <text x="38" y="82" fill="currentColor" stroke="none" textAnchor="middle" fontSize="18" fontFamily="serif">4</text>
      <text x="82" y="42" fill="currentColor" stroke="none" textAnchor="middle" fontSize="18" fontFamily="serif">3 5 8</text>
      <text x="82" y="62" fill="currentColor" stroke="none" textAnchor="middle" fontSize="18" fontFamily="serif">1 4</text>
      <text x="82" y="82" fill="currentColor" stroke="none" textAnchor="middle" fontSize="18" fontFamily="serif">2 7</text>
    </svg>
  ),

  // PROBABILITY (10)
  outcome: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="35" y="35" width="50" height="50" rx="8" />
      <circle cx="60" cy="60" r="3" fill="currentColor" stroke="none" />
      <circle cx="45" cy="45" r="2" fill="currentColor" stroke="none" />
      <circle cx="75" cy="45" r="2" fill="currentColor" stroke="none" />
      <circle cx="45" cy="75" r="2" fill="currentColor" stroke="none" />
      <circle cx="75" cy="75" r="2" fill="currentColor" stroke="none" />
    </svg>
  ),
  event: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="20" fontFamily="serif">an outcome group</text>
    </svg>
  ),
  biased: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="30,95 90,95 70,30 50,30" />
      <polygon points="30,95 90,95 87,100 33,100" fill="currentColor" stroke="none" />
      <circle cx="55" cy="93" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="60" cy="93" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="65" cy="93" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="78" cy="93" r="5" fill="currentColor" stroke="none" />
    </svg>
  ),
  fair: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="30,90 90,90 80,50 40,50" />
      <line x1="60" y1="50" x2="60" y2="20" strokeDasharray="3 3" />
      <circle cx="50" cy="60" r="3" fill="currentColor" stroke="none" />
      <circle cx="70" cy="60" r="3" fill="currentColor" stroke="none" />
    </svg>
  ),
  "tree diagram": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="60" cy="18" r="4" fill="currentColor" stroke="none" />
      <line x1="60" y1="22" x2="32" y2="55" />
      <line x1="60" y1="22" x2="88" y2="55" />
      <line x1="32" y1="55" x2="18" y2="95" />
      <line x1="32" y1="55" x2="48" y2="95" />
      <line x1="88" y1="55" x2="72" y2="95" />
      <line x1="88" y1="55" x2="102" y2="95" />
      <circle cx="32" cy="55" r="3" fill="currentColor" stroke="none" />
      <circle cx="88" cy="55" r="3" fill="currentColor" stroke="none" />
    </svg>
  ),
  "Venn diagram": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="45" cy="60" r="28" fill="currentColor" fillOpacity="0.15" />
      <circle cx="75" cy="60" r="28" fill="currentColor" fillOpacity="0.15" />
      <text x="32" y="35" fill="currentColor" stroke="none" fontSize="13" fontFamily="serif">A</text>
      <text x="90" y="35" fill="currentColor" stroke="none" fontSize="13" fontFamily="serif">B</text>
    </svg>
  ),
  "mutually exclusive": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="42" cy="60" r="22" />
      <circle cx="78" cy="60" r="22" />
      <line x1="58" y1="42" x2="58" y2="78" strokeDasharray="3 3" />
      <text x="30" y="32" fill="currentColor" stroke="none" fontSize="12" fontFamily="serif">A</text>
      <text x="86" y="32" fill="currentColor" stroke="none" fontSize="12" fontFamily="serif">B</text>
    </svg>
  ),
  independent: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="42" cy="55" r="22" />
      <circle cx="78" cy="55" r="22" />
      <path d="M42 55 Q60 85 78 55" strokeDasharray="3 3" />
      <text x="30" y="28" fill="currentColor" stroke="none" fontSize="12" fontFamily="serif">A</text>
      <text x="86" y="28" fill="currentColor" stroke="none" fontSize="12" fontFamily="serif">B</text>
    </svg>
  ),
  "relative frequency": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="35" y1="60" x2="85" y2="60" />
      <text x="60" y="50" fill="currentColor" stroke="none" textAnchor="middle" fontSize="22" fontFamily="serif">f</text>
      <text x="60" y="92" fill="currentColor" stroke="none" textAnchor="middle" fontSize="22" fontFamily="serif">n</text>
    </svg>
  ),
  trial: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <text x="60" y="72" fill="currentColor" stroke="none" textAnchor="middle" fontSize="38" fontFamily="serif">1&#215;</text>
      <text x="60" y="100" fill="currentColor" stroke="none" textAnchor="middle" fontSize="13" fontFamily="serif" opacity="0.6">one run</text>
    </svg>
  ),

  // TRIG (15)
  trigonometry: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="20,95 95,95 95,30" />
      <rect x="83" y="83" width="12" height="12" strokeWidth="1.5" />
      <path d="M50 95 A30 30 0 0 0 80 80" strokeWidth="1.5" />
    </svg>
  ),
  sine: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="20,95 95,95 95,30" />
      <line x1="20" y1="95" x2="95" y2="30" strokeWidth="2.5" />
      <text x="60" y="86" fill="currentColor" stroke="none" fontSize="16" fontFamily="serif" fontStyle="italic" textAnchor="middle">sin</text>
    </svg>
  ),
  cosine: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="20,95 95,95 95,30" />
      <line x1="20" y1="95" x2="95" y2="95" strokeWidth="2.5" />
      <text x="78" y="110" fill="currentColor" stroke="none" fontSize="14" fontFamily="serif" fontStyle="italic" textAnchor="middle">cos</text>
    </svg>
  ),
  "tangent ratio": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="20,95 95,95 95,30" />
      <line x1="95" y1="30" x2="95" y2="95" strokeWidth="2.5" />
      <line x1="20" y1="95" x2="95" y2="95" strokeWidth="2.5" />
      <text x="62" y="70" fill="currentColor" stroke="none" fontSize="16" fontFamily="serif" fontStyle="italic" textAnchor="middle">tan</text>
    </svg>
  ),
  opposite: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="20,95 95,95 95,30" />
      <line x1="95" y1="30" x2="95" y2="95" strokeWidth="2.5" />
      <text x="80" y="55" fill="currentColor" stroke="none" fontSize="14" fontFamily="serif" textAnchor="middle">opposite</text>
    </svg>
  ),
  adjacent: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="20,95 95,95 95,30" />
      <line x1="20" y1="95" x2="95" y2="95" strokeWidth="2.5" />
      <text x="78" y="110" fill="currentColor" stroke="none" fontSize="14" fontFamily="serif" textAnchor="middle">adjacent</text>
    </svg>
  ),
  hypotenuse: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="20,95 95,95 95,30" />
      <line x1="20" y1="95" x2="95" y2="30" strokeWidth="2.5" />
      <text x="50" y="62" fill="currentColor" stroke="none" fontSize="13" fontFamily="serif" textAnchor="middle" transform="rotate(-50 50 62)">hypotenuse</text>
    </svg>
  ),
  "angle of elevation": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="15" y1="95" x2="105" y2="95" strokeDasharray="4 3" />
      <line x1="30" y1="95" x2="95" y2="40" />
      <path d="M50 95 A30 30 0 0 0 64 81" strokeWidth="1.5" />
      <text x="62" y="92" fill="currentColor" stroke="none" fontSize="14" fontFamily="serif" textAnchor="middle">&#952;</text>
    </svg>
  ),
  "angle of depression": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="15" y1="30" x2="105" y2="30" strokeDasharray="4 3" />
      <line x1="30" y1="30" x2="95" y2="90" />
      <path d="M50 30 A30 30 0 0 1 64 44" strokeWidth="1.5" />
      <text x="62" y="36" fill="currentColor" stroke="none" fontSize="14" fontFamily="serif" textAnchor="middle">&#952;</text>
    </svg>
  ),
  "sine rule": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="68" fill="currentColor" textAnchor="middle" fontSize="20" fontFamily="serif">a/sinA = b/sinB</text>
    </svg>
  ),
  "cosine rule": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="68" fill="currentColor" textAnchor="middle" fontSize="18" fontFamily="serif">c&#178; = a&#178; + b&#178; &#8722; 2ab cosC</text>
    </svg>
  ),
  "inverse sine": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="58" fill="currentColor" textAnchor="middle" fontSize="22" fontFamily="serif">sin&#8315;&#185;(&#189;) = 30&#176;</text>
      <text x="60" y="92" fill="currentColor" textAnchor="middle" fontSize="13" fontFamily="serif" opacity="0.6">also called arcsin</text>
    </svg>
  ),
  "inverse cosine": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="58" fill="currentColor" textAnchor="middle" fontSize="22" fontFamily="serif">cos&#8315;&#185;(&#189;) = 60&#176;</text>
      <text x="60" y="92" fill="currentColor" textAnchor="middle" fontSize="13" fontFamily="serif" opacity="0.6">also called arccos</text>
    </svg>
  ),
  "inverse tangent": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="58" fill="currentColor" textAnchor="middle" fontSize="22" fontFamily="serif">tan&#8315;&#185;(1) = 45&#176;</text>
      <text x="60" y="92" fill="currentColor" textAnchor="middle" fontSize="13" fontFamily="serif" opacity="0.6">also called arctan</text>
    </svg>
  ),

  // CALCULUS (15)
  calculus: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="80" fill="currentColor" textAnchor="middle" fontSize="48" fontFamily="serif">&#8747;</text>
      <text x="60" y="30" fill="currentColor" textAnchor="middle" fontSize="13" fontFamily="serif" opacity="0.6">study of change</text>
    </svg>
  ),
  limit: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="32" fontFamily="serif">lim<tspan fontSize="22" baselineShift="sub">x&#8594;2</tspan></text>
    </svg>
  ),
  differentiation: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="58" fill="currentColor" textAnchor="middle" fontSize="28" fontFamily="serif">d/dx</text>
      <text x="60" y="86" fill="currentColor" textAnchor="middle" fontSize="13" fontFamily="serif" opacity="0.6">rate of change</text>
    </svg>
  ),
  derivative: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="28" fontFamily="serif">f &#8242;(x)</text>
    </svg>
  ),
  differentiate: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="35" y="68" fill="currentColor" textAnchor="middle" fontSize="20" fontFamily="serif">x&#178;</text>
      <polygon points="60,60 75,60 67,72" fill="currentColor" />
      <text x="92" y="68" fill="currentColor" textAnchor="middle" fontSize="22" fontFamily="serif">2x</text>
    </svg>
  ),
  "gradient function": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 95 C30 25 90 25 105 95" />
      <line x1="42" y1="38" x2="78" y2="38" strokeWidth="1" />
      <circle cx="60" cy="48" r="3" fill="currentColor" />
    </svg>
  ),
  maximum: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 95 Q60 10 105 95" />
      <circle cx="60" cy="28" r="4" fill="currentColor" />
      <text x="60" y="22" fill="currentColor" stroke="none" fontSize="13" fontFamily="serif" textAnchor="middle">max</text>
    </svg>
  ),
  minimum: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 30 Q60 110 105 30" />
      <circle cx="60" cy="95" r="4" fill="currentColor" />
      <text x="60" y="108" fill="currentColor" stroke="none" fontSize="13" fontFamily="serif" textAnchor="middle">min</text>
    </svg>
  ),
  "point of inflection": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 95 C30 30 50 30 60 60 C70 90 90 90 105 25" />
      <circle cx="60" cy="60" r="3" fill="currentColor" />
    </svg>
  ),
  integration: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="80" fill="currentColor" textAnchor="middle" fontSize="48" fontFamily="serif">&#8747; dx</text>
    </svg>
  ),
  integral: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="28" fontFamily="serif">&#8747; 2x dx</text>
    </svg>
  ),
  integrate: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="35" y="68" fill="currentColor" textAnchor="middle" fontSize="22" fontFamily="serif">2x</text>
      <polygon points="60,60 75,60 67,72" fill="currentColor" />
      <text x="92" y="68" fill="currentColor" textAnchor="middle" fontSize="22" fontFamily="serif">x&#178; + C</text>
    </svg>
  ),
  "definite integral": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="75" fill="currentColor" textAnchor="middle" fontSize="32" fontFamily="serif">&#8747;<tspan fontSize="16" baselineShift="super">3</tspan><tspan fontSize="16" baselineShift="sub">1</tspan> x dx</text>
    </svg>
  ),
  antiderivative: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="68" fill="currentColor" textAnchor="middle" fontSize="22" fontFamily="serif">F&#8242;(x) = f(x)</text>
      <text x="60" y="93" fill="currentColor" textAnchor="middle" fontSize="12" fontFamily="serif" opacity="0.6">F is the antiderivative of f</text>
    </svg>
  ),

  // VECTORS & MATRICES (14)
  scalar: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="76" fill="currentColor" textAnchor="middle" fontSize="44" fontFamily="serif">5</text>
      <text x="60" y="100" fill="currentColor" textAnchor="middle" fontSize="11" fontFamily="serif" opacity="0.6">(just a number)</text>
    </svg>
  ),
  displacement: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="82" x2="98" y2="38" />
      <polygon points="93,32 102,40 96,44" fill="currentColor" stroke="none" />
      <circle cx="22" cy="82" r="3" fill="currentColor" stroke="none" />
      <circle cx="98" cy="38" r="3" fill="currentColor" stroke="none" />
    </svg>
  ),
  vector: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="92" x2="98" y2="32" />
      <polygon points="90,30 100,32 95,42" fill="currentColor" stroke="none" />
    </svg>
  ),
  magnitude: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="92" x2="98" y2="32" />
      <polygon points="90,30 100,32 95,42" fill="currentColor" stroke="none" />
      <text x="55" y="60" fill="currentColor" stroke="none" fontSize="18" fontFamily="serif" textAnchor="middle" transform="rotate(-44 55 60)">|v|</text>
    </svg>
  ),
  "dot product": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="38" fontFamily="serif">a &#183; b</text>
    </svg>
  ),
  "scalar product": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="68" fill="currentColor" textAnchor="middle" fontSize="22" fontFamily="serif">a &#183; b = |a||b|cos&#952;</text>
    </svg>
  ),
  row: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="18" y="48" width="84" height="24" />
      <line x1="32" y1="50" x2="32" y2="70" />
      <line x1="46" y1="50" x2="46" y2="70" />
      <line x1="60" y1="50" x2="60" y2="70" />
      <line x1="74" y1="50" x2="74" y2="70" />
      <line x1="88" y1="50" x2="88" y2="70" />
      <text x="25" y="65" fill="currentColor" stroke="none" fontSize="13" fontFamily="serif" textAnchor="middle">3</text>
      <text x="39" y="65" fill="currentColor" stroke="none" fontSize="13" fontFamily="serif" textAnchor="middle">1</text>
      <text x="53" y="65" fill="currentColor" stroke="none" fontSize="13" fontFamily="serif" textAnchor="middle">7</text>
      <text x="67" y="65" fill="currentColor" stroke="none" fontSize="13" fontFamily="serif" textAnchor="middle">5</text>
      <text x="81" y="65" fill="currentColor" stroke="none" fontSize="13" fontFamily="serif" textAnchor="middle">2</text>
      <text x="95" y="65" fill="currentColor" stroke="none" fontSize="13" fontFamily="serif" textAnchor="middle">9</text>
    </svg>
  ),
  column: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="45" y="18" width="30" height="84" />
      <line x1="47" y1="32" x2="73" y2="32" />
      <line x1="47" y1="46" x2="73" y2="46" />
      <line x1="47" y1="60" x2="73" y2="60" />
      <line x1="47" y1="74" x2="73" y2="74" />
      <line x1="47" y1="88" x2="73" y2="88" />
      <text x="60" y="29" fill="currentColor" stroke="none" fontSize="13" fontFamily="serif" textAnchor="middle">a</text>
      <text x="60" y="43" fill="currentColor" stroke="none" fontSize="13" fontFamily="serif" textAnchor="middle">b</text>
      <text x="60" y="57" fill="currentColor" stroke="none" fontSize="13" fontFamily="serif" textAnchor="middle">c</text>
      <text x="60" y="71" fill="currentColor" stroke="none" fontSize="13" fontFamily="serif" textAnchor="middle">d</text>
      <text x="60" y="85" fill="currentColor" stroke="none" fontSize="13" fontFamily="serif" textAnchor="middle">e</text>
      <text x="60" y="99" fill="currentColor" stroke="none" fontSize="13" fontFamily="serif" textAnchor="middle">f</text>
    </svg>
  ),
  order: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="42" fontFamily="serif">2 &#215; 3</text>
      <text x="60" y="98" fill="currentColor" textAnchor="middle" fontSize="13" fontFamily="serif" opacity="0.6">rows &#215; columns</text>
    </svg>
  ),
  "identity matrix": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="30" y="30" width="60" height="60" />
      <line x1="50" y1="30" x2="50" y2="90" />
      <line x1="70" y1="30" x2="70" y2="90" />
      <line x1="30" y1="50" x2="90" y2="50" />
      <line x1="30" y1="70" x2="90" y2="70" />
      <text x="40" y="48" fill="currentColor" stroke="none" fontSize="18" fontFamily="serif" textAnchor="middle">1</text>
      <text x="60" y="48" fill="currentColor" stroke="none" fontSize="14" fontFamily="serif" textAnchor="middle" opacity="0.3">0</text>
      <text x="80" y="48" fill="currentColor" stroke="none" fontSize="14" fontFamily="serif" textAnchor="middle" opacity="0.3">0</text>
      <text x="40" y="68" fill="currentColor" stroke="none" fontSize="14" fontFamily="serif" textAnchor="middle" opacity="0.3">0</text>
      <text x="60" y="68" fill="currentColor" stroke="none" fontSize="18" fontFamily="serif" textAnchor="middle">1</text>
      <text x="80" y="68" fill="currentColor" stroke="none" fontSize="14" fontFamily="serif" textAnchor="middle" opacity="0.3">0</text>
      <text x="40" y="88" fill="currentColor" stroke="none" fontSize="14" fontFamily="serif" textAnchor="middle" opacity="0.3">0</text>
      <text x="60" y="88" fill="currentColor" stroke="none" fontSize="14" fontFamily="serif" textAnchor="middle" opacity="0.3">0</text>
      <text x="80" y="88" fill="currentColor" stroke="none" fontSize="18" fontFamily="serif" textAnchor="middle">1</text>
    </svg>
  ),
  "inverse matrix": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="78" fill="currentColor" textAnchor="middle" fontSize="40" fontFamily="serif">A<tspan fontSize="28" baselineShift="super">&#8722;1</tspan></text>
    </svg>
  ),
  transpose: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="78" fill="currentColor" textAnchor="middle" fontSize="40" fontFamily="serif">A<tspan fontSize="28" baselineShift="super">T</tspan></text>
    </svg>
  ),
  determinant: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="78" fill="currentColor" textAnchor="middle" fontSize="48" fontFamily="serif">|A|</text>
    </svg>
  ),

  // SETS (8)
  set: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="34" fontFamily="serif">&#123;a, b, c&#125;</text>
    </svg>
  ),
  element: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="36" fontFamily="serif">a &#8712; A</text>
    </svg>
  ),
  subset: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="36" fontFamily="serif">B &#8838; A</text>
    </svg>
  ),
  "empty set": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="80" fill="currentColor" textAnchor="middle" fontSize="56" fontFamily="serif">&#8709;</text>
    </svg>
  ),
  "universal set": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="22" y="25" width="76" height="70" />
      <text x="32" y="48" fill="currentColor" stroke="none" fontSize="18" fontFamily="serif">U</text>
    </svg>
  ),
  union: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="38" fontFamily="serif">A &#8746; B</text>
    </svg>
  ),
  intersection: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="38" fontFamily="serif">A &#8745; B</text>
    </svg>
  ),
  complement: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="38" fontFamily="serif">A<tspan fontSize="22" baselineShift="super">c</tspan></text>
    </svg>
  ),

  // LOGS / EXPONENTIALS (5)
  logarithm: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="68" fill="currentColor" textAnchor="middle" fontSize="22" fontFamily="serif">log<tspan fontSize="16" baselineShift="sub">2</tspan>(8) = 3</text>
      <text x="60" y="93" fill="currentColor" textAnchor="middle" fontSize="12" fontFamily="serif" opacity="0.6">because 2&#179; = 8</text>
    </svg>
  ),
  log: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="32" fontFamily="serif">log(x)</text>
    </svg>
  ),
  exponential: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="15" y1="20" x2="15" y2="100" strokeWidth="1" />
      <line x1="15" y1="100" x2="105" y2="100" strokeWidth="1" />
      <path d="M18 95 Q40 95 55 80 Q80 50 100 18" strokeWidth="2" />
      <text x="90" y="16" fill="currentColor" stroke="none" fontSize="13" fontFamily="serif">y = e&#8301;</text>
    </svg>
  ),
  "exponential growth": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="15" y1="100" x2="15" y2="20" strokeWidth="1" />
      <line x1="15" y1="100" x2="105" y2="100" strokeWidth="1" />
      <path d="M20 98 C30 96 50 92 70 70 C90 38 100 22 102 20" strokeWidth="2" />
    </svg>
  ),
  "exponential decay": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="15" y1="20" x2="15" y2="100" strokeWidth="1" />
      <line x1="15" y1="100" x2="105" y2="100" strokeWidth="1" />
      <path d="M20 22 C40 25 55 50 75 80 C90 95 100 98 102 99" strokeWidth="2" />
    </svg>
  ),

  // MONEY (9)
  profit: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="44" fontFamily="serif">+$50</text>
      <text x="60" y="100" fill="currentColor" textAnchor="middle" fontSize="12" fontFamily="serif" opacity="0.6">revenue &gt; cost</text>
    </svg>
  ),
  loss: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="44" fontFamily="serif">&#8722;$30</text>
      <text x="60" y="100" fill="currentColor" textAnchor="middle" fontSize="12" fontFamily="serif" opacity="0.6">cost &gt; revenue</text>
    </svg>
  ),
  revenue: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="28" fontFamily="serif">total $ in</text>
      <text x="60" y="98" fill="currentColor" textAnchor="middle" fontSize="12" fontFamily="serif" opacity="0.6">before any costs</text>
    </svg>
  ),
  discount: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="68" fill="currentColor" textAnchor="middle" fontSize="32" fontFamily="serif">$100 &#8594; $80</text>
      <text x="60" y="93" fill="currentColor" textAnchor="middle" fontSize="14" fontFamily="serif" opacity="0.6">20% off</text>
    </svg>
  ),
  interest: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="68" fill="currentColor" textAnchor="middle" fontSize="22" fontFamily="serif">money paid for borrowing</text>
      <text x="60" y="93" fill="currentColor" textAnchor="middle" fontSize="14" fontFamily="serif" opacity="0.6">or earned on saving</text>
    </svg>
  ),
  "simple interest": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="68" fill="currentColor" textAnchor="middle" fontSize="22" fontFamily="serif">I = P &#215; r &#215; t</text>
    </svg>
  ),
  "compound interest": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="68" fill="currentColor" textAnchor="middle" fontSize="20" fontFamily="serif">A = P(1 + r)&#8319;</text>
      <text x="60" y="93" fill="currentColor" textAnchor="middle" fontSize="12" fontFamily="serif" opacity="0.6">interest earns interest</text>
    </svg>
  ),
  principal: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="32" fontFamily="serif">P = $1000</text>
      <text x="60" y="98" fill="currentColor" textAnchor="middle" fontSize="12" fontFamily="serif" opacity="0.6">the starting amount</text>
    </svg>
  ),
  depreciation: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="20" x2="18" y2="100" strokeWidth="1" />
      <line x1="18" y1="100" x2="100" y2="100" strokeWidth="1" />
      <path d="M20 30 C40 38 60 55 80 70 L95 90" strokeWidth="2" />
      <text x="80" y="85" fill="currentColor" stroke="none" fontSize="14" fontFamily="serif">value</text>
    </svg>
  ),

  // MEASUREMENT (5)
  speed: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="68" fill="currentColor" textAnchor="middle" fontSize="26" fontFamily="serif">60 km/h</text>
      <text x="60" y="94" fill="currentColor" textAnchor="middle" fontSize="13" fontFamily="serif" opacity="0.6">distance &#247; time</text>
    </svg>
  ),
  distance: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="60" x2="98" y2="60" />
      <polygon points="22,55 16,60 22,65" fill="currentColor" />
      <polygon points="98,55 104,60 98,65" fill="currentColor" />
      <text x="60" y="50" fill="currentColor" stroke="none" fontSize="13" fontFamily="serif" textAnchor="middle">d</text>
    </svg>
  ),
  time: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="60" cy="60" r="30" />
      <line x1="60" y1="60" x2="60" y2="42" strokeWidth="1.5" />
      <line x1="60" y1="60" x2="75" y2="60" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="2" fill="currentColor" />
    </svg>
  ),
  rate: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="68" fill="currentColor" textAnchor="middle" fontSize="26" fontFamily="serif">5 per 1</text>
      <text x="60" y="94" fill="currentColor" textAnchor="middle" fontSize="12" fontFamily="serif" opacity="0.6">a comparison</text>
    </svg>
  ),
  unit: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="68" fill="currentColor" textAnchor="middle" fontSize="22" fontFamily="serif">m, kg, s, &#176;C&#8230;</text>
      <text x="60" y="94" fill="currentColor" textAnchor="middle" fontSize="12" fontFamily="serif" opacity="0.6">standard of measurement</text>
    </svg>
  ),

  // ADDITIONAL CURATED TERMS (15)
  area: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="20" y="30" width="80" height="60" />
      <line x1="40" y1="30" x2="40" y2="90" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="60" y1="30" x2="60" y2="90" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="80" y1="30" x2="80" y2="90" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="20" y1="50" x2="100" y2="50" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="20" y1="70" x2="100" y2="70" strokeWidth="1" strokeDasharray="2 2" />
      <text x="60" y="66" fill="currentColor" stroke="none" fontSize="16" fontFamily="serif" textAnchor="middle" fontWeight="bold">Area</text>
    </svg>
  ),
  coefficient: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="78" fill="currentColor" textAnchor="middle" fontSize="44" fontFamily="serif" fontWeight="700">3x</text>
      <text x="60" y="100" fill="currentColor" textAnchor="middle" fontSize="11" fontFamily="serif" opacity="0.6">the 3 multiplies x</text>
    </svg>
  ),
  congruent: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="15,75 45,75 30,40" />
      <polygon points="68,75 98,75 83,40" />
      <line x1="48" y1="60" x2="68" y2="60" />
      <line x1="60" y1="60" x2="80" y2="60" />
    </svg>
  ),
  gradient: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="15" y1="20" x2="15" y2="100" strokeWidth="1" />
      <line x1="15" y1="100" x2="105" y2="100" strokeWidth="1" />
      <line x1="22" y1="88" x2="100" y2="32" strokeWidth="2.5" />
      <text x="65" y="50" fill="currentColor" stroke="none" fontSize="15" fontFamily="serif" textAnchor="middle" transform="rotate(-43 65 50)">m</text>
    </svg>
  ),
  matrix: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="30" y="25" width="60" height="70" />
      <line x1="50" y1="25" x2="50" y2="95" />
      <line x1="70" y1="25" x2="70" y2="95" />
      <line x1="30" y1="48" x2="90" y2="48" />
      <line x1="30" y1="72" x2="90" y2="72" />
    </svg>
  ),
  perimeter: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="22" y="28" width="76" height="64" />
      <polygon points="22,38 32,38 27,28" fill="currentColor" />
      <polygon points="88,28 98,38 93,28" fill="currentColor" />
      <polygon points="98,82 88,82 93,92" fill="currentColor" />
      <polygon points="32,92 22,82 27,92" fill="currentColor" />
    </svg>
  ),
  polynomial: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="22" fontFamily="serif">2x&#178; + 3x &#8722; 1</text>
    </svg>
  ),
  probability: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="35" y1="60" x2="85" y2="60" />
      <text x="60" y="50" fill="currentColor" stroke="none" textAnchor="middle" fontSize="18" fontFamily="serif">favourable</text>
      <text x="60" y="92" fill="currentColor" stroke="none" textAnchor="middle" fontSize="18" fontFamily="serif">outcomes</text>
    </svg>
  ),
  sequence: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="22" fontFamily="serif">2, 4, 8, 16, 32&#8230;</text>
      <text x="60" y="98" fill="currentColor" textAnchor="middle" fontSize="11" fontFamily="serif" opacity="0.6">in order</text>
    </svg>
  ),
  similar: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="15,75 40,75 27,42" />
      <polygon points="65,90 105,90 85,42" />
    </svg>
  ),
  surd: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="78" fill="currentColor" textAnchor="middle" fontSize="44" fontFamily="serif">&#8730;3</text>
    </svg>
  ),
  "surface area": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="22,40 60,22 88,40 50,58" />
      <polygon points="22,40 22,82 50,100 50,58" />
      <polygon points="50,58 88,40 88,82 50,100" />
      <text x="55" y="60" fill="currentColor" stroke="none" fontSize="14" fontFamily="serif" textAnchor="middle">SA</text>
    </svg>
  ),
  variable: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="80" fill="currentColor" textAnchor="middle" fontSize="56" fontFamily="serif" fontStyle="italic">x</text>
    </svg>
  ),
  vertex: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="60,18 100,98 20,98" />
      <circle cx="60" cy="18" r="4" fill="currentColor" />
    </svg>
  ),
  volume: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="22,40 60,22 88,40 50,58" />
      <polygon points="22,40 22,82 50,100 50,58" />
      <polygon points="50,58 88,40 88,82 50,100" />
      <text x="30" y="96" fill="currentColor" stroke="none" fontSize="12" fontFamily="serif" textAnchor="middle">l</text>
      <text x="74" y="96" fill="currentColor" stroke="none" fontSize="12" fontFamily="serif" textAnchor="middle">w</text>
      <text x="42" y="82" fill="currentColor" stroke="none" fontSize="12" fontFamily="serif" textAnchor="middle">h</text>
    </svg>
  ),

  // PHASE 2 NEW CURATED TERMS (16)
  ellipse: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="60" cy="60" rx="42" ry="26" />
    </svg>
  ),
  parabola: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 95 Q60 10 105 95" />
      <line x1="15" y1="95" x2="105" y2="95" strokeWidth="1" />
    </svg>
  ),
  hyperbola: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 60 Q35 25 55 25" />
      <path d="M105 60 Q85 95 65 95" />
      <line x1="15" y1="60" x2="105" y2="60" strokeWidth="1" strokeDasharray="3 3" />
    </svg>
  ),
  focus: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="60" cy="60" rx="42" ry="26" />
      <circle cx="60" cy="60" r="3" fill="currentColor" stroke="none" />
      <circle cx="40" cy="60" r="3" fill="currentColor" stroke="none" />
    </svg>
  ),
  directrix: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="15" y1="95" x2="105" y2="95" strokeDasharray="5 3" />
      <path d="M60 95 Q60 30 60 25" />
      <circle cx="60" cy="35" r="3" fill="currentColor" stroke="none" />
    </svg>
  ),
  "complex number": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="32" fontFamily="serif">a + bi</text>
    </svg>
  ),
  binomial: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="32" fontFamily="serif">(a + b)</text>
    </svg>
  ),
  share: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="60" cy="60" r="40" />
      <path d="M60 60 L60 20 A40 40 0 0 1 99 70 Z" fill="currentColor" fillOpacity="0.3" />
    </svg>
  ),
  dividend: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="68" fill="currentColor" textAnchor="middle" fontSize="28" fontFamily="serif">$ paid</text>
      <polygon points="55,76 75,76 65,86" fill="currentColor" />
    </svg>
  ),
  variation: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="15" y1="20" x2="15" y2="100" strokeWidth="1" />
      <line x1="15" y1="100" x2="105" y2="100" strokeWidth="1" />
      <path d="M20 92 Q60 50 100 18" strokeWidth="2" />
    </svg>
  ),
  domain: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="15" y1="60" x2="105" y2="60" />
      <line x1="35" y1="55" x2="35" y2="65" />
      <line x1="85" y1="55" x2="85" y2="65" />
      <line x1="35" y1="48" x2="85" y2="48" stroke="currentColor" strokeWidth="3" opacity="0.4" />
      <text x="35" y="85" fill="currentColor" stroke="none" textAnchor="middle" fontSize="14" fontFamily="serif">-3</text>
      <text x="85" y="85" fill="currentColor" stroke="none" textAnchor="middle" fontSize="14" fontFamily="serif">+5</text>
    </svg>
  ),
  input: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="45" y="40" width="50" height="40" />
      <line x1="15" y1="60" x2="45" y2="60" />
      <polygon points="38,55 45,60 38,65" fill="currentColor" stroke="none" />
      <text x="25" y="55" fill="currentColor" stroke="none" textAnchor="middle" fontSize="13" fontFamily="serif">x</text>
      <text x="70" y="65" fill="currentColor" stroke="none" textAnchor="middle" fontSize="13" fontFamily="serif">f(x)</text>
    </svg>
  ),
  output: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="25" y="40" width="50" height="40" />
      <line x1="75" y1="60" x2="105" y2="60" />
      <polygon points="98,55 105,60 98,65" fill="currentColor" stroke="none" />
      <text x="50" y="65" fill="currentColor" stroke="none" textAnchor="middle" fontSize="13" fontFamily="serif">f(x)</text>
      <text x="92" y="55" fill="currentColor" stroke="none" textAnchor="middle" fontSize="13" fontFamily="serif">y</text>
    </svg>
  ),
  // MISSING VISUALS (14) ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â appended to fill gaps in V
  quadrant: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="15" y1="60" x2="105" y2="60" />
      <line x1="60" y1="15" x2="60" y2="105" />
      <text x="30" y="32" fill="currentColor" stroke="none" fontSize="13" fontFamily="serif">II</text>
      <text x="86" y="32" fill="currentColor" stroke="none" fontSize="13" fontFamily="serif">I</text>
      <text x="30" y="94" fill="currentColor" stroke="none" fontSize="13" fontFamily="serif">III</text>
      <text x="86" y="94" fill="currentColor" stroke="none" fontSize="13" fontFamily="serif">IV</text>
    </svg>
  ),
  remainder: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="68" fill="currentColor" textAnchor="middle" fontSize="26" fontFamily="serif">17 &#247; 5</text>
      <text x="60" y="92" fill="currentColor" textAnchor="middle" fontSize="20" fontFamily="serif">= 3 r 2</text>
      <text x="92" y="98" fill="currentColor" textAnchor="middle" fontSize="14" fontFamily="serif" fillOpacity="0.6">2 is the remainder</text>
    </svg>
  ),
  tangent: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="60" cy="60" r="35" />
      <line x1="95" y1="20" x2="95" y2="100" />
      <circle cx="95" cy="60" r="2.5" fill="currentColor" />
      <text x="104" y="64" fill="currentColor" stroke="none" fontSize="14" fontFamily="serif">P</text>
    </svg>
  ),
  rhombus: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="60,20 95,60 60,100 25,60" />
    </svg>
  ),
  kite: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="60,20 95,45 60,100 25,45" />
      <line x1="25" y1="45" x2="95" y2="45" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="60" y1="20" x2="60" y2="100" strokeWidth="1" strokeDasharray="3 3" />
    </svg>
  ),
  bisector: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M20 100 L100 100" />
      <path d="M20 100 L80 30" />
      <path d="M20 100 L95 65" strokeDasharray="3 3" />
      <path d="M45 100 A25 25 0 0 0 43 85" strokeWidth="1" />
      <path d="M43 85 A25 25 0 0 0 38 71" strokeWidth="1" />
      <text x="50" y="93" fill="currentColor" stroke="none" fontSize="10">a</text>
      <text x="44" y="78" fill="currentColor" stroke="none" fontSize="10">a</text>
    </svg>
  ),
  edge: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="22,40 60,22 88,40 50,58" />
      <polygon points="22,40 22,82 50,100 50,58" />
      <polygon points="50,58 88,40 88,82 50,100" />
      <line x1="35" y1="35" x2="68" y2="30" strokeWidth="2.5" />
    </svg>
  ),
  face: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="22,40 60,22 88,40 50,58" />
      <polygon points="22,40 22,82 50,100 50,58" />
      <polygon points="50,58 88,40 88,82 50,100" />
      <text x="55" y="55" fill="currentColor" stroke="none" fontSize="11" fontFamily="serif">face</text>
    </svg>
  ),
  secant: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="60" cy="60" r="30" />
      <line x1="15" y1="60" x2="105" y2="30" strokeWidth="2.5" />
      <circle cx="30" cy="60" r="3" fill="currentColor" />
      <circle cx="80" cy="46" r="3" fill="currentColor" />
    </svg>
  ),
  "line of symmetry": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="60" y1="15" x2="60" y2="105" strokeDasharray="4 3" />
      <path d="M30 50 Q30 25 60 25 Q90 25 90 50 Q90 80 60 95 Q30 80 30 50 Z" />
      <text x="64" y="14" fill="currentColor" stroke="none" fontSize="11" fontFamily="serif">mirror line</text>
    </svg>
  ),
  "rotational symmetry": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="60" cy="60" r="2" fill="currentColor" />
      <polygon points="60,30 70,50 50,50" />
      <polygon points="60,30 70,50 50,50" transform="rotate(72 60 60)" />
      <polygon points="60,30 70,50 50,50" transform="rotate(144 60 60)" />
      <polygon points="60,30 70,50 50,50" transform="rotate(216 60 60)" />
      <polygon points="60,30 70,50 50,50" transform="rotate(288 60 60)" />
    </svg>
  ),
  identity: () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="75" fill="currentColor" textAnchor="middle" fontSize="56" fontFamily="serif">1</text>
      <text x="60" y="100" fill="currentColor" textAnchor="middle" fontSize="12" fontFamily="serif" opacity="0.6">multiplicative identity</text>
    </svg>
  ),
  "cube root": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="36" fontFamily="serif">&#8731;27 = 3</text>
    </svg>
  ),
  "indefinite integral": () => (
    <svg viewBox="0 0 120 120" className="glossary-visual" aria-hidden="true">
      <text x="60" y="68" fill="currentColor" textAnchor="middle" fontSize="28" fontFamily="serif">&#8747; x dx = x&#178;/2 + C</text>
      <text x="60" y="98" fill="currentColor" textAnchor="middle" fontSize="12" fontFamily="serif" opacity="0.6">family of antiderivatives</text>
    </svg>
  ),
};


export default function GlossaryVisual({ id }) {
  const Visual = id ? V[id] : null;
  if (!Visual) return null;
  return <Visual />;
}