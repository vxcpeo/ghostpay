# Veilary — Website (Vue 3 + Vite)

A Vue 3 marketing site for **Veilary**, rebuilt around an **Abyss Liquidity / Terminal Console**
art direction: a black command field, hairline rules, monospace display type, a fixed top status bar
whose route names read as commands, and each section composed as a three-track console (index
gutter / data body / readout). Red `#FF3B30` is the signal colour, magenta `#FF5CD6` and mint
`#4DF0D0` carry data and status. The earlier Tidal Sui shell — white ground, aqua scenes, a floating
bottom dock and a bento mosaic — is gone. Every non-brand content token, route and handler survived
the rebrand and this rebuild.

> **Read [`docs/status.md`](docs/status.md)** for the research provenance and claim-confidence
> notes. The short version: this project began as a **research-based reconstruction** of a live
> Solana privacy-payments site that could not be fetched from the authoring environment, so copy was
> rebuilt from confirmed public facts. The Veilary identity is new: `veilary.xyz` and `@veilary` are
> confirmed available but **not registered**, and the original `$GHOST` ticker and Solana mint are
> preserved as on-chain identity.
>
> The rebrand evidence, screenshots and gate table are archived under
> [`../.reskin-archive/rebrand-backups/`](../.reskin-archive/rebrand-backups/); the current visual
> rebuild and its verification evidence live in [`.reskin/REPORT.md`](.reskin/REPORT.md).

---

## Source notes — read this before publishing

This build is a **reconstruction**, not a scrape. The original live site could not be reached
from the environment it was written in (`web_fetch` refused every hostname and the shell was dead),
so the content was assembled from public research on the original project and the GhostWareOS stack. See
[`docs/original-site-analysis.md`](docs/original-site-analysis.md) for the per-claim confidence
table and source URLs.

**Confirmed and used in this build**

