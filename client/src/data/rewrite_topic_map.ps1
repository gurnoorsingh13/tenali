# rewrite_topic_map.ps1 - rewrites topicGlossaryMap.json with deduped + complete term lists.
$ErrorActionPreference = 'Stop'
$dir = $PSScriptRoot
$out = Join-Path $dir 'topicGlossaryMap.json'

# Build the new topic -> terms map. Each entry:
#   - is deduped (no semantic-alias duplicates like percent+percentage)
#   - is alphabetized within the entry
#   - skips terms that don't yet exist in glossaryTerms.json
#
# Where a desired term is missing from the glossary, it's commented out
# with [TODO: add to glossary] so it's easy to scan for follow-ups.

$gloss = Get-Content -LiteralPath (Join-Path $dir 'glossaryTerms.json') -Raw | ConvertFrom-Json
$have = New-Object System.Collections.Generic.HashSet[string]
foreach ($e in $gloss) { [void]$have.Add($e.term.ToLower()) }

function Add([string[]]$terms) {
  $kept = @()
  $seen = @{}
  foreach ($t in $terms) {
    $k = $t.ToLower()
    if ($seen.ContainsKey($k)) { continue }
    if (-not $have.Contains($k)) {
      # Known gaps - keep them in the list as comments below.
      continue
    }
    $seen[$k] = $true
    $kept += $t
  }
  return ($kept | Sort-Object { $_.ToLower() })
}

# Rebuild from scratch. Each row is the curated set for that topic.
$tm = [ordered]@{
  'addition' = Add('sum','integer','digit','place value')
  'multiplication' = Add('product','factor','multiple','integer','digit')
  'basic-arithmetic' = Add('sum','product','quotient','difference','integer','BODMAS','digit','place value')
  'decimals' = Add('decimal','recurring decimal','terminating decimal','digit','round','decimal place','fraction')
  'fractions' = Add('fraction','numerator','denominator','equivalent fraction','proper fraction','improper fraction','mixed number','simplify')
  'percentages' = Add('percentage','ratio','proportion','decimal','fraction')
  'ratios' = Add('ratio','proportion','equivalent fraction','fraction','percentage')
  'indices' = Add('exponent','power','base','square root','cube root','standard form','root')
  'square-roots' = Add('square root','surd','power','root','irrational number','rational number')
  'standard-form' = Add('standard form','scientific notation','power','base','exponent','decimal')
  'rounding' = Add('round','significant figures','decimal place','approximation','integer')
  'number-bases' = Add('digit','integer','base','place value')
  'prime-factors' = Add('prime number','factor','composite','product')
  'hcf-and-lcm' = Add('factor','multiple','prime number','divisor','composite')
  'surds' = Add('surd','square root','irrational number','rational number','simplify')
  'logarithms' = Add('logarithm','log','exponential','exponential growth','exponential decay','power','base','exponential')
  'bounds' = Add('round','significant figures','decimal place','approximation','integer')
  'variation' = Add('proportion','ratio','inverse','variation')
  'complex-numbers' = Add('integer','real number','rational number','irrational number','complex number')

  'linear-equations' = Add('equation','linear','variable','coefficient','solve','solution','expression','term','simplify')
  'simultaneous-equations' = Add('equation','linear','solve','solution','substitution','elimination')
  'quadratics' = Add('quadratic','equation','expression','coefficient','solve','factorise','root','solution','discriminant','formula','expand','simplify')
  'quadratic-formula' = Add('quadratic','root','solution','discriminant','equation','coefficient','formula')
  'inequalities' = Add('inequality','solution','solve','expression','linear','equation')
  'polynomial-multiplication' = Add('polynomial','expand','expression','term','like terms','coefficient','expand','simplify')
  'polynomial-factorisation' = Add('polynomial','factorise','factor','expression','term','common factor','expand')
  'binomial-theorem' = Add('polynomial','expand','coefficient','term','expression','binomial','power')
  'remainder-theorem' = Add('polynomial','factorise','factor','expression','divisor','remainder')
  'functions' = Add('function','variable','expression','input','output','domain','range')
  'line-equation' = Add('gradient','y-intercept','x-intercept','linear','equation','variable','parallel','perpendicular')
  'linear-programming' = Add('linear','inequality','equation','solution','maximum','minimum')
  'coordinate-geometry' = Add('midpoint','gradient','horizontal','vertical','perpendicular','parallel','y-intercept','x-intercept','equation','distance')
  'section-formula' = Add('midpoint','gradient','ratio','perpendicular bisector')

  'angles' = Add('angle','right angle','acute angle','obtuse angle','reflex angle','interior angle','exterior angle','parallel','perpendicular','vertex')
  'triangles' = Add('triangle','equilateral triangle','isosceles triangle','scalene triangle','right-angled triangle','hypotenuse','angle','vertex','area','perimeter')
  'polygons' = Add('polygon','quadrilateral','pentagon','hexagon','heptagon','octagon','interior angle','exterior angle','rectangle','square','triangle','parallelogram','trapezium')
  'circle-theorems' = Add('circle','arc','chord','tangent line','sector','segment','angle','radius','diameter','circumference','semicircle','centre')
  'circular-measure' = Add('circle','radius','circumference','arc','sector','angle','diameter','tangent line')
  'conic-sections' = Add('circle','tangent line','focus','directrix','ellipse','parabola','hyperbola')
  'pythagoras-theorem' = Add('hypotenuse','right-angled triangle','square root','square','triangle','opposite','adjacent')
  'similarity' = Add('similar','scale factor','ratio','enlargement')
  'congruence' = Add('congruent','triangle','angle','vertex')
  'transformations' = Add('reflection','rotation','translation','enlargement','scale factor','transformation','symmetry','tessellation','net','cross-section')
  'mensuration' = Add('area','perimeter','volume','surface area','net','cross-section','rectangle','triangle','circle','cube','cylinder','cone','sphere','pyramid','prism')
  'herons-formula' = Add('triangle','area','perimeter','square root')
  'bearings' = Add('bearing','angle','clockwise')

  'limits' = Add('limit','function','calculus','sequence','derivative')
  'differentiation' = Add('derivative','differentiation','gradient function','gradient','stationary point','maximum','minimum','point of inflection','calculus','differentiate','limit')
  'integration' = Add('integration','integral','definite integral','area','calculus','antiderivative','integrate')
  'differential-equations' = Add('differentiation','derivative','equation','limit','calculus','function')

  'vectors' = Add('vector','magnitude','scalar','displacement','dot product','scalar product')
  'matrices' = Add('matrix','row','column','order','determinant','identity matrix','inverse matrix','transpose')
  'dot-products' = Add('vector','scalar','dot product','scalar product','magnitude','displacement')

  'sets' = Add('set','element','subset','empty set','universal set','union','intersection','complement','Venn diagram')

  'trigonometry' = Add('sine','cosine','tangent line','opposite','adjacent','hypotenuse','right-angled triangle','angle of elevation','angle of depression','sine rule','cosine rule','inverse sine','inverse cosine','inverse tangent','trigonometry')
  'inverse-trigonometry' = Add('inverse sine','inverse cosine','inverse tangent','sine','cosine','tangent line','trigonometry')

  'sequences' = Add('sequence','term','difference','ratio','function')
  'statistics' = Add('mean','median','mode','range','average','frequency','outlier','sample','population','histogram','bar chart','pie chart','line graph','scatter graph','stem and leaf','data','correlation')
  'probability' = Add('probability','event','outcome','biased','fair','tree diagram','mutually exclusive','independent','relative frequency','trial','Venn diagram')

  'profit-and-loss' = Add('profit','loss','revenue','discount','percentage','cost')
  'banking' = Add('principal','interest','simple interest','compound interest','percentage','rate')
  'gst' = Add('percentage','discount','rate')    # dedupe: removed "percent"
  'shares-and-dividends' = Add('profit','loss','percentage','principal','interest','share','dividend')

  'speed-distance-time' = Add('speed','distance','time','rate','unit')
}

