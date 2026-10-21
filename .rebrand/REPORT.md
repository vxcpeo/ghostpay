# Rebrand report

> 摘要：已将 **Seclura** 更换为 **Veilary**（`veilary.xyz` / @veilary），验证结论：**通过**。

- Generated: 2026-10-22T01:00:59+08:00
- Project: `E:\workspace\chuangye\solana\ghostpay\website`
- Old brand: **Seclura**
- New brand: **Veilary**
- Domain: `veilary.xyz`
- X: `@veilary`
- Email: `hello@veilary.xyz`
- Verdict: **PASS**

## Gates

| Gate | Result | Detail |
|---|---|---|
| old_brand_source | PASS | 0 file hit(s), 0 path hit(s) |
| new_brand_presence | PASS | 5 surface(s) found: title, meta, canonical, package, readme |
| assets | PASS | 0 problem(s) |
| references | PASS | 4 checked, 0 problem(s) |
| build_test | PASS | test skipped: script not defined |
| availability | PASS | selected veilary via chrome-cdp |
| brand_registry | PASS | current Veilary; history 4 entries |
| browser | PASS | 2 screenshot(s), 0 problem(s) |

## Availability evidence

- Method: `chrome-cdp`
- Selected: `veilary`
- Evidence directory: `.rebrand/availability/`


## Brand registry

- File: `brand.txt`
- Current: `Veilary`
- History: GhostPay, Cifruna, Nummula, Seclura

## Changes

- Files changed: 42
- Replacements: 100
- Renames: 0
- Assets replaced: 3
- Backup: `E:/workspace/chuangye/solana/ghostpay/website/.rebrand/backup/20261022-005828`

## Build and test

| Check | Baseline | Current |
|---|---|---|
| build | True | True |
| test | True | True |

## Browser

- Routes: /
- Screenshots: `.rebrand/screenshots/`
- Baseline screenshots: `.rebrand/baseline/`

## Protected / residual

- **thirdParty**: `@vitejs/plugin-vue`, `amazon`, `angular`, `anthropic`, `apple`, `aws`, `bootstrap`, `cloudflare`, `deepseek`, `digitalocean`, `discord`, `django`, `docker`, `facebook`, `fastapi`, `figma`, `flask`, `github`, `gitlab`, `google`, `googleanalytics`, `googletagmanager`, `heroku`, `hotjar`, `instagram`, `intercom`, `javascript`, `jquery`, `kubernetes`, `laravel`

## Rollback

```bash
python "<skill>/scripts/rollback.py" --project "E:\workspace\chuangye\solana\ghostpay\website" --out "E:\workspace\chuangye\solana\ghostpay\website\.rebrand" --latest
```

Availability is a snapshot. This report does not register the domain or create the X account.

---

# Extended rebrand evidence — workspace surfaces

## 1. Identity

| Field | Before | After |
|---|---|---|
| Brand | Seclura | **Veilary** |
| Domain | `seclura.xyz` | `veilary.xyz` |
| X handle | `@seclura` | `@veilary` |
| Email | `hello@seclura.xyz` | `hello@veilary.xyz` |
| Package | `seclura-website` | `veilary-website` |
| Monogram | S-curve | **V** (geometric, red in the console palette) |

`brand.txt` (repository root and `website/brand.txt`, kept identical):

```text
history: GhostPay
history: Cifruna
history: Nummula
history: Seclura
current: Veilary
```

The previous four names are intentional historical entries; only `brandfile.py` writes the registry.
`apply.py` and `verify.py` skip its historical lines.

## 2. Naming and availability

- Keywords: `.rebrand/naming-keywords.json` — 20 real privacy/payment stems
  (`veilcraft`, `veilline`, `hushline`, `quietude`, `sealcraft`, `shroudline`, `cipherwork`,
  `concealment`, `seclusion`, `anonymity`, `obfuscation`, …).
- Candidate pool: `.rebrand/candidates.json` + `NAMING.md`; manual shortlist in
  `candidates.raw.txt`; wordmark review in `naming-preview.png`.
- Pre-screen (`prescreen.mjs`, domain RDAP + live x.com profile, not the official evidence): the
  names with both an unregistered `.xyz` and a 404 X profile were `veilary`, `veilene`, `veillith`,
  `hushera`, `hushvara`, `sealvora`, `shrouvia`, `shrouden`, `cifrona`.
- The official Chrome checker then selected the highest-scoring free name:

| Candidate | Score | `.xyz` | X | Verdict |
|---|---:|---|---|---|
| **veilary** | 96.0 | available — RDAP 404 (medium) | available — “Hmm...this page doesn’t exist” (404) | **pass** |
| veilene | 96.0 | available (pre-screen) | available (pre-screen) | fallback |
| veillith | 86.3 | available (pre-screen) | available (pre-screen) | fallback |
| hushera / hushvara / sealvora / shrouvia / shrouden | 90 / 86 / 86 / 86 / 86 | available (pre-screen) | available (pre-screen) | fallback |
| veilora / cipher / hushara / shrouda / veilova / veiluna | 96–90 | taken or X taken | — | fail |

