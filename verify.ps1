<#
  Seclura website — one-shot setup and verification.

  WHY THIS EXISTS
  The agent that wrote this site could not run a single shell command: every attempt on its side
  returned 3221225794 (0xC0000142, STATUS_DLL_INIT_FAILED). So the Vue app has never been
  compiled. Run this script in a normal terminal and it will do the whole verification chain and
  tell you, in plain words, what passed and what needs fixing.

  USAGE
    pwsh -File .\verify.ps1              # install, validate, build, report
    pwsh -File .\verify.ps1 -Capture     # also fetch the live site and diff it (needs normal DNS)
    pwsh -File .\verify.ps1 -SkipInstall # reuse an existing node_modules

  Nothing here is destructive: it only installs dependencies and writes build output.
#>

[CmdletBinding()]
param(
  [switch]$Capture,
  [switch]$SkipInstall
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

function Step($msg) { Write-Host "`n=== $msg ===" -ForegroundColor Cyan }
function Ok($msg)   { Write-Host "  [ok]   $msg" -ForegroundColor Green }
function Bad($msg)  { Write-Host "  [FAIL] $msg" -ForegroundColor Red }
function Info($msg) { Write-Host "  $msg" -ForegroundColor Gray }

$failed = @()

Step "Environment"
try {
  $nodeVersion = (& node -v) 2>$null
  $npmVersion = (& npm -v) 2>$null
  Ok "node $nodeVersion / npm $npmVersion"
} catch {
  Bad "Node.js not found on PATH. Install Node 20 LTS from https://nodejs.org and re-run."
  exit 1
}

$major = [int](($nodeVersion -replace '^v', '') -split '\.')[0]
if ($major -lt 18) {
  Bad "Node $nodeVersion is too old — Vite 6 needs Node 18+, 20+ recommended."
  exit 1
}

if (-not $SkipInstall) {
  Step "Install dependencies"
  & npm install
  if ($LASTEXITCODE -ne 0) { $failed += 'npm install' } else { Ok "dependencies installed" }
} else {
  Info "skipped (--SkipInstall)"
}

Step "Static validation (scripts/validate.mjs)"
& node scripts/validate.mjs
if ($LASTEXITCODE -ne 0) { $failed += 'npm run validate' } else { Ok "all static checks passed" }

Step "Production build"
& npm run build
if ($LASTEXITCODE -ne 0) {
  $failed += 'npm run build'
} else {
  $index = Join-Path $root 'dist\index.html'
  if (Test-Path $index) {
    Ok "dist/index.html written"
    $assets = Get-ChildItem (Join-Path $root 'dist\assets') -ErrorAction SilentlyContinue
    if ($assets) {
      $assets | ForEach-Object { Info ("{0}  {1:N1} KB" -f $_.Name, ($_.Length / 1KB)) }
      if ($assets.Name -match '\.js$') { Ok "hashed JS bundle present" } else { Bad "no .js bundle in dist/assets" }
      if ($assets.Name -match '\.css$') { Ok "hashed CSS bundle present" } else { Bad "no .css bundle in dist/assets" }
    } else {
      Bad "dist/assets is empty or missing"
    }
  } else {
    Bad "dist/index.html was not produced"
  }
}

if ($Capture) {
  Step "Capture the live site and diff it against this build"
  & node scripts/capture.mjs
  if ($LASTEXITCODE -ne 0) {
    $failed += 'capture'
    Info "If DNS/TLS failed, open the site in a browser and run:"
    Info "  copy(document.documentElement.outerHTML)"
    Info "then save it as site.html and run: node scripts/capture.mjs --file site.html"
  } else {
    Ok "see docs/capture/DIFF.md"
  }
}

Step "Result"
if ($failed.Count -eq 0) {
  Write-Host "  Everything passed." -ForegroundColor Green
  Write-Host "  Start the dev server with:  npm run dev   (http://127.0.0.1:5173)" -ForegroundColor Green
  exit 0
}

Write-Host "  These steps failed: $($failed -join ', ')" -ForegroundColor Red
Write-Host "  Fix the errors printed above, then re-run this script." -ForegroundColor Red
exit 1
