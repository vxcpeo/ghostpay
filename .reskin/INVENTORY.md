# Reskin inventory — veilary-website

Generated: 2026-10-21T17:03:50.305Z

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

- Archetype: **bento-canvas** (spatial)
- Traits: cards, table, grid, charts, sticky, bento, ticker, gallery
- Max template depth: 9
- Top-level tags: div, svg, div, footer, section, section, section, section, section, section, section, section, section, div, article, section

The replacement skeleton must not be `bento-canvas` and must not be in the same family (`spatial`).

## Routes

- `/`
- `/privacy`
- `/terms`

## Palette (most used first)

`#ffffff` (40) · `#298dff` (6) · `#b3d2ec` (3) · `#0b64cc` (2) · `#7cc0ff` (2) · `#a9c6dd` (2) · `#d8e7f5` (2) · `#eaf4ff` (2) · `#000000` (1) · `#04121f` (1)

## Content lock

- Static visible text tokens: **115**
- Binding expressions: **101**
- Event handlers: **21**
- Contract hash: `c781e8f4d3152655ddf7aca003646398e1aadf802c4e511f7d2316e2cb85cfe9`

Everything in `.reskin/content-contract.json` is immutable: visible copy, placeholders, labels, routes, link targets, asset sources, bindings, handlers, API endpoints and i18n values. A reskin may move these tokens to new markup but may not rewrite, remove or hide them.

## Next

```bash
node scripts/choose-style.mjs --project "E:/workspace/chuangye/solana/ghostpay/website" --out .reskin
node scripts/verify.mjs baseline --project "E:/workspace/chuangye/solana/ghostpay/website" --out .reskin
```

Then rewrite the UI and run `verify.mjs check`.
