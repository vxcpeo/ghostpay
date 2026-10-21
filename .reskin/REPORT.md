# Reskin report — Veilary website + X kit (Abyss Liquidity / Terminal Console)

Generated: 2026-10-22 · Project: `veilary-website` · Vue 3.5 + Vite 6 + vue-router 4 (SPA, hash
history) · Scope: `website/` and the X / Twitter kit in `twitter/`

> The UI was rebuilt around **Abyss Liquidity** / **Terminal Console**; the original **bento-canvas**
> shell and palette were removed while the content contract stayed byte-for-byte intact.

## 1. Direction

| Item | Value |
|---|---|
| Art direction | **Abyss Liquidity** (`aave-abyss`, dark-technical) |
| Reference DNA | [aave.com](https://aave.com) — live sampled (3032 ms); palette/texture/type mood only, no assets or copy |
| Skeleton | **Terminal Console** (`terminal-console`, linear) — classifier confirmed |
| Original detected | `bento-canvas` / `spatial`; the rendered baseline was the Tidal Sui site |
| New accent | `#ff3b30` — **130.98 ΔE** from `#298dff` (minimum 30) |
| Ground / surfaces | `#04070b` void · `#0a121a` deck · `#0f1b25` plate · `#14232e` raised data |
| Type | Cascadia Mono / Consolas for display, labels and commands; Segoe UI for body |
| Motion | 180–240 ms `cubic-bezier(.2,.8,.2,1)`, reduced-motion guard |
| Screenshots | [baseline home](baseline/home-desktop.png) → [current home](current/home-desktop.png) · [current privacy](current/privacy-desktop.png) |

Live sampling reached 9 of 10 blockchain references; the deterministic selector chose Abyss
Liquidity from the full candidate set. Raw selector output: [STYLE.md](STYLE.md).

The selector's live-sample anchor was `#ff0000`; the implementation uses `#ff3b30` for fills and
large display, and `#ff9b91` for small accent text on dark plates. Same red family, adjusted for
contrast: `#ff0000` as small text is borderline on the deck, while `#ff9b91` measures ≥ 7:1 and the
verified accent distance is still 130.98 ΔE.

## 2. Skeleton change (not a reskin of the old shell)

The baseline was Tidal Sui: a white-water ground, a floating pill dock at the bottom centre, framed
scene panels, a bento vault, horizontal snap rails and rounded aqua slabs.

The new shell is a **terminal console**:

- **Fixed 52 px status bar at the top** whose route names read as monospace commands, with two legal
  glyphs and a red `Launch App` block; on mobile the rail collapses into a command palette
  (`aria-expanded` + `aria-controls`, Escape closes it). There is no bottom dock and no logo block.
- **Boot console** instead of a marketing hero: a left command line (status chip, H1, lede, actions)
  and a right `veilary://send` transaction pane (From / To / Amount / HPKE seal / send key), then a
  CA readout, four stat cells, three notes and a relay strip.
- **Eight module consoles**, each with a hairline bar and a three-track grid (index gutter / data body
  / readout): a ruled feature registry, a four-command process list with a sticky trace, a
  definition-list comparison ledger, a data console with distribution meters, a four-phase process
  ledger, a mission manifest, an accordion log, and a closing gate console with the form.
- **Legal console**: numbered opening, a reading wall framed by a tick rail and a dot-matrix meta rail.
- **Console colophon** instead of a light shore footer: brand, blurb, social glyphs, three index rows,
  risk notice, © line and legal links.
- **Flat data surfaces**: 1 px hairlines, 2–14 px radii, no soft shadows or caustics, red as the only
  saturated signal, magenta for HPKE data and mint for status.

Measured divergence (`verification.json`):

| Route | DOM fingerprint similarity | Landmark similarity | CSS class overlap |
|---|---:|---:|---:|
| `/` | 0.480 (max 0.50) | 0.500 (max 0.68) | 0.000 (max 0.10) |
| `/privacy` | 0.382 | 0.500 | 0.018 |
| `/terms` | 0.382 | 0.500 | 0.018 |

The 0.018 class overlap is Vue Router's own `router-link-active` / `router-link-exact-active`
classes in the footer plus the dynamic `row.legacy` / `row.ours` expressions — the authored class
set is disjoint from the baseline.

### Skeleton evidence

The classifier reports `terminal-console` / `linear` with `terminal: true, bento: false,
gallery: false`; the baseline was `bento-canvas` / `spatial`. The old `tide.css`, `TideDock.vue`
and `TideFooter.vue` were moved out of the project (see §6), so no stale `bento`/`gallery` selectors
can influence the source scan.

## 3. Before / after

| View | Before | After |
|---|---|---|
| Home desktop | [baseline](baseline/home-desktop.png) | [current](current/home-desktop.png) |
| Privacy desktop | [baseline](baseline/privacy-desktop.png) | [current](current/privacy-desktop.png) |
| Terms desktop | [baseline](baseline/terms-desktop.png) | [current](current/terms-desktop.png) |
| Home mobile | [baseline](baseline/home-mobile.png) | [current](current/home-mobile.png) |
| Privacy mobile | [baseline](baseline/privacy-mobile.png) | [current](current/privacy-mobile.png) |
| Home slices | — | [boot](current/review/home2-0.png) · [registry](current/review/home2-900.png) · [ledger](current/review/home2-2900.png) · [data](current/review/home2-3900.png) · [phases](current/review/home2-4900.png) · [manifest](current/review/home2-5900.png) · [log](current/review/home2-6900.png) · [gate](current/review/home2-7900.png) · [colophon](current/review/home2-8900.png) |
| X kit | archived S-mark kit | [logo](../twitter/logo.png) · [banner](../twitter/banner.png) · [tweet card](../twitter/tweet-card.png) |

[Side-by-side baseline vs current (top 900 px)](current/review/compare-baseline-current.png)

Phase-4 visual review: the two designs share no layout signature. Navigation moved from a floating
bottom dock to a fixed top status bar, the first viewport from a split hero + stats board to a
command line + transaction console, the ground from white water to black, the accent from cobalt to
red, and the texture from rounded aqua slabs to ruled ledger rows.

## 4. Verification verdict

`node …/verify.mjs check --url http://127.0.0.1:4326/` → **PASS** (3 routes, content intact, skeleton
replaced, usability clean). Machine evidence: [VERIFICATION.md](VERIFICATION.md),
[verification.json](verification.json), [current/pages.json](current/pages.json).

| Gate | Result |
|---|---|
| Production build (Vite 6) | **PASS** — 0 errors |
| Source content contract | **PASS** — hash `c781e8f4d315…`, byte-for-byte identical to the frozen baseline; 0 removals, 0 count changes, 0 additive warnings |
| Rendered visible words | **PASS** — exactly 656 / 230 / 205 unique words (identical multisets) |
| Rendered attributes & forms | **PASS** — titles, placeholders, links and the `input[type=email]` field unchanged |
| Routes | **PASS** — all three HTTP 200, 0 console or page errors |
| DOM fingerprint similarity | **PASS** — 0.480 / 0.382 / 0.382 |
| Landmark sequence similarity | **PASS** — 0.500 (`header → nav → main → footer` vs `main → footer → nav`) |
| CSS class reuse | **PASS** — 0.000 / 0.018 / 0.018 |
| Accent distance | **PASS** — 130.98 ΔE (`#298dff` → `#ff3b30`) |
| Contrast | **PASS** — 0 failures across 296 / 49 / 51 text runs |
| Axe WCAG 2.x serious/critical | **PASS** — 0 serious, 0 critical on all routes |
| Mobile overflow at 390×844 | **PASS** — no horizontal scroll; 1440 and 390 both `scrollWidth === clientWidth` |
| Mobile navigation | **PASS** — rail hidden, legal glyphs visible, palette opens with 6 commands, Escape closes it |
| Keyboard focus visibility | **PASS** — mint 2 px rings on all sampled controls |
| Labels / accessible names / alt | **PASS** — 0 issues (no `<img>` on the site) |
| Static validator (`npm run validate`) | **PASS** — 17 checks, 0 failures (retargeted to `SysBar` + console scale) |
| Interaction smoke test | **PASS** — 27/27 checks, 0 console errors ([interaction-checks.json](current/interaction-checks.json)) |

One non-blocking warning was eliminated during the loop by restoring the baseline
`aria-label="Roadmap"` on the phase list; the final check run is clean.

## 5. Accessibility and responsive result

- Landmarks: `header` (banner) → `nav` → `main` → `footer` (contentinfo); one `h1` per route, logical
  `h2`/`h3`/`h4` order.
- Every icon-only control (legal glyphs, palette toggle, back-to-top) carries an accessible name; the
  palette keeps `aria-expanded` + `aria-controls` and closes on Escape.
- All form fields are labelled (`label for="email"`), the error state uses `aria-invalid`, and the
  receipt/reset branch is preserved.
- Focus: mint ring with 3 px offset; contrast verified, not assumed — ink `#eef6fb` on the void is
  ~18:1, dim `#a3b8c8` ~8:1, red-safe `#ff9b91` ≥ 7:1 on the deck; small red text never uses `#ff3b30`.
- Mobile is a genuine linear version: status bar, boot console, single-column module consoles,
  ruled registry, stacked facts and a one-column footer; nothing is hidden to avoid layout work.
- `prefers-reduced-motion` disables smooth scrolling, transitions and animations.
- No third-party fonts, no tracking, no images; route-level code splitting for `/privacy`, `/terms`
  and the 404 view.

## 6. Files changed

**Added**

- `src/styles/abyss.css` — Abyss tokens, reset, type, console grammar, status bar, colophon, motion.
- `src/components/SysBar.vue` — fixed status bar, route commands, legal glyphs, CTA and mobile palette.
- `src/components/Colophon.vue` — console footer (brand, socials, three index rows, risk notice, © line).
- `.reskin/` evidence — inventory, style selection, wireframe, baseline/current captures,
  `contract-diff.mjs`, `hash-route-server.mjs`, `interaction-console.mjs`, `verification.json`, this report.

**Rewritten**

- `src/App.vue` — `term` console shell; status bar / main / colophon / back-to-top.
- `src/main.js` — imports `abyss.css`; still removes the `no-js` marker.
- `src/components/Icon.vue` — CSS-masked glyphs (`<i class="glyph">` with a data-URI mask) instead of
  inline `<svg>/<path>`; the icon name set is unchanged.
- all nine `src/components/sections/*.vue` — new templates and scoped styles around the frozen tokens.
- `src/views/HomeView.vue`, `LegalView.vue`, `NotFoundView.vue`.
- `index.html` — dark `theme-color`, updated layout comment; meta/JSON-LD untouched.
- `public/assets/favicon.svg`, `og-cover.svg`, `og-cover.png` — console-palette mark and social card;
  the PNG is rendered from the SVG in headless Chrome at 1200×630.
- `scripts/validate.mjs` — retargeted to `abyss.css`, the `SysBar` toggle/rail pairing and the
  1180/980/820/760/640 scale; every original check kept.
- `README.md` (website + workspace) and `twitter/README.md`, `tweet.md`, `bio.md` — direction, asset
  sizes, design notes, alt text and verification status.
- X kit: `twitter/logo.svg`, `src/banner.html`, `src/tweet.html`, `src/logo.html`; `logo.png`,
  `banner.png`, `tweet-card.png` re-rendered from source.

**Removed from the project (moved, not deleted)**

- `src/components/TideDock.vue`, `src/components/TideFooter.vue` and `src/styles/tide.css` →
  `../.reskin-archive/round4-removed/` (plus the pre-reskin favicon/OG copies).
- The pre-clean reskin attempt and the earlier Tidal evidence → `.reskin-archive/`.

Application logic is untouched: `src/data/site.js` and `src/router/index.js` are byte-identical to
the post-rebrand baseline, and all handlers, computed values, form semantics and route paths remain.
Vue transition names `page`, `fade` and `drop` are retained because they are frozen `name`
attributes in the content contract; they generate framework classes only.

## 7. X / Twitter kit reskin

The kit was rebuilt to the same Abyss Liquidity direction rather than restyled with the old spectral
gradient:

| Asset | Change |
|---|---|
| `logo.png` / `logo.svg` (400×400, 110 KB) | black console field, red→magenta V monogram, magenta status dot, thin orbit ring, corner crosshairs; full-bleed so X's circular crop loses nothing |
| `banner.png` (1500×500, 195 KB) | fixed status bar with the V mark, VEILARY, six route commands and a red LAUNCH APP block; headline “Private payments, / invisible by design.”; `veilary://send` console; `$GHOST` / `veilary.xyz` footer clear of the avatar safe area |
| `tweet-card.png` (1200×675, 206 KB) | “Pay anyone. / Reveal nothing.” in white/red mono, a large V emblem, three numbered feature rows and the `$GHOST` / Solana footer |
| `bio.md` / `tweet.md` / `README.md` | Veilary name, handle, domain, 151-character bio, alt text updated to describe the new card, new palette/type/size notes |

All three PNGs are RGB, rendered at 2× and downsampled with Lanczos by `twitter/src/render.ps1`;
they were opened and visually checked. The copy is unchanged except for the brand name and the
image description, and the artwork contains no supply, price or allocation claims.

## 8. Known limitations

1. **Hash-route verification.** The app uses `createWebHashHistory`, so the verifier's
   `origin + /privacy` URLs need the verification-only 302 server (`.reskin/hash-route-server.mjs`,
   not shipped). Production URLs remain `/#/privacy` and `/#/terms`.
2. **Fixed status bar overlay.** The 52 px bar floats over the top of the page; `scroll-padding-top`
   and section `scroll-margin-top` keep anchors clear, and the boot console starts below it. Content
   scrolls under the bar by design.
3. **404 route is not in the verifier's route list** (the inventory only enumerates declared routes
   and `/` links). It is covered by the interaction test (`#/nope`) and the source contract.
4. **X kit is not gated by `verify.mjs`.** It lives outside the Vue project; it was verified by
   deterministic rendering at the exact pixel sizes plus visual inspection, and its copy was
   length-checked (bio 151, tweet 256, alt text 274 characters).
5. **Numeric tokens.** Dynamic values (counters, percentages, the copyright year) are compared as
   warnings by the verifier; none changed in this run.
6. **Asset provenance.** The social card and favicon are generated from hand-authored SVGs; the
   reference sites are used only for abstract palette/typography/shape cues, never for assets.

## 9. Reproduction

```bash
# from website/
npm run check                                   # validate + production build
node .reskin/hash-route-server.mjs dist 4326    # verification-only 302 server
node "<reskin-skill>/scripts/verify.mjs" check --project "$PWD" --out .reskin \
  --url http://127.0.0.1:4326/ --no-build
node .reskin/interaction-console.mjs            # 27/27 interaction checks

# from the repository root
powershell -NoProfile -ExecutionPolicy Bypass -File .\twitter\src\render.ps1
```
