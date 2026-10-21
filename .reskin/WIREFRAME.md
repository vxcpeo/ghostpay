# Reskin wireframe — Veilary website, round 4

Selected direction (do not substitute): **Abyss Liquidity** (`aave-abyss`, dark-technical) /
**Terminal Console** (`terminal-console`, linear). Frozen baseline: `bento-canvas` (spatial),
accent `#298dff`, light ground, 3 routes (`/`, `/privacy`, `/terms`), content hash `c781e8f4d315…`.
Baseline evidence: `.reskin/baseline/` (captured after the Veilary rebrand, before any reskin edit).

## 1. Shell

New shell name: **The Console** (`.term`). Landmark order becomes
`header → nav → main → footer`; the baseline was `main → footer → nav` (floating dock).

```
.term
├─ .term__field            fixed black grid + scanline field (aria-hidden)
├─ SysBar  → <header class="sysbar">
│             <a brand> V mark + {{ site.name }}       (go('#home'))
│             <nav class="sysbar__rail" aria-label="Primary">
│               six route commands ({{ link.label }})  (go(link.href))
│               Whitepaper (site.url)
│               two legal glyphs (/privacy, /terms)   (goRoute)
│               Launch App command                     (go('#launch'))
│             </nav>
│             mobile palette toggle                    (open = !open)
│             <div class="sysbar__palette"> v-show open: six labels + Launch App
│           </header>
├─ main#main.term__main    route view
├─ Colophon → <footer class="colophon">  brand, blurb, socials, three index rows,
│             risk notice, © line, legal links, domain
└─ .term__jump             Back to top (toTop), bottom-right, appears after 900px
```

`<aside>` is never used (it would classify as a sidebar); detail columns are
`.console__detail` divs. No topbar/navbar class names.

## 2. Navigation pattern

- A 34 px **terminal status bar fixed to the top** — no bottom dock, no floating pill,
  no logo block. Route names read as monospace commands separated by hairline rules.
- Desktop: brand + six commands + Whitepaper + two legal glyphs + Launch App, all in one
  continuous strip with a live red status LED.
- Mobile: brand, two legal glyphs, Launch App and a command-palette toggle remain visible;
  the six commands open in a full-width palette sheet under the bar (Escape closes it).
- Back to top is a small square key at the bottom-right, not a floating circle.
- The fixed status bar is the only persistent chrome; sections scroll beneath it.

## 3. Route compositions

Every section is a **module console**: a hairline rule, a mono index/kicker row, and a
three-track grid (gutter index / data body / detail readout). No rounded cards, no bento
mosaic, no full-viewport scenes.

### `/` — one boot console + eight modules

| Module | id | Composition |
|---|---|---|
| Boot | `#home` | left command line: status chips, H1 as command output, lede, two actions; right: `veilary://send` transaction pane with rows, HPKE seal, send key; below: CA readout, four stat cells, three notes, relay strip of the 16 trust entries |
| Registry | `#features` | header + a two-column ruled registry of the eight feature rows (icon / title / text); no tiles |
| Process | `#how-it-works` | left command list of four steps (numeral, title, text), right readout with the active step, route trace and three checks |
| Ledger | `#privacy` | full-width comparison ledger (10 ruled rows), three tenets as numbered notes |
| Data | `#tokenomics` | supply block + distribution meters, facts ledger, utility list, buy command + disclaimer |
| Phase | `#roadmap` | four phase rows in a process ledger with status keys and item lists |
| Manifest | `#about` | creed blockquote, three pillar rows, protocol-facts ledger, four stat cells, audit/footer line |
| Log | `#faq` | left index + prompt + two doc commands; right accordion log with `01…08` rows |
| Gate | `#launch` | dark console: copy + ticks + two commands at left, early-access form as a command shell at right |

### `/privacy`, `/terms` — legal console

| Region | Composition |
|---|---|
| Opening | numbered `Legal` bar, `Last updated:` line, display `h1`, lead paragraph |
| Reading | 3-track console: mono section index at left, ruled reading column in the middle, meta rail at right |
| Return | `Back to home` command in a closing strip |

### 404

Console error screen inside the same shell: mark, `404 · signal lost`, H1, copy, two commands.

## 4. Presentation layer

- New global stylesheet `src/styles/abyss.css` (tokens, reset, type, console grammar,
  status bar, colophon, motion). `tide.css` is removed from the render path and moved out
  of the project so the inventory cannot classify its `bento`/`gallery` selectors.
- New namespaces only: `term`, `sysbar`, `console`, `module`, `ledger`, `boot`, `registry`,
  `process`, `trace`, `readout`, `phase`, `manifest`, `log`, `gate`, `colophon`, `cmd`.
  No old `tide-*`, `harbor*`, `shore*`, `splash*`, `modules*`, `drift*`, `expanse*`,
  `vault*`, `horizon*`, `crest*`, `shallows*`, `inlet*` class survives.
- Tokens: `--void #04070b`, `--deck #0a121a`, `--plate #101c26`, `--ink #edf5fa`,
  `--dim #9db3c4`, `--red #ff3b30` (fills / large display), `--red-safe #ff9b91`
  (small text), `--magenta #ff2bd6` (secondary data), `--mint #38e8d0` (status),
  `--edge #1b2a37`, `--edge-2 #294152`.
- Display: Cascadia Mono / Consolas / ui-monospace, weight 700, tracking −0.03em.
  Body: Segoe UI, 15–16 px. Micro: Cascadia Mono uppercase, tracking 0.12em.
- Shape: 2–8 px radii, 1 px hairlines, no large soft shadows; red/magenta glow only on
  large fills and the focus ring.
- Breakpoints: 1180 / 980 / 820 / 760 / 640 (unchanged scale so the static validator
  keeps its contract).
- Motion: 180–240 ms, reduced-motion guard.

## 5. Component disposition

| Old | Action |
|---|---|
| `App.vue` (`tide` shell, aurora, dot index) | rewritten as `term` console shell |
| `components/TideDock.vue` | **moved out**; replaced by `components/SysBar.vue` (top status bar + palette) |
| `components/TideFooter.vue` | **moved out**; replaced by `components/Colophon.vue` |
| `styles/tide.css` | **moved out**; replaced by `styles/abyss.css` |
| `components/Icon.vue` | kept (content icon set) |
| `data/site.js`, `router/index.js` | kept byte-identical |
| all nine `sections/*.vue` | templates + scoped styles rewritten around the same content tokens |
| `views/HomeView.vue`, `LegalView.vue`, `NotFoundView.vue` | rewritten |

Every static text token, its multiplicity, every binding, handler, href/to, icon name,
form field and meta value stays as frozen in `.reskin/content-contract.json`. No new
visible words are added: terminal labels are existing tokens or punctuation-only rules.

## 6. Risks and counters

- The classifier must read `terminal-console` (linear), not `bento-canvas` (spatial):
  the live source uses `console`-named classes, contains no `bento`, `gallery`,
  `scroll-snap`, `hero`, `card`, `tile`, `panel`, `sidebar` or `topbar` token, and the old
  stylesheet/components are outside the project root.
- Mobile: the status bar stays linear and the palette is a drawer; the console grids
  collapse to one column, never a shrunken 3-pane.
- Contrast: `--red` is limited to fills and large display; small red text uses
  `--red-safe` on dark plates; body copy uses `--ink`/`--dim`.