| Fact | Value | Source |
| --- | --- | --- |
| Product | Payments interface of the GhostWareOS privacy stack; this site publishes it under the Veilary identity | [GitBook: core modules → payment module](https://ghostwareos.gitbook.io/docs/core-modules/ghostpay) |
| Network / ticker | Solana · `$GHOST` | Coinbase, OpenSea, DEXrabbit listings |
| Mint address | `BBKPiLM9KjdJW7oQSKt99RVWcZdhF6sEHRKnwqeBGHST` | Solflare, DEXrabbit, GeckoTerminal |
| Launch | 26 Nov 2025 | [CryptoTimes](https://www.cryptotimes.io/2025/11/27/ghostpay-debuts-on-solana-with-full-private-payments/) |
| Positioning | “Solana’s first private payment rail” | [KuCoin](https://www.kucoin.com/news/flash/ghost-surges-33-after-ghostpay-launch-outperforms-zcash-and-dash) |
| Cryptography | stealth addresses, HPKE, ID obfuscation layer, DarkRelay | GitBook docs tree |
| Integrations | [Solflare wallet](https://coincodex.com/article/81717/solana-privacy-push-continues-as-ghostwareos-integrates-with-solflare-wallet/), Moonshot airdrop | CoinCodex, Cryptopolitan |

**Labelled as illustrative or unverified in the UI**

- **Tokenomics** (supply, the 30/20/18/15/12/5 split, 0%/0% tax) — no published source; rendered with
  a visible “illustrative allocation” warning in `TokenomicsSection.vue`.
- **Social handles** — `@veilary` is confirmed available but not registered; the site links to
  `https://x.com/veilary`. Telegram, Discord and GitHub remain disabled `handle TBA` placeholders
  until real profiles exist.
- **Zero-knowledge / shielded-pool claims** — deliberately *removed* from the copy: no source ties zk
  proofs or a shielded pool to Veilary. The site now describes only documented primitives.
- **Tagline, feature blurbs, hero stats, FAQ wording and the four-part “how it works”* — written for
  this build. Rewrite them from the live site if verbatim fidelity is required.

> Verify the mint address against the official site before publishing. A wrong contract address on a
> live page is a direct financial hazard, and this sector is full of impersonator tokens.

## Verification status

| Check | Status |
| --- | --- |
| `npm install` + `npm run build` | ✅ passed — Vite 6.4.4, production bundle emitted to `dist/` |
| `npm run validate` | ✅ passed — imports, icons, anchors, CSS tokens, routes, assets, host whitelist, breakpoints, status-bar pairing and tooling |
| Reskin content + skeleton + browser gate | ✅ passed — 3/3 routes, exact rendered words, 0 contrast failures, 0 serious axe issues, no mobile overflow |
| 404 fallback, command palette Escape, legal shortcut, form error/success, FAQ, copy, back-to-top | ✅ smoke-tested in Chromium (27/27, see `.reskin/current/interaction-checks.json`) |
| `npm run capture` — diff against the live page | ⚠️ still requires a normal network; DNS remains blocked in the original authoring environment |
| CI (`.github/workflows/verify.yml`) | ⚠️ not run here; it performs install → validate → build |

Run this to repeat the local verification chain:

```bash
pwsh -File .\verify.ps1        # Windows
./verify.sh                    # macOS / Linux / WSL
```

Expected: the validator prints `✅ PASS`, `dist/` contains `index.html` plus hashed JS/CSS assets,
and `.reskin/VERIFICATION.md` says PASS.

## Build output and rebrand evidence

`preview/index.html` was a zero-toolchain stopgap from the pre-toolchain session and has been
**removed** because it showed the retired dark design. The Vue app now builds and runs normally;
use `npm run preview` for a local production build.

- `npm run dev` — Vite dev server on `http://127.0.0.1:5173`
- `npm run build` — production bundle in `dist/`
- `npm run preview` — serve the built bundle
- `.reskin/REPORT.md` — selected direction, screenshots and gate table
- `.reskin/VERIFICATION.md` — machine-written route and accessibility verdict

## Tech stack

| Layer      | Choice                             |
| ---------- | ---------------------------------- |
| Framework  | Vue 3 (`<script setup>` SFCs)      |
| Build tool | Vite 6                             |
| Routing    | vue-router 4 (hash history)        |
| Styling    | Hand-written CSS with Abyss console tokens (`src/styles/abyss.css`) |
| Icons      | CSS-masked glyph component driven by path data (no deps) |
| Motion     | CSS transitions only; reduced-motion guard |

Zero UI/icon/animation dependencies — only `vue` and `vue-router`.

## Quick start

```bash
cd website
npm install        # or: pnpm install
npm run dev        # http://127.0.0.1:5173
```

**One command does the whole verification chain** (install → validate → build → assert the bundle,
with a plain-language pass/fail report):

```bash
pwsh -File .\verify.ps1      # Windows
./verify.sh                  # macOS / Linux / WSL
```

Add `-Capture` / `--capture` to also fetch the live site and diff it against this build.

Production build and preview:

```bash
npm run build      # outputs to website/dist
npm run preview    # serves the built bundle
```

Static self-check — runs without a bundler and catches what a build never would:

```bash
npm run validate   # imports resolve · icon names exist · anchors match ids · router links hit
                   # real routes · assets exist · CSS vars defined · no unverified claims
                   # external hosts on the verified whitelist · breakpoints and nav pairing
npm run dns        # live DNS check of every domain the site links to or warns about
npm run check      # validate + build, the same pair CI runs
```

`scripts/validate.mjs` has no dependencies, needs no network, and exits non-zero on failure. Its
checks cover local imports, icon names, in-page anchors, CSS custom properties, router-link targets
(including the hash-history anchor form), referenced assets, external-source hosts, responsive
breakpoints, status-bar/toggle pairing, npm-script and runner wiring, and the **copy guard** — reintroducing `zero-knowledge`, a shielded pool, the invalid placeholder mint address or the
invented social handles fails the run. Content parity for the reskin is enforced separately by the reskin skill harness
(`.reskin/hash-route-server.mjs` maps the hash-history legal routes, `verify.mjs` runs the gates).

## Domain verification (`npm run dns`)

`scripts/dns.mjs` resolves every domain this project links to **or warns about**, over Google's JSON
DNS API on an IP literal (`https://8.8.8.8/resolve`) — which works even where ordinary hostname
resolution is blocked:

```bash
npm run dns                # human-readable table + pass/fail exit code
npm run dns -- --json      # machine-readable
node scripts/dns.mjs example.com   # check an arbitrary name
```

It answers three questions that matter for a site full of outbound links: did a linked domain stop
resolving; is a documented impersonator domain actually live (live = higher risk); and is a cited
source real. Last verified results:

| Domain | State | Note |
| --- | --- | --- |
| `veilary.xyz` + `www` | ✅ available, not registered | availability snapshot 2026-10-20; register before launch |
| `ghostwareos.gitbook.io` | ✅ live | the only verified documentation host |
| `solflare.com` · `cryptotimes.io` · `coincodex.com` · `kucoin.com` | ✅ live | cited integration and press sources |
| `ghostwareos.org` | ✅ NXDOMAIN | flagged as a crypto drainer, and it does not resolve |
| `ghostwareos.com` | ⚠️ private IP | resolves to `31.43.160.6` — not a normal public site |
| `ghostware-os.com` | ⚠️ live | flagged as phishing |
| `ghostpay.org` · `ghostland.at` | ℹ️ live | unrelated projects; never link to them |

## Closing the fidelity gap (run this on a normal network)

This build is a **reconstruction**, because the environment that wrote it could not resolve any
hostname (`web_fetch` refuses every named host; only IP literals like `https://1.1.1.1/` connect).
The site could not be opened, so unverifiable values are labelled placeholders.

`scripts/capture.mjs` fixes that in one command. Run it from a machine with normal DNS:

```bash
cd website
npm run capture                                   # fetch the live site once deployed, extract, diff
node scripts/capture.mjs --url http://localhost:8080   # against a local mirror
node scripts/capture.mjs --file saved.html        # parse a page you saved by hand
node scripts/capture.mjs --json                   # machine-readable diff only
```

It needs Node 18+ (built-in `fetch`), no dependencies, and writes:

| Output | Contents |
| --- | --- |
| `docs/capture/homepage-<timestamp>.html` | the raw page, so nothing depends on re-fetching |
| `docs/capture/capture.json` | every extracted fact: title, meta, headings, buttons, links, sections, stylesheets, scripts, hex palette, base58 mint candidates, social links |
| `docs/capture/DIFF.md` | a field-by-field table: our value vs found-on-page, plus the original's headings, labels, colours and socials |

The highest-value row is **"mint address matches the page"** — a wrong contract address on a live
page is a direct financial hazard, so that check is worth running on its own.

Then apply the ❌ rows to `src/data/site.js` and the affected templates, and run:

```bash
npm run validate && npm run build
```

If the original renders client-side, a plain fetch sees an empty shell. In that case open the page
in a browser, run `copy(document.documentElement.outerHTML)` in the console, save it as `saved.html`
and use `--file saved.html`.

## Project structure

```
website/
├── index.html                     # shell, SEO + Open Graph / Twitter meta, no-JS marker
├── vite.config.js                 # @ alias → src, base './' (deploy anywhere)
├── package.json · package-lock.json
├── public/
│   ├── robots.txt · sitemap.xml   # crawler hints (validator checks they agree)
│   └── assets/og-cover.svg|png    # 1200x630 terminal-console social card (PNG rendered from the SVG)
├── verify.ps1 / verify.sh         # one-shot: install → validate → build → report
├── scripts/
│   ├── validate.mjs               # dependency-free static self-check + copy guard
│   ├── capture.mjs                # fetch the live site, extract facts, diff against this build
│   └── dns.mjs                    # resolve every linked/warned domain over DoH-on-IP-literal
├── docs/capture/                  # output of `npm run capture` (evidence + DIFF.md)
├── .reskin/                       # reskin evidence: gates, screenshots, verification-only helpers
└── src/
    ├── main.js                    # app bootstrap + abyss.css import
    ├── App.vue                    # console shell: field, status bar, main, colophon, back-to-top
    ├── router/index.js            # / , /privacy , /terms , 404 fallback + scroll behavior
    ├── data/site.js               # ⚙️ ALL site content: nav, features, tokenomics, roadmap, FAQ
    ├── styles/abyss.css           # Abyss tokens, reset, console grammar, status bar, colophon
    ├── components/
    │   ├── Icon.vue               # CSS-masked glyph set driven by path data
    │   ├── SysBar.vue             # fixed top status bar: commands, legal glyphs, CTA, mobile palette
    │   ├── Colophon.vue           # console footer: brand, socials, link index, risk notice
    │   └── sections/
    │       ├── HeroSection.vue    # boot console: command line, transaction pane, counters, relay
    │       ├── FeaturesSection.vue    # ruled registry of the eight core modules
    │       ├── HowItWorksSection.vue  # four-command process list + sticky trace readout
    │       ├── ComparisonSection.vue  # definition-list comparison ledger + three tenets
    │       ├── TokenomicsSection.vue  # data console: supply, distribution meters, facts, buy
    │       ├── RoadmapSection.vue     # four-phase process ledger
    │       ├── AboutSection.vue       # mission creed + protocol record + manifest stats
    │       ├── FaqSection.vue         # index column + accordion log
    │       └── LaunchSection.vue      # closing gate console + validated access form
    └── views/
        ├── HomeView.vue           # boot console followed by every module, in order
        ├── LegalView.vue          # /privacy and /terms legal reading console (shared, prop-driven)
        └── NotFoundView.vue       # "this page has gone quiet" fault console
```

## Editing content

Everything textual and numeric lives in **`src/data/site.js`**:

- `site` — name, domain, tagline, ticker, chain, `contract` (⚠️ replace the placeholder), audit line
- `navLinks`, `socials` — navigation and footer/community links
- `heroStats`, `trustLogos` — opener metrics and the ecosystem register
- `features` (8), `steps` (4), `tokenomics` (supply, tax, distribution, utility)
- `roadmap` (4 phases with `done` / `active` / `next` status)
- `faqs` (8), `brandPillars`

## Design tokens

Defined once in `src/styles/abyss.css` (`:root`):

| Token                  | Value     | Use                                |
| ---------------------- | --------- | ---------------------------------- |
| `--void`               | `#04070B` | page ground and the fixed command field |
| `--deck` / `--plate`   | `#0A121A` / `#0F1B25` | console consoles and raised data |
| `--plate-2`            | `#14232E` | transaction console and readouts   |
| `--ink`                | `#EEF6FB` | primary type                       |
| `--dim`                | `#A3B8C8` | running text (≥ 7:1 on the deck)   |
| `--faint` / `--edge-3` | `#7B93A4` / `#3B5B70` | micro labels and inactive rules |
| `--red` / `--red-safe` | `#FF3B30` / `#FF9B91` | signal fills, large display / small accent text |
| `--magenta`            | `#FF5CD6` | HPKE / secondary data              |
| `--mint`               | `#4DF0D0` | status LEDs and focus rings        |
| `--edge` / `--edge-2`  | `#1A2A36` / `#2A4355` | hairlines and console borders |
| `--mono` / `--body` / `--display` | Cascadia Mono · Segoe UI · Cascadia Mono | type system |

Sharp, flat surfaces (2–14px radii), 1px hairlines and monospace display type carry the hierarchy;
`--red` is the only saturated signal colour, with magenta and mint reserved for data and status.
The console grammar (`.module`, `.module__grid`, `.ledger`, `.cmd`, `.sysbar`, `.colophon`) is the
shared vocabulary; sections never fall back to rounded cards or a bento mosaic.

## Accessibility & performance notes

- Semantic `header` → `nav` → `main` → `footer` landmarks, one `h1` per view, visible mint focus rings,
  and a status bar that keeps both route shortcuts reachable from 320px up (the command palette
  closes on Escape).
- The status bar is fixed at the top; `scroll-padding-top` clears it for in-page anchors. The mobile
  palette is a disclosure with `aria-expanded` + `aria-controls`, not a second navigation tree.
- All form fields are labelled; icons are `aria-hidden` CSS masks; the accordion exposes
  `aria-expanded`; the two icon-only legal shortcuts carry accessible names.
- `prefers-reduced-motion` disables smooth scrolling and transitions.
- No canvas, no external font requests, no icon/runtime dependencies; only route-level code splitting
  for `/privacy`, `/terms` and the 404 view.

### Progressive enhancement

There are no opacity-gated scroll reveals in this build, so content is never hidden behind an
IntersectionObserver. `index.html` still sets a `no-js` marker before the module loads and `main.js`
removes it after mount; if the bundle fails, the layout is simply static rather than blank.

The status bar keeps the raw legal paths (`/privacy`, `/terms`) as accessible shortcut links with
JavaScript enhancement, and the mobile command palette closes on Escape. These are additive-only
accessibility controls: no visible copy was added, and the original content tokens, bindings and
handlers are unchanged.

## Deployment

`npm run build` produces a static bundle in `dist/`. `base` is `'./'` and the router uses hash
history, so the folder can be dropped on any static host (Netlify, Vercel, GitHub Pages, S3,
nginx) without rewrite rules.

## Disclaimer

This is an independent, educational reconstruction of a public marketing site for a
cryptocurrency project. It is not affiliated with, endorsed by or operated by GhostWareOS or the
GhostPay project. Nothing here is financial advice; `$GHOST` is a high-risk asset. Do not enter real
funds based on this code.
