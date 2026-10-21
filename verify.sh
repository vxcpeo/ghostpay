#!/usr/bin/env bash
#
# Veilary website — one-shot setup and verification (macOS / Linux / WSL).
#
# The agent that wrote this site could not run a single shell command on its side
# (every attempt returned 0xC0000142), so the Vue app has never been compiled.
# This script runs the whole verification chain and reports plainly.
#
#   ./verify.sh              install, validate, build, report
#   ./verify.sh --capture    also fetch the live site and diff it (needs normal DNS)
#   ./verify.sh --no-install reuse an existing node_modules
#
# Nothing here is destructive: it installs dependencies and writes build output.

set -uo pipefail

cd "$(dirname "$0")"

CAPTURE=0
SKIP_INSTALL=0
for arg in "$@"; do
  case "$arg" in
    --capture) CAPTURE=1 ;;
    --no-install) SKIP_INSTALL=1 ;;
  esac
done

c_cyan='\033[36m'; c_green='\033[32m'; c_red='\033[31m'; c_grey='\033[90m'; c_off='\033[0m'
step() { printf "\n${c_cyan}=== %s ===${c_off}\n" "$1"; }
ok()   { printf "  ${c_green}[ok]${c_off}   %s\n" "$1"; }
bad()  { printf "  ${c_red}[FAIL]${c_off} %s\n" "$1"; }
info() { printf "  ${c_grey}%s${c_off}\n" "$1"; }

failed=()

step "Environment"
if ! command -v node >/dev/null 2>&1; then
  bad "Node.js not found on PATH. Install Node 20 LTS from https://nodejs.org and re-run."
  exit 1
fi
info "node $(node -v) / npm $(npm -v)"
major="$(node -v | sed 's/^v//' | cut -d. -f1)"
if [ "$major" -lt 18 ]; then
  bad "Node $(node -v) is too old — Vite 6 needs Node 18+, 20+ recommended."
  exit 1
fi

if [ "$SKIP_INSTALL" -eq 0 ]; then
  step "Install dependencies"
  if npm install; then ok "dependencies installed"; else failed+=("npm install"); fi
else
  info "skipped (--no-install)"
fi

step "Static validation (scripts/validate.mjs)"
if node scripts/validate.mjs; then ok "all static checks passed"; else failed+=("npm run validate"); fi

step "Production build"
if npm run build; then
  if [ -f dist/index.html ]; then
    ok "dist/index.html written"
    if [ -d dist/assets ]; then
      ls -1sh dist/assets | sed 's/^/  /'
      ls dist/assets | grep -q '\.js$'  && ok "hashed JS bundle present" || bad "no .js bundle in dist/assets"
      ls dist/assets | grep -q '\.css$' && ok "hashed CSS bundle present" || bad "no .css bundle in dist/assets"
    else
      bad "dist/assets is empty or missing"
    fi
  else
    bad "dist/index.html was not produced"
  fi
else
  failed+=("npm run build")
fi

if [ "$CAPTURE" -eq 1 ]; then
  step "Capture the live site and diff it against this build"
  if node scripts/capture.mjs; then
    ok "see docs/capture/DIFF.md"
  else
    failed+=("capture")
    info "If DNS/TLS failed, open the site in a browser, run copy(document.documentElement.outerHTML),"
    info "save it as site.html, then: node scripts/capture.mjs --file site.html"
  fi
fi

step "Result"
if [ ${#failed[@]} -eq 0 ]; then
  printf "  ${c_green}Everything passed.${c_off}\n"
  printf "  Start the dev server with:  npm run dev   (http://127.0.0.1:5173)\n"
  exit 0
fi

printf "  ${c_red}These steps failed: %s${c_off}\n" "$(IFS=', '; echo "${failed[*]}")"
printf "  Fix the errors printed above, then re-run this script.\n"
exit 1
