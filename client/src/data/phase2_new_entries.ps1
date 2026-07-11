# Phase 2 - add new glossary entries (definition + aliases), enrichments (s/r/m),
# and inline SVG visuals for terms that are referenced by topics but
# don't yet exist in glossaryTerms.json.

$ErrorActionPreference = 'Stop'
$dir = $PSScriptRoot
$gtPath  = Join-Path $dir 'glossaryTerms.json'
$gePath  = Join-Path $dir 'glossaryEnrichments.json'
$gvPath  = Join-Path $dir 'glossaryVisuals.jsx'

# Load existing files (we'll merge with them).
$gt = Get-Content -LiteralPath $gtPath -Raw | ConvertFrom-Json
$ge = Get-Content -LiteralPath $gePath -Raw | ConvertFrom-Json

# Build new entries. Each entry has: term (key), definition, aliases,
# simpleMeaning, realLifeExample, memoryTip.
# visualId is intentionally NOT set here - the merge_enrichments.ps1
# script will compute it from the curated-set membership.
$newEntries = [ordered]@{
  'ellipse' = @{
    definition      = 'An oval shape traced by points whose sum of distances from two fixed points (foci) is constant.'
    aliases         = @('ellipses')
    simpleMeaning   = 'A stretched-out circle - an oval shape.'
    realLifeExample = 'A racetrack or a flattened circle is shaped like an ellipse.'
    memoryTip       = 'Ellipse = stretched circle.'
  }
  'parabola' = @{
    definition      = 'A U-shaped curve where every point is the same distance from a focus and a directrix.'
    aliases         = @('parabolas')
    simpleMeaning   = 'A U-shaped curve, like a smile or a bowl.'
    realLifeExample = 'The path a ball makes when you throw it is a parabola - up then down.'
    memoryTip       = 'Parabola = U-shaped curve.'
  }
  'hyperbola' = @{
    definition      = 'A curve with two separate branches where the difference of distances from two foci is constant.'
    aliases         = @('hyperbolas')
    simpleMeaning   = 'Two U-shapes facing away from each other.'
    realLifeExample = 'The shadow of a lampshade at an angle can make a hyperbolic curve.'
    memoryTip       = 'Hyperbola = two opposite Us.'
  }
  'focus' = @{
    definition      = 'A fixed point inside a conic section such as an ellipse or parabola.'
    aliases         = @('foci')
    simpleMeaning   = 'A special point inside a curve like an ellipse.'
    realLifeExample = 'In a satellite dish, the focus is where the signals collect to one spot.'
    memoryTip       = 'Focus = special point inside a curve.'
  }
  'directrix' = @{
    definition      = 'A fixed straight line used to define a conic section such as a parabola.'
    aliases         = @('directrices')
    simpleMeaning   = 'A straight line that helps define a curve like a parabola.'
    realLifeExample = 'The directrix is like a guide line that the curve never crosses.'
    memoryTip       = 'Directrix = guide line for a curve.'
  }
  'complex number' = @{
    definition      = 'A number written as a + bi, where a and b are real numbers and i is the imaginary unit.'
    aliases         = @('complex numbers')
    simpleMeaning   = 'A number with a real part and an imaginary part.'
    realLifeExample = 'Engineers use complex numbers to design electrical circuits.'
    memoryTip       = 'Complex = real + imaginary.'
  }
  'binomial' = @{
    definition      = 'An algebraic expression with exactly two terms, like x + 5 or (a + b).'
    aliases         = @('binomials')
    simpleMeaning   = 'A math expression with exactly two parts.'
    realLifeExample = 'x + 5 is a binomial because it has exactly two parts.'
    memoryTip       = 'Binomial = bi (two) + nomial (terms).'
  }
  'share' = @{
    definition      = 'One of the equal parts into which a company is divided, giving the holder part ownership.'
    aliases         = @('shares')
    simpleMeaning   = 'A small piece of a company that you can buy.'
    realLifeExample = 'If a company has 100 shares, each share means 1% ownership.'
    memoryTip       = 'Share = a piece of a company.'
  }
  'dividend' = @{
    definition      = 'A share of profits paid by a company to its shareholders.'
    aliases         = @('dividends')
    simpleMeaning   = 'Money a company pays you for owning its shares.'
    realLifeExample = 'Apple pays shareholders a dividend every three months.'
    memoryTip       = 'Dividend = money from shares.'
  }
  'angle of depression' = @{
    definition      = 'The angle measured down from the horizontal to look at something below.'
    aliases         = @('angles of depression')
    simpleMeaning   = 'The angle you look down from a higher spot.'
    realLifeExample = 'Looking down from a balcony at someone below uses an angle of depression.'
    memoryTip       = 'Depression = looking down.'
  }
  'sine rule' = @{
    definition      = 'A rule for any triangle: a divided by sin A equals b divided by sin B equals c divided by sin C.'
    aliases         = @('sine rules')
    simpleMeaning   = 'A rule connecting sides and angles in any triangle.'
    realLifeExample = 'Use the sine rule to find a missing side of any triangle.'
    memoryTip       = 'Sine rule = sides match sines.'
  }
  'cosine rule' = @{
    definition      = 'A rule for any triangle: c squared = a squared + b squared - 2ab cos C.'
    aliases         = @('cosine rules')
    simpleMeaning   = 'A rule connecting sides and angles in any triangle.'
    realLifeExample = 'Use the cosine rule when the sine rule cannot solve a triangle.'
    memoryTip       = 'Cosine rule = c squared = a squared + b squared - 2ab cos C.'
  }
  'variation' = @{
    definition      = 'A relationship between two variables where one changes in a predictable way as the other changes.'
    aliases         = @('variations')
    simpleMeaning   = 'When one number changes, another changes too in a pattern.'
    realLifeExample = 'The more hours you work, the more money you earn - that is variation.'
    memoryTip       = 'Variation = one thing changing affects another.'
  }
  'domain' = @{
    definition      = 'The set of all allowed input values for a function.'
    aliases         = @('domains')
    simpleMeaning   = 'All the numbers you are allowed to put into a function.'
    realLifeExample = 'In y = 1/x, the domain is all numbers except 0 - you cannot divide by zero.'
    memoryTip       = 'Domain = inputs allowed.'
  }
  'input' = @{
    definition      = 'A value that goes into a function or formula.'
    aliases         = @('inputs')
    simpleMeaning   = 'A number you put into a function.'
    realLifeExample = 'In f(x) = 2x, the input is x and the output is the answer.'
    memoryTip       = 'Input = what goes in.'
  }
  'output' = @{
    definition      = 'A value that comes out of a function or formula.'
    aliases         = @('outputs')
    simpleMeaning   = 'The number that comes out of a function.'
    realLifeExample = 'In f(x) = 2x, when you put in x = 3, the output is 6.'
    memoryTip       = 'Output = what comes out.'
  }
}

