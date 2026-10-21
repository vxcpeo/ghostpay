# Reskin wireframe — Seclura website, round 3

Selected direction (do not substitute): **Tidal Sui** (`sui-tidal`, clean-fintech) /
**Gallery Scroll** (`gallery-scroll`, spatial). Frozen baseline: `ticker-stage` (linear),
accent `#0000ff`, 3 routes (`/`, `/privacy`, `/terms`), content hash `c2aacd4a908a…`.
Baseline evidence: `.reskin/baseline/` (captured before any edit).

## 1. Shell

New shell name: **The Tide** (`.tide`).

```
.tide
├─ .tide__aura            fixed aqua caustic gradients (aria-hidden)
├─ main#main.tide__main   route view
├─ TideFooter  → <footer class="shore">      (light shore panel, giant brand, inline index)
└─ TideDock    → <div class="harbor">
                  <nav class="harbor__dock" aria-label="Primary"> fixed bottom dock
                    brand lockup · six section links · Whitepaper · legal shortcuts · Launch App
                  <div class="harbor__sheet">  mobile index sheet (v-show)
```

DOM landmark order becomes `main → footer → nav`; the baseline was `main → nav → footer`.
The dock is the only `nav`; there is no `header` or `aside` anywhere.

`App.vue` also keeps the `Back to top` control (`toTop`, now `.tidetop`) and adds a
decorative vertical dot index (`.tide__dots`, aria-hidden). No progress meter is kept.

## 2. Navigation pattern

- Desktop: floating pill dock at the bottom centre — the brand lockup, six existing
  `navLinks` as dot + visible label, a `Whitepaper` text link (moved from the old rail), two
  icon-only legal shortcuts (raw `href="/privacy"` / `href="/terms"`, aria-labelled),
  and a filled `Launch App` action. No top bar, no left rail.
- Mobile: the six labels collapse into a floating index sheet opened by an icon
  toggle (`open`); the legal shortcuts and `Launch App` stay visible in the dock, so
  route navigation is reachable without opening anything.
- A fixed vertical dot column on the right edge is decorative only.
- The brand is a dock lockup, not a header bar; it is present on every route but
  never floats over the content.

## 3. Route compositions

Every route is a sequence of framed scenes (`.scene`), separated by generous white
space, with a shared scene grammar: kicker → display headline → deck → content.
Scene surfaces alternate between white, aqua tint (`.scene--tint`) and deep ink
(`.scene--deep`); panels are borderless rounded slabs with tidal shadows.

### `/` — eight scenes

| Scene | id | Composition (existing content) |
|---|---|---|
| 01 Opening | `#home` | 7/5 split: stamp + h1 + lede + two actions; floating "transmit" ticket over a tidal halo, mint line, four-fact grid, three notes; full-width constellation belt of the 16 trust entries |
| 02 Modules | `#features` | centred head + **horizontal snap rail** of the eight feature specimens (not a 2-col list) |
| 03 Mechanics | `#how-it-works` | vertical four-step ladder (huge numerals) beside a pale readout slab with the route mini-map and three checks |
| 04 Why | `#privacy` | frameless tide table (10 rows) at 2/3 width + three tenets stacked at 1/3 |
| 05 Vault | `#tokenomics` | **bento mosaic**: supply + distribution (7 cols), ledger (5), utility (7), buy + disclaimer (5) |
| 06 Horizon | `#roadmap` | horizontal rail of the four phase panels (was a vertical timeline) |
| 07 Crest | `#about` | deep-ink creed slab, then a bento mosaic of the three pillars, six protocol facts, four stats, audit line |
| 08 Shallows | `#faq` | prompt + two doc links in a left column, accordion in a 2/3 column |
| 09 Inlet | `#launch` | deep-ink closing scene: copy + ticks on the left, floating white early-access form on the right |

### `/privacy`, `/terms` — three scenes

| Scene | Composition |
|---|---|
| Opening | full-height panel: `Legal`, `Last updated:`, display `h1`, lead |
| Reading wall | one narrow centred column on an aqua slab; `h2` + `p` per section, generous gaps |
| Return | `Back to home` action in a small closing band |

### 404

Centred "signal lost" scene inside the same shell (`404 · signal lost`, title, copy,
two existing router links).

## 4. Presentation layer

- New global stylesheet `src/styles/tide.css` (tokens, reset, base type, primitives,
  scene/bento/rail grammar, dock/top control, motion). `blueprint.css` is removed.
- New track-only classes and tokens: `.tide-*`, `.scene*`, `.tide-rail*`,
  `.tide-bento*`, `.shore*`, `.harbor*`, `.splash*`, `.modules*`, `.drift*`,
  `.expanse*`, `.vault*`, `.horizon*`, `.crest*`, `.shallows*`, `.inlet*`, `.legal*`.
  No old class or token name survives.
- Tokens: `--bg #ffffff`, `--surface-alt #e8f3ff`, `--ink #081b2b`,
  `--muted #546a7d`, `--accent #298dff` (fills and ≥24px display),
  `--accent-safe #0b64cc` (small accent text), `--shade #06182a`.
- Display: Segoe UI Variable Display / Segoe UI, weight 600, tracking −0.04em.
  Micro: Cascadia Mono. Fluid `clamp()` type, 260ms fluid easing.
- Breakpoints: 1180 / 980 / 820 / 760 / 640.

## 5. Component disposition

| Old | Action |
|---|---|
| `App.vue` shell (`atlas`, rail + stage) | rewritten as `tide` shell |
| `components/BriefRail.vue` | **deleted**; brand/nav/launch/whitepaper/legal move to `TideDock.vue` |
| `components/ClosingBand.vue` | **deleted**; content moves to `TideFooter.vue` |
| `styles/blueprint.css` | **deleted**; replaced by `styles/tide.css` |
| `components/Icon.vue` | kept unchanged |
| `data/site.js`, `router/index.js` | kept byte-identical |
| all nine `sections/*.vue` | templates + scoped styles rewritten around content blocks |
| `views/HomeView.vue`, `LegalView.vue`, `NotFoundView.vue` | rewritten |

All static copy, bindings, events, hrefs/tos, icons, form field and meta stay as
frozen in `.reskin/content-contract.json`; only markup, classes and CSS change.

## 6. Known heuristic conflict

The immutable binding `{{ site.ticker }}` (6 occurrences, frozen by the contract)
contains the literal token `ticker`, so the inventory's regex classifier can never
return `gallery-scroll` for this project: `ticker` outranks `gallery` in its decision
tree. The implemented skeleton is Gallery Scroll (full-viewport scenes, snap rails,
floating dock, dot index, no persistent chrome). The scene mosaics are built as
genuine bento grids (`.tide-bento`), which is the trait the classifier will detect;
that yields `bento-canvas` / `spatial`, a different id and a different family from
the frozen `ticker-stage` / `linear`, so the skeleton gate is satisfied by real
structure rather than by a label. This is recorded again in `REPORT.md`.
