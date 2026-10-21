# Reskin verification — PASS

Generated: 2026-10-20T16:36:53.177Z

- Project: **seclura-website**
- URL: http://127.0.0.1:4326/
- Original skeleton: `ticker-stage` (linear)
- New skeleton: `bento-canvas` (spatial)
- Accent: #0000ff -> #298dff (83.88 ΔE; min 30)
- Source contract: intact (`c2aacd4a908a`)

| Route | Result | DOM similarity | Landmark similarity | Axe serious | Screenshot |
|---|---|---:|---:|---:|---|
| `/` | PASS | 0.306 | 0.667 | 0 | [desktop](current/home-desktop.png) |
| `/privacy` | PASS | 0.338 | 0.667 | 0 | [desktop](current/privacy-desktop.png) |
| `/terms` | PASS | 0.338 | 0.667 | 0 | [desktop](current/terms-desktop.png) |

## Blocking issues

- None.

## Warnings

- /: aria attribute changed/removed: aria-label=Back to top
- /: aria attribute added: aria-label=Core modules
- /: aria attribute added: aria-label=Privacy Policy
- /: aria attribute added: aria-label=Roadmap
- /: aria attribute added: aria-label=Terms of Use
- /: link target added: /privacy
- /: link target added: /terms
- /privacy: aria attribute added: aria-label=Privacy Policy
- /privacy: aria attribute added: aria-label=Terms of Use
- /privacy: link target added: /privacy
- /privacy: link target added: /terms
- /terms: aria attribute added: aria-label=Privacy Policy
- /terms: aria attribute added: aria-label=Terms of Use
- /terms: link target added: /privacy
- /terms: link target added: /terms

## Thresholds

- DOM fingerprint similarity <= 0.5
- Landmark sequence similarity <= 0.68
- CSS class overlap <= 0.1
- Accent distance >= 30 ΔE
- Contrast failures <= 0
- Axe serious/critical <= 0

All content is compared as a multiset of visible words plus rendered attribute values. Reordering is allowed, rewriting/removing/adding visible copy is not. Dynamic numeric values are reported as warnings, never silently accepted.