# --- 1. Append new entries to glossaryTerms.json ---
$merged = @()
foreach ($e in $gt) { $merged += $e }
foreach ($k in $newEntries.Keys) {
  $v = $newEntries[$k]
  $obj = [ordered]@{
    term            = $k
    definition      = $v.definition
    aliases         = $v.aliases
    simpleMeaning   = $v.simpleMeaning
    visualId        = $null
    realLifeExample = $v.realLifeExample
    memoryTip       = $v.memoryTip
  }
  $merged += [pscustomobject]$obj
}
[System.IO.File]::WriteAllText($gtPath, ($merged | ConvertTo-Json -Depth 5), [System.Text.UTF8Encoding]::new($false))
Write-Host ('Added ' + $newEntries.Count + ' new entries to glossaryTerms.json')

# --- 2. Add corresponding entries to glossaryEnrichments.json ---
$enrMap = @{}
foreach ($p in $ge.PSObject.Properties) { $enrMap[$p.Name] = $p.Value }
foreach ($k in $newEntries.Keys) {
  $v = $newEntries[$k]
  $enrMap[$k.ToLower()] = @{ s = $v.simpleMeaning; r = $v.realLifeExample; m = $v.memoryTip }
}
$json = $enrMap | ConvertTo-Json -Depth 5
[System.IO.File]::WriteAllText($gePath, $json, [System.Text.UTF8Encoding]::new($false))
Write-Host ('Updated glossaryEnrichments.json with new entries')

# --- 3. Append new SVG visuals to glossaryVisuals.jsx (before the closing };) ---
$newVisuals = @'

  // ============ NEW CURATED TERMS (Phase 2) ============
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
      <circle cx="38" cy="60" r="3" fill="currentColor" stroke="none" />
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
      <text x="60" y="72" fill="currentColor" textAnchor="middle" fontSize="28" fontFamily="serif">$ paid</text>
      <polygon points="55,80 75,80 65,90" fill="currentColor" />
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
      <text x="60" y="68" fill="currentColor" textAnchor="middle" fontSize="20" fontFamily="serif">c&#178; = a&#178; + b&#178; - 2ab cosC</text>
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

'@

# Read glossaryVisuals.jsx, find the closing }; of V, and insert before it.
$lines = Get-Content -LiteralPath $gvPath
$closeIdx = -1
for ($i = $lines.Count - 1; $i -ge 0; $i--) {
  if ($lines[$i] -match '^\s*\};\s*$') { $closeIdx = $i; break }
}
if ($closeIdx -eq -1) { throw "Could not find closing }; of V in glossaryVisuals.jsx" }
$before = $lines[0..($closeIdx - 1)]
$after = $lines[$closeIdx..($lines.Count - 1)]
$newLines = @($before + $newVisuals + $after)
[System.IO.File]::WriteAllText($gvPath, ($newLines -join "`n"), [System.Text.UTF8Encoding]::new($false))
Write-Host ('Added new visuals to glossaryVisuals.jsx')