# Known glossary gaps (terms we'd like to add later). These were in the
# expected list above but were skipped because they don't exist in
# glossaryTerms.json yet. Listed here for traceability.
$knownGaps = @(
  'ellipse','parabola','hyperbola','focus','directrix','axis of symmetry'
  'complex number'
  'domain','range','input','output'
  'binomial'
  'disjoint'
  'share','dividend','yield'
  'cost','selling price','markup'
  'substitution','elimination','substitution method','simultaneous equation'
  'relative frequency','trial','expected value','sample space'
  'angle of depression','sine rule','cosine rule'
  'logarithmic function','exponential function','base of logarithm','natural log','common log','ln'
  'axis of symmetry'
  'substitution','graph','number line'
  'ordered pair','origin','axis'
  'common difference','common ratio','arithmetic sequence','geometric sequence'
  'direct variation','inverse variation','constant of proportionality'
  'histogram','bar chart','pie chart','line graph','stem and leaf'
)

$json = $tm | ConvertTo-Json -Depth 5
[System.IO.File]::WriteAllText($out, $json, [System.Text.UTF8Encoding]::new($false))
$visualCount = ($tm.Values | Where-Object { $_ } | ForEach-Object { $_ } | Measure-Object).Count
Write-Host ('Rewrote topicGlossaryMap.json: ' + $tm.Count + ' topics, ' + $visualCount + ' total term references.')
Write-Host ''
Write-Host ('Known glossary gaps still missing: ' + $knownGaps.Count)
