# Reskin art direction — Tidal Sui

> Selected automatically. Do not ask the user to confirm or choose another direction.

- **Style DNA:** `sui-tidal` (clean-fintech)
- **Skeleton:** `gallery-scroll` (spatial)
- **Seed:** `07d4543a053bbf2a25076685c5891ccdbc2278bc4a0ee030235aa35d9789307f`
- **Source DNA:** [https://sui.io](https://sui.io)
- **Live sampled:** yes — https://sui.io (4110 ms)
- **Original:** ticker-stage / light / accent #0000ff

## Why this direction

The selector sampled 4/10 blockchain references, scored every direction for perceptual distance from the original accent (#0000ff) and background (#ffffff), added a deterministic seed jitter, and chose Tidal Sui because it is 77 ΔE away from the original accent and pairs with Gallery Scroll, a spatial skeleton rather than the original ticker-stage.

## Live reference sampling

| Style | URL | Result | Accent sampled | Ground sampled |
|---|---|---|---|---|
| base-cobalt | https://www.base.org | ok (1842 ms) | #0000ff | #dde3e9 |
| polygon-agora | https://polygon.technology | ok (2423 ms) | #670de5 | #000000 |
| solana-spectrum | https://solana.com | failed: timeout | — | — |
| ethereum-paper | https://ethereum.org | failed: timeout | — | — |
| aave-abyss | https://aave.com | failed: fetch failed | — | — |
| arbitrum-signal | https://arbitrum.io | failed: HTTP 403 | — | — |
| optimism-poster | https://www.optimism.io | failed: timeout | — | — |
| uniswap-bubblegum | https://uniswap.org | failed: timeout | — | — |
| cosmos-orbit | https://cosmos.network | ok (2999 ms) | #40b3ff | #000000 |
| sui-tidal | https://sui.io | ok (4110 ms) | #298dff | #ffffff |

Live sampling is evidence, not a copy target. Never download or reuse a reference site's logo, imagery, copy, or code. Use only the abstract tokens below.

## Candidate ranking

| Candidate | Score | Accent ΔE from original | Layout | Live |
|---|---:|---:|---|---|
| Tidal Sui | 0.8795 | 76.8 | gallery-scroll | yes |
| Abyss Liquidity | 0.8278 | 111.2 | orbital | no |
| Poster Optimism | 0.7977 | 149.7 | gallery-scroll | no |
| Cosmos Orbit | 0.7975 | 112.4 | orbital | yes |
| Paper Protocol | 0.7773 | 73.7 | gallery-scroll | no |
| Spectrum Terminal | 0.7589 | 90.1 | gallery-scroll | no |
| Bubblegum Exchange | 0.7456 | 113.7 | orbital | no |
| Signal Navy | 0.7435 | 120.4 | bento-canvas | no |
| Agora Violet | 0.6331 | 36.7 | documentary | yes |
| Cobalt Blueprint | 0.4834 | 0 | bento-canvas | yes |

## Skeleton brief

**Gallery Scroll** — full-viewport panels with generous negative space; horizontal scroll-snap for related panels; minimal floating dock navigation; each route is a sequence of framed scenes; large imagery/typography and very few borders.

Navigation: Floating dock at the bottom (icons + accessible names) and a vertical dot index for sections; no conventional header.

Structure:
1. opening panel with brand and route count
1. scene panels with snap points
1. horizontal data rail
1. closing panel with form/action
1. floating dock

Content mapping: Group each route's content into 2-4 scenes. Keep metrics as large typographic facts. Tables become horizontal snap rails with one record per panel on mobile. Forms become the closing scene.

Recipe: `.scene{min-height:100svh;display:grid;place-content:center;padding:clamp(24px,6vw,96px);scroll-snap-align:start}.rail{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:16px}.rail>*{scroll-snap-align:start;flex:0 0 min(86vw,520px)}.dock{position:fixed;bottom:18px;left:50%;translate:-50% 0;display:flex;gap:6px;border-radius:999px}`

Risks: full-viewport panels can hide content below the fold; provide visible scroll cues; horizontal rails need keyboard and touch support

## Design tokens

```css
:root {
  --bg: #ffffff;
  --surface: #FFFFFF;
  --surface-alt: #E8F3FF;
  --ink: #081B2B;
  --muted: #5B7185;
  --accent: #298dff;
  --accent-safe: #0d71e3;
  --accent-2: #4DA2FF;
  --line: #D8E7F5;
  --success: #087A55;
  --danger: #B42318;
  --warning: #8A5A00;

  --font-display: "Segoe UI Variable Display", "Segoe UI", "Helvetica Neue", sans-serif;
  --font-body: "Segoe UI", "Helvetica Neue", sans-serif;
  --font-mono: "Cascadia Mono", ui-monospace, monospace;
  --display-weight: 600;
  --display-tracking: -0.04em;
  --label-tracking: 0.06em;

  --radius-sm: 12px;
  --radius-md: 22px;
  --radius-lg: 36px;
  --border: 1px solid var(--line);
  --shadow: 0 24px 60px rgba(30, 111, 217, 0.1);

  --motion-duration: 260ms;
  --motion-ease: cubic-bezier(.22,1,.36,1);
  --space-1: clamp(4px, .35vw, 6px);
  --space-2: clamp(8px, .7vw, 12px);
  --space-3: clamp(14px, 1.2vw, 20px);
  --space-4: clamp(22px, 2vw, 32px);
  --space-5: clamp(36px, 3.4vw, 56px);
  --space-6: clamp(56px, 5vw, 88px);
  --page-pad: clamp(18px, 4vw, 64px);
  --max-width: 1440px;
}
```

## Component grammar

- Surface: 1px solid var(--line); radius 22px; shadow 0 24px 60px rgba(30, 111, 217, 0.1).
- Type: display **"Segoe UI Variable Display", "Segoe UI", "Helvetica Neue", sans-serif** at weight 600, tracking -0.04em; body **"Segoe UI", "Helvetica Neue", sans-serif**; numerals and micro-labels **"Cascadia Mono", ui-monospace, monospace**.
- Texture: tidal curves, soft caustics, aqua gradients, floating rounded panels.
- Motion: fluid, 260ms, cubic-bezier(.22,1,.36,1). Always wrap non-essential motion in `@media (prefers-reduced-motion: no-preference)`.
- Density: airy. Keep body text >= 14px and body contrast >= 4.5:1.
- Use `--accent-safe` for text and icons on `--bg`; use `--accent` for fills and large shapes.

## Originality guard

The replacement must satisfy all of these:

1. The source inventory archetype is `ticker-stage`; the new skeleton is `gallery-scroll`. Do not fall back to the old shell during implementation.
2. Do not reuse any original class name, CSS selector, design token name, or original accent family.
3. Rewrite templates, not only CSS. Every route must visibly use the new skeleton.
4. Keep every token in `.reskin/content-contract.json`; move it, never rewrite it.
5. Run `node scripts/verify.mjs check` and do not stop until content, structure, accessibility and responsive checks pass.

## Commit statement

Use this sentence in the final report: "The UI was rebuilt around Tidal Sui / Gallery Scroll; the original ticker-stage shell and palette were removed while the content contract stayed byte-for-byte intact."
