# Reskin verification — PASS

Generated: 2026-10-21T17:36:56.931Z

- Project: **veilary-website**
- URL: http://127.0.0.1:4326/
- Original skeleton: `bento-canvas` (spatial)
- New skeleton: `terminal-console` (linear)
- Accent: #298dff -> #ff3b30 (130.98 ΔE; min 30)
- Source contract: intact (`c781e8f4d315`)

| Route | Result | DOM similarity | Landmark similarity | Axe serious | Screenshot |
|---|---|---:|---:|---:|---|
| `/` | PASS | 0.48 | 0.5 | 0 | [desktop](current/home-desktop.png) |
| `/privacy` | PASS | 0.382 | 0.5 | 0 | [desktop](current/privacy-desktop.png) |
| `/terms` | PASS | 0.382 | 0.5 | 0 | [desktop](current/terms-desktop.png) |

## Blocking issues

- None.

## Warnings

- None.

## Thresholds

- DOM fingerprint similarity <= 0.5
- Landmark sequence similarity <= 0.68
- CSS class overlap <= 0.1
- Accent distance >= 30 ΔE
- Contrast failures <= 0
- Axe serious/critical <= 0

All content is compared as a multiset of visible words plus rendered attribute values. Reordering is allowed, rewriting/removing/adding visible copy is not. Dynamic numeric values are reported as warnings, never silently accepted.
