# Reskin report — Seclura website (Tidal Sui / Gallery Scroll)

Generated: 2026-10-21 · Project: `seclura-website` · Framework: Vue 3.5 + Vite 6 + vue-router 4
(SPA, hash history) · Target: `website/`

> The UI was rebuilt around **Tidal Sui** / **Gallery Scroll**; the original **ticker-stage**
> shell and palette were removed while the content contract stayed byte-for-byte intact.

## 1. Direction

| Item | Value |
|---|---|
| Art direction | **Tidal Sui** (`sui-tidal`, clean-fintech) |
| Reference DNA | [sui.io](https://sui.io) — live sampled (4110 ms), palette/texture/type mood only |
| Skeleton | **Gallery Scroll** (`gallery-scroll`, spatial) — implemented; classifier label differs (see §2) |
| Original detected | `ticker-stage` / `linear`; the rendered baseline was a *Split Stage* shell |
| New accent | `#298dff` — **83.88 ΔE** from `#0000ff` (minimum 30) |
| Ground / surfaces | white `#ffffff` · aqua `#e8f3ff` · soft `#f4f9ff` · deep water `#06182a` |
| Type | Segoe UI Variable Display / Segoe UI (display), Segoe UI (body), Cascadia Mono (micro) |
| Motion | 260 ms `cubic-bezier(.22,1,.36,1)`, reduced-motion guard |
| Screenshots | [baseline home](baseline/home-desktop.png) → [current home](current/home-desktop.png) · [side by side](current/compare-home-top.png) |

Live sampling reached 4 of 10 blockchain references (sui.io, base.org, polygon.technology,
cosmos.network); the deterministic selector chose Tidal Sui from the full candidate set. No logo,
image, copy or code was taken from any reference — only palette, shape grammar, type mood, density
and motion. Raw selector output: [STYLE.md](STYLE.md).

## 2. Skeleton change (not a reskin of the old shell)

The baseline was a **Split Stage**: a 41/59 grid with a pinned left rail (cobalt wordmark, numbered
vertical index, full-width Launch button), a white scrolling stage of hairline-separated sections, a
dark full-width closing band, and a 3 px cobalt progress meter. Navigation lived in the rail; the
first viewport was a two-column hero with a transmit-panel + 2×2 stats board.

The new shell is a **Gallery Scroll** built from framed scenes:

- **No persistent side rail and no top bar.** Navigation is a single floating pill **dock** at the
  bottom centre (brand lockup, six section links with dot markers, Whitepaper, two icon-only legal
  shortcuts, filled Launch App) plus a **focused index sheet** on mobile.
- **A sequence of framed scenes** rather than a continuous content well: a full-height white-water
  opening, a horizontal snap rail of feature specimens, a four-move mechanics ladder beside a pale
  readout slab, a frameless tide table, a **bento** vault mosaic, a horizontal roadmap rail, a
  deep-water mission slab, a two-column FAQ wall, and a deep-water closing scene with the form.
- **Light “shore” footer** (aqua, rounded top, brand crest, three horizontal link index rows), not the
  old near-black closing band.
- **Decorative vertical dot index** on the right edge and a floating Back-to-top control.
- **Sky/water surfaces**: white ground, pale aqua slabs, soft caustic gradients, 36–52 px radii, no
  hairline box grid, one saturated accent (`#298dff` fills / large type, `#0b64cc` small text).

DOM landmark order changed from `main → nav → footer` to `main → footer → nav` (the dock is the only
`nav`; there is no `header` or `aside` anywhere). Measured divergence in [verification.json](verification.json):

| Route | DOM fingerprint similarity | Landmark similarity | CSS class overlap |
|---|---:|---:|---:|
| `/` | 0.306 (max 0.50) | 0.667 (max 0.68) | 0.000 (max 0.10) |
| `/privacy` | 0.338 | 0.667 | 0.019 |
| `/terms` | 0.338 | 0.667 | 0.019 |

### Classifier note

The selector asked for `gallery-scroll`, and that is the grammar implemented (full-height scenes,
snap rails, floating dock, dot index, no persistent chrome). The inventory's regex classifier instead
reports **`bento-canvas` / spatial**:

- the frozen binding `{{ site.ticker }}` (6 occurrences, byte-locked by the contract) makes the
  `ticker` trait true, and `ticker` outranks `gallery` in the classifier's decision tree, so it can
  never label this content `gallery-scroll`;
- the scene mosaics genuinely use a **bento** composition (`.tide-bento`, varied 4/7/5-column spans),
  which is the earlier trait the classifier detects.

Both the id and the family therefore differ from `ticker-stage` / `linear`, and the gate is satisfied
by real structure (landmarks, DOM depth, navigation placement), not by relabelling. The full trait set
is recorded in [verification.json](verification.json): `bento: true`, `gallery: true`,
`ticker: true`, `sidebar: false`, `topbar: false`.

## 3. Before / after

| View | Before | After | Side by side |
|---|---|---|---|
| Home desktop | [baseline](baseline/home-desktop.png) | [current](current/home-desktop.png) | [top 900 px](current/compare-home-top.png) |
| Privacy desktop | [baseline](baseline/privacy-desktop.png) | [current](current/privacy-desktop.png) | [top 900 px](current/compare-privacy-top.png) |
| Home mobile | [baseline](baseline/home-mobile.png) | [current](current/home-mobile.png) | [390 × 844](current/compare-home-mobile.png) |
| Home scenes | — | [opening](current/home-0.png) · [modules](current/home-900.png) · [mechanics](current/home-1900.png) · [why](current/home-3000.png) · [vault](current/home-4200.png) · [roadmap](current/home-5400.png) · [mission](current/home-6600.png) · [FAQ](current/home-7800.png) · [closing](current/home-8900.png) | — |
| Privacy | — | [opening](current/privacy-0.png) · [reading wall](current/privacy-700.png) | — |
| Terms | — | [opening](current/terms-0.png) | — |
| 404 | — | [current](current/notfound-0.png) | — |
| Social card | — | [og-cover.png](../public/assets/og-cover.png) | — |

Phase-4 visual review: the two screenshots share no layout signature. Navigation moved from a pinned
left rail to a bottom dock, the first viewport from a split rail/stage to a centred scene, the palette
from cobalt `#0000ff` on blueprint grey to `#298dff` on white water, and the footer from near-black to
pale aqua. The old cobalt, the rail silhouette, the numbered vertical index and the hairline section
stack are all absent.

## 4. Verification verdict

`node …/verify.mjs check --url http://127.0.0.1:4326/` → **PASS** (3 routes, content intact, skeleton
replaced, usability clean). Machine evidence: [VERIFICATION.md](VERIFICATION.md),
[verification.json](verification.json), [current/pages.json](current/pages.json).

| Gate | Result |
|---|---|
| Production build (Vite 6) | **PASS** — 0 errors · `dist/` 3.96 kB HTML (1.45 kB gzip), 46.40 kB CSS (8.80 kB gzip), 146.38 kB JS (55.52 kB gzip) + legal/404 chunks |
| Source content contract | **PASS** — hash `c2aacd4a908a…`, **byte-for-byte identical** to the frozen baseline; 0 removals, 0 count changes, 0 additive warnings |
| Rendered visible words | **PASS** — exactly 656 / 230 / 205 unique words (1,626 / 358 / 363 tokens), identical multisets |
| Rendered attributes & forms | **PASS** — titles, placeholders, icons, links and the `input[type=email]` field unchanged |
| Routes | **PASS** — all three HTTP 200, 0 console or page errors |
| DOM fingerprint similarity | **PASS** — 0.306 / 0.338 / 0.338 |
| Landmark sequence similarity | **PASS** — 0.667 on every route (`main → footer → nav` vs `main → nav → footer`) |
| CSS class reuse | **PASS** — 0.000 / 0.019 / 0.019 (the 0.019 is Vue Router’s own `router-link-active` classes in the footer, present in both builds) |
| Accent distance | **PASS** — 83.88 ΔE (`#0000ff` → `#298dff`) |
| Contrast | **PASS** — 0 failures across 295 / 47 / 49 text runs |
| Axe WCAG 2.x serious/critical | **PASS** — 0 serious and 0 moderate on all routes |
| Mobile overflow at 390×844 | **PASS** — no horizontal scroll; width sweep 320–1280 px also clean |
| Mobile navigation | **PASS** — `/privacy` + `/terms` shortcuts visible, index sheet opens with six labels, Escape closes it |
| Keyboard focus visibility | **PASS** — 8/8 sampled controls show a visible ring |
| Labels / accessible names / alt | **PASS** — 0 issues (no `<img>` on the site) |
| Static validator (`npm run validate`) | **PASS** — 17 checks, 0 failures (retargeted to the dock + tide breakpoints) |
| Interaction smoke test | **PASS** — 24/24 checks, 0 console errors ([interaction-checks.json](current/interaction-checks.json)) |

Fifteen non-blocking warnings remain: the two legal icon-shortcuts and the two scroll rails add
accessibility-only `aria-label`s; their `/privacy` + `/terms` targets are now visible in the dock at
desktop; and the baseline capture happened to catch the Back-to-top control while it was still
visible (it is scroll-gated at 900 px). None of these are visible copy.

## 5. Accessibility and responsive result

- One `h1` per route, logical `h2`/`h3`/`h4` order, landmarks `main` → `contentinfo` → `navigation`.
- Icon-only controls (legal shortcuts, Back to top, index toggle) all carry accessible names; the
  toggle keeps `aria-expanded` + `aria-controls`; Escape closes the index sheet.
- Both horizontal rails are focusable scroll regions (`tabindex="0"`, `role="group"`, labelled), so
  keyboard users can arrow-scroll them; they snap and never widen the document.
- Focus: global 2 px `#0b64cc` ring with 3 px offset; white ring inside deep-water scenes.
- Contrast verified, not assumed: body `#081b2b` on white 17.5:1; muted `#546a7d` 5.6:1 on white and
  5.0:1 on aqua; small accent text `#0b64cc` 5.7:1 on white / 5.0:1 on aqua; large accent display
  `#298dff` 3.3:1 on white (≥3:1 large-text requirement); deep-water text `#eaf4ff`/`#a9c6dd`/`#7cc0ff`
  all ≥9:1.
- Mobile is a genuine linear version: opening scene, single-column rails with snap, stacked bento
  cells, accordion FAQ, and a compact dock (brand glyph, two legal shortcuts, index toggle, Launch
  App). Nothing is hidden to avoid layout work.
- `prefers-reduced-motion` disables smooth scrolling, transitions and animation.
- No third-party fonts, no tracking, no imagery; route-level code splitting for `/privacy`, `/terms`
  and the 404 view.

## 6. Files changed

**Added**

- `src/styles/tide.css` — Tidal Sui tokens, reset, type, primitives, scenes, bento, rails, shell.
- `src/components/TideDock.vue` — floating dock (brand, index, Whitepaper, legal shortcuts, CTA,
  mobile sheet) and the only `nav`.
- `src/components/TideFooter.vue` — light shore footer (brand crest, socials, three index rows, risk
  notice, legal base).
- `.reskin/` evidence — inventory, style selection, wireframe, baseline/current captures,
  comparison strips, `verification.json`, this report, and verification-only helpers
  (`hash-route-server.mjs`, `contract-diff.mjs`, `preview.mjs`, `interaction-check.mjs`,
  `width-sweep.mjs`, `render-og-cover.mjs`).

**Rewritten**

- `src/App.vue` — `tide` shell (`main` → footer → nav), aurora, dot index, Back to top.
- `src/main.js` — imports `tide.css`; still removes the `no-js` marker.
- all nine `src/components/sections/*.vue` — new templates and scoped styles around the frozen
  content blocks (same bindings, handlers, icons, ids).
- `src/views/HomeView.vue`, `LegalView.vue`, `NotFoundView.vue`.
- `index.html` — theme colour `#E8F3FF`, updated layout comment; meta/JSON-LD untouched.
- `public/assets/og-cover.svg` + `.png` — regenerated in the tidal palette (PNG rendered from the SVG
  in headless Chrome so the pair cannot drift).
- `public/assets/favicon.svg` — new blue gradient mark.
- `scripts/validate.mjs` — retargeted to `tide.css`, the 1180/980/820/760/640 scale and the
  dock/toggle pairing; every original check kept.
- `README.md` — direction, styling row, verification status, validator description.

**Removed**

- `src/components/BriefRail.vue`
- `src/components/ClosingBand.vue`
- `src/styles/blueprint.css`

Application logic is untouched: `src/data/site.js`, `src/router/index.js`, all handlers, computed
values, form semantics and route paths are byte-identical. `App.vue` lost only the old progress-meter
computation; the scroll listener and `toTop` behavior remain. Vue transition names `page`, `fade` and
`drop` are retained because they are frozen `name` attributes in the content contract; they generate
framework classes only and never appear in the authored class set.

**Housekeeping outside `src/`** — the previous reskin evidence and the rebrand backup bundles were
moved out of the Vue project to `../.reskin-archive/round2/` and
`../.reskin-archive/rebrand-backups/round2-state-20261020/` (nothing deleted). This kept duplicate
source trees out of the inventory while preserving the earlier evidence.

## 7. Known limitations

1. **Classifier label vs. implemented skeleton.** Explained in §2: the frozen `site.ticker` bindings
   force the `ticker` trait, while the scene mosaics contribute `bento`; the classifier reports
   `bento-canvas` / spatial, not `gallery-scroll`. The implemented navigation and scene grammar is
   Gallery Scroll, and the skeleton family genuinely changed (`linear` → `spatial`).
2. **Hash-route verification.** The app uses `createWebHashHistory`, so the verifier's
   `origin + /privacy` URLs need the verification-only 302 server
   (`.reskin/hash-route-server.mjs`, not shipped). Production URLs remain `/#/privacy` and `/#/terms`.
3. **Fixed dock overlay.** The dock is 58 px tall and floats 14–28 px above the bottom edge; content
   scrolls behind it by design. The footer and the closing scene add bottom padding so the final
   content clears the dock, and `#launch` is near the document end, so the browser clamps the scroll
   there (the scene stays in view; verified in the interaction test).
4. **Pre-existing hash anchors (unchanged).** The footer wordmark keeps `href="#home"` with no handler,
   and `Buy $GHOST` keeps `href="#launch"`; with hash history those hrefs resolve to `#/home` and
   `#/launch`, which are unknown routes, so they land on the 404 view. The dock wordmark keeps the
   baseline `go('#home')` handler, which is inert on legal routes because there is no `#home` element
   there (the baseline rail wordmark behaved the same way). This is exactly the baseline behaviour —
   the attributes are frozen content — and fixing it would require changing link behaviour/content,
   which this task forbids. The dock brand, section links and legal shortcuts use the existing
   `go()`/`goRoute()` handlers and work correctly.
5. **No scrollspy.** The right-edge dot index is decorative (no JavaScript allowed for new state), so
   it does not highlight the active scene; the dock’s labelled links and native anchors are the
   navigation.
6. **Back-to-top aria warning.** The baseline capture recorded the scroll-gated Back-to-top button as
   visible at scroll top; the current capture records it hidden (the same 900 px threshold as before).
   Non-blocking accessibility-name warning only.
7. **404 route is not part of the verifier’s route list** (the inventory only enumerates declared
   routes and `/` links). It is covered by the interaction test (`#/nope`) and the source contract.
8. **Social card is regenerated, not gated.** The OG image now matches the palette, but it is outside
   the reskin content/visual gates.

## 8. Reproduction

```bash
# from website/
npm ci
npm run check                                   # validate + production build
node .reskin/hash-route-server.mjs dist 4326    # verification-only 302 server
node "$RESKIN_DIR/scripts/verify.mjs" check --project "$PWD" --out .reskin --url http://127.0.0.1:4326/
node .reskin/interaction-check.mjs
```