Evidence: `CHECK.md`, `availability.json`, and the retained Chrome screenshots
`availability/veilary-xyz-rdap.png` and `availability/veilary-x.png`. The domain result is
**medium confidence**: the .xyz registry RDAP says unregistered, but the registrar pages were
bot-blocked, so premium/reserved status is not ruled out. Neither the domain nor the handle is
registered — availability is a snapshot.

## 3. Applied changes

| Item | Value |
|---|---|
| Files changed (automatic) | 42 |
| Text replacements | 100 |
| Renamed files | 0 |
| Assets regenerated | 3 (`favicon.svg`, `og-cover.svg`, `og-cover.png`) |
| Backup | `.reskin-archive/rebrand-backups/veilary-run-20261022/backup/20261022-005828` |
| Extended surfaces | 9 files, 43 replacements (root `README.md`, `twitter/README.md`, `bio.md`, `tweet.md`, `logo.svg`, `src/banner.html`, `src/tweet.html`, `src/logo.html`, `src/render.ps1`) |
| Extended backup | same archive tree, `backup/extended/` |

Manual follow-ups beyond the automatic plan:

- `src/components/Icon.vue` — the old S-curve path was replaced with a geometric V monogram
  (`M4.7 5.1L12 18.5l7.3-13.4 …`), and the icon key/name moved from `seclura` to `veilary`.
- `public/assets/favicon.svg` and `og-cover.svg` — `assets.py` writes raster data into `.svg`
  paths for favicon/OG kinds; a valid 64×64 vector favicon was authored and the OG SVG was made
  parseable, so the `assets` gate passes. Both were superseded by the reskin assets below.
- `twitter/logo.svg`, `banner.png`, `tweet-card.png` — new V monogram artwork; the PNGs were
  re-rendered with `twitter/src/render.ps1`.
- Root `README.md` — workspace index, brand section, evidence links, rollback instructions.
- `website/brand.txt` and root `brand.txt` — identical Veilary registry (backup
  `backup/brandfile-20261022-005643.txt`).

## 4. Gates

`verify.py --browser` exit 0 (machine copy: `verification.json`). `REPORT.md` gate table above:
old_brand_source, new_brand_presence, assets, references, build_test, availability,
brand_registry and browser all **PASS**. Production build passes; `npm run validate` passes all
17 checks; the browser capture at 1440×900 and 390×844 reports 0 old-brand hits, 0 console errors,
0 page errors and 0 failed requests.

## 5. Protected / residual

- **Preserved third party:** GhostWareOS / GhostSwap / GhostOS / DarkRelay names and their GitBook
  links, `$GHOST`, the SPL mint `BBKPiLM9…BGHST`, Vue/Vite/npm dependencies, and all license text.
- **Historical provenance:** `website/docs/*.md`, both `research-log-*.md`, `.reskin-archive/` and
  `website/.reskin/` retain old names/URLs on purpose; they are evidence, not shipping surfaces.
- **Availability risk:** both `veilary.xyz` and `@veilary` are unregistered; the domain check is
  medium-confidence (premium/reserved status not ruled out). Trademark clearance was out of scope.
- **Assets superseded:** the rebrand-only favicon/OG and the initial X-kit artwork were replaced
  immediately afterwards by the Abyss Liquidity / Terminal Console reskin; the current assets are
  documented in `../.reskin/REPORT.md`.
- **Line endings/encoding:** the apply pass preserved each file's encoding and BOM; `index.html`
  em dashes were already correct before this run.

## 6. Rollback

The backup tree was moved outside the Vue project on purpose (so the reskin inventory does not scan
pre-rebrand `.vue` sources). Restore from:

`E:/workspace/chuangye/solana/ghostpay/.reskin-archive/rebrand-backups/veilary-run-20261022/backup/20261022-005828`

```powershell
$backup = 'E:\workspace\chuangye\solana\ghostpay\.reskin-archive\rebrand-backups\veilary-run-20261022\backup\20261022-005828'
Copy-Item -Path (Join-Path $backup '*') -Destination 'E:\workspace\chuangye\solana\ghostpay\website' -Recurse -Force
```

Then restore the extended surfaces from `backup/extended/` (`root-brand.txt` → `brand.txt`,
`root-README.md` → `README.md`, `twitter-*` → `twitter/`) and rebuild. The raw skill command is in
`ROLLBACK.md`; it requires the backup tree to be copied back under `website/.rebrand/backup/` first.

## 7. Deliverables

| Item | Path |
|---|---|
| This report | `website/.rebrand/REPORT.md` |
| Machine gates | `website/.rebrand/verification.json` |
| Inventory / protected list | `INVENTORY.md`, `inventory.json` |
| Naming + pre-screen | `NAMING.md`, `naming-keywords.json`, `candidates.json`, `prescreen.mjs`, `naming-preview.png` |
| Chrome availability | `CHECK.md`, `availability.json`, `availability/` |
| Apply plan / manifest | `APPLY.md`, `plan.json`, `manifest.json` |
| Assets | `generated/`, `ASSETS.md` |
| Screenshots | `baseline/`, `screenshots/` |
| Rollback | `ROLLBACK.md` |


