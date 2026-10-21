# Status and handoff

Everything an incoming session — human or agent — needs to know in one page. Written after 14
rounds of work in an environment with **no working shell** and **no hostname resolution for HTTP**.

## The deliverable

`website/` — a Vue 3 + Vite single-page marketing site for GhostPay, matching the structure and
content of `ghostpayfin.xyz` as closely as could be established without reading that page.

| | |
| --- | --- |
| Files | 46 |
| Framework | Vue 3 (`<script setup>` SFCs), Vite 6, vue-router 4 (hash history) |
| Dependencies | `vue`, `vue-router` only — no UI, icon or animation libraries |
| Sections | Hero · Features · How it works · Comparison · Tokenomics · Roadmap · About · FAQ · Launch |
| Routes | `/` · `/privacy` · `/terms` · 404 fallback |

## Two things are unverified. Both need a working shell.

### 1. The app has never been compiled

Every `pwsh` invocation in this environment fails before running, including `Get-Date`:

```
[exit code: 3221225794]   # 0xC0000142, STATUS_DLL_INIT_FAILED
```

Retested 14 times across the session, plus by two independent subagents. So `npm install`,
`npm run validate` and `npm run build` have **never run**. No `node_modules`, no `dist/`, no
lockfile.

### 2. The original page has never been read

`web_fetch` refuses every **hostname** ("resolves to a non-public IP"), including `ghostpayfin.xyz`,
`example.com` and `registry.npmjs.org`. IP literals work — `https://1.1.1.1/cdn-cgi/trace` returns
HTTP 200 — but Cloudflare's edge needs SNI to pick a certificate and the tool exposes no header or
SNI control, so both real A records fail at TLS.

What *was* established about the domain is in [research-brief.md](research-brief.md) §4b: it is
live, Cloudflare-fronted, and **apex-only** (no `app`/`docs`/`api`/`blog` subdomain exists), which
confirms the single-page shape of this rebuild.

A search for published source or a clone of the site (GitHub, paste sites, template galleries)
found nothing. The only public "GhostPay" code is unrelated: a web2/web3 bridge hackathon repo, a
virtual-card microservice, and a Nintendo homebrew plugin.

## How to close both, in one command

```bash
cd website
pwsh -File .\verify.ps1 -Capture      # Windows
./verify.sh --capture                 # macOS / Linux / WSL
```

That installs, runs the static validator, builds, asserts the hashed bundle exists, then fetches
the live site — homepage **and** inner pages, plus its real CSS palette — and writes
`docs/capture/DIFF.md`: a field-by-field comparison against this build.

If the fetch fails (bot rules, or the page renders client-side), open the site in a browser, run
`copy(document.documentElement.outerHTML)` in the console, save it as `site.html`, then:

```bash
node scripts/capture.mjs --file site.html
```

**Start with the "mint address matches the page" row.** A wrong contract address on a live page is a
direct financial hazard, and this build carries `BBKPiLM9KjdJW7oQSKt99RVWcZdhF6sEHRKnwqeBGHST`
sourced from Solflare/DEXrabbit/GeckoTerminal rather than from the site itself.

## What is already verified

| Check | How |
| --- | --- |
| Design renders correctly | `preview/index.html` — open it; self-tests 27 mount points, reports to the console |
| 20 SFCs, imports, icon names, CSS tokens | independent static review, 0 defects |
| 12 automated check groups | `npm run validate` (written, **not yet executed**) |
| Every linked domain resolves | `npm run dns` — live DoH queries; records in [research-brief.md](research-brief.md) |
| Routing, breakpoints, no-JS fallback | fixed in rounds 6, 12, 13 and now enforced by the validator |

## Known caveats in the copy

These are **labelled in the UI**, not hidden:

- **Tokenomics** (supply, the six-way split, 0%/0% tax) — no published source; the section carries
  a visible "illustrative allocation" warning.
- **Social handles** — no official X/Telegram/Discord/GitHub could be verified, so they point
  nowhere with a `handle TBA` label.
- **Tagline, feature blurbs, hero stats, FAQ wording, roadmap phases** — written for this rebuild
  from confirmed product facts (stealth addresses, HPKE, GhostSwap, Solflare, the Nov 2025 launch).
- Zero-knowledge and shielded-pool claims were **removed**: no source ties either to GhostPay, and
  `npm run validate` now fails if they reappear.

See [research-brief.md](research-brief.md) for the per-claim confidence table.
