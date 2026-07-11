# merge_enrichments.ps1 - extends glossaryTerms.json with 4 new fields per entry.
# For every entry in glossaryTerms.json:
#   - adds simpleMeaning, realLifeExample, memoryTip from glossaryEnrichments.json
#   - adds visualId = term.toLowerCase() if the term is in the curated set
#     (referenced by any topic in topicGlossaryMap.json), else $null
# Preserves original field order: term, definition, aliases, simpleMeaning,
# visualId, realLifeExample, memoryTip.
$ErrorActionPreference = 'Stop'
$dir = $PSScriptRoot
$gtPath = Join-Path $dir 'glossaryTerms.json'
$gePath = Join-Path $dir 'glossaryEnrichments.json'
$tmPath = Join-Path $dir 'topicGlossaryMap.json'
$gt = Get-Content -LiteralPath $gtPath -Raw | ConvertFrom-Json
$ge = Get-Content -LiteralPath $gePath -Raw | ConvertFrom-Json
$tm = Get-Content -LiteralPath $tmPath -Raw | ConvertFrom-Json
$lookup = @{}
foreach ($e in $gt) { $lookup[$e.term.ToLower()] = $e.term }
$curated = New-Object System.Collections.Generic.HashSet[string]
foreach ($prop in $tm.PSObject.Properties) {
  foreach ($key in $prop.Value) {
    $canon = $key.ToLower()
    if ($lookup.ContainsKey($canon)) {
      [void]$curated.Add($lookup[$canon])
    }
  }
}
$merged = @()
$enrLookup = @{}
foreach ($p in $ge.PSObject.Properties) { $enrLookup[$p.Name.ToLower()] = $p.Value }
foreach ($e in $gt) {
  $canonLower = $e.term.ToLower()
  $enr = $enrLookup[$canonLower]
  $visualId = if ($curated.Contains($e.term)) { $canonLower } else { $null }
  $obj = [ordered]@{
    term            = $e.term
    definition      = $e.definition
    aliases         = $e.aliases
    simpleMeaning   = if ($enr) { $enr.s } else { $e.definition }
    visualId        = $visualId
    realLifeExample = if ($enr) { $enr.r } else { $null }
    memoryTip       = if ($enr) { $enr.m } else { $null }
  }
  $merged += [pscustomobject]$obj
}
$json = $merged | ConvertTo-Json -Depth 5
[System.IO.File]::WriteAllText($gtPath, $json, [System.Text.UTF8Encoding]::new($false))
$visualCount = ($merged | Where-Object { $_.visualId } | Measure-Object).Count
Write-Host ('Merged ' + $merged.Count + ' entries; ' + $visualCount + ' have visualId.')