# Reskin inventory — seclura-website

Generated: 2026-10-20T16:01:14.485Z

## Project

| Field | Value |
|---|---|
| Root | `E:/workspace/chuangye/solana/ghostpay/website` |
| Vue | ^3.5.13 |
| Package manager | npm |
| Nuxt | no |
| CSS frameworks | none detected |
| Files scanned | 20 (16 SFCs) |

## Original skeleton

- Archetype: **ticker-stage** (linear)
- Traits: cards, table, grid, charts, sticky, ticker
- Max template depth: 7
- Top-level tags: div, closingband, transition, div, footer, svg, section, section, section, section, section, section, section, section, section, div, article, section

The replacement skeleton must not be `ticker-stage` and must not be in the same family (`linear`).

## Routes

- `/`
- `/privacy`
- `/terms`

## Palette (most used first)

`#ffffff` (16) · `#0000ff` (5) · `#006b47` (2) · `#0a0b0d` (2) · `#7a4f00` (2) · `#e8f5ee` (2) · `#0000c8` (1) · `#171a1f` (1) · `#585c63` (1) · `#a3a3ff` (1)

## Content lock

- Static visible text tokens: **115**
- Binding expressions: **101**
- Event handlers: **21**
- Contract hash: `c2aacd4a908acc88a114506cee8c468a61f313a90a8f2e71503a19ae109b459e`

Everything in `.reskin/content-contract.json` is immutable: visible copy, placeholders, labels, routes, link targets, asset sources, bindings, handlers, API endpoints and i18n values. A reskin may move these tokens to new markup but may not rewrite, remove or hide them.

## Next

```bash
node scripts/choose-style.mjs --project "E:/workspace/chuangye/solana/ghostpay/website" --out .reskin
node scripts/verify.mjs baseline --project "E:/workspace/chuangye/solana/ghostpay/website" --out .reskin
```

Then rewrite the UI and run `verify.mjs check`.
