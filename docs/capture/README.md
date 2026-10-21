# Capture output

Empty until you run the capture script from a machine with working DNS:

```bash
cd website
npm run capture
```

It writes four kinds of file here:

| File | Contents |
| --- | --- |
| `homepage-<timestamp>.html` | The raw fetched page — keeps the evidence locally, so later checks never depend on re-fetching. |
| `page-<slug>.html` | Raw snapshots of every internal page the crawl followed (about, tokenomics, roadmap, faq, …). |
| `capture.json` | Every extracted fact: title, meta tags, headings, buttons, links, sections, stylesheets, scripts, hex palette, base58 mint candidates, social links, plus the crawled pages and the ranked colour palette from the site's own CSS. |
| `DIFF.md` | Field-by-field comparison of the live page against `src/data/site.js`, plus the original's headings, labels, real palette, CSS custom properties and inner-page copy. |

## Options

```bash
node scripts/capture.mjs                 # homepage + up to 6 internal pages + stylesheet palette
node scripts/capture.mjs --pages 12      # follow more inner pages
node scripts/capture.mjs --depth 0       # homepage only, no crawl
node scripts/capture.mjs --file site.html   # parse a saved/shared DOM dump instead of fetching
node scripts/capture.mjs --url http://localhost:8080   # against a local mirror
node scripts/capture.mjs --json          # machine-readable diff on stdout
```

## Why this is a manual step

The environment that generated this project could not resolve **any** hostname — `web_fetch`
rejected every named host with "resolves to a non-public IP", while IP literals such as
`https://1.1.1.1/cdn-cgi/trace` returned HTTP 200. DNS, not egress, is blocked there. So the site
was reconstructed from public research and every unverifiable value is labelled as a placeholder in
the UI.

Running the capture is the single action that turns this reconstruction into a verified one-to-one
copy. Start with the **"mint address matches the page"** row in `DIFF.md` — a wrong contract address
on a live page is a direct financial hazard.

## Actions after capture

1. Apply every ❌ row from `DIFF.md` to [`src/data/site.js`](../../src/data/site.js).
2. Mirror the same changes in [`preview/index.html`](../../preview/index.html) — the validator
   checks that the two stay in sync.
3. Replace the labelled placeholders (tokenomics supply/split/tax, social handles) with the real
   values and delete the corresponding notices.
4. Re-run `npm run validate && npm run build`.

Keep the captured HTML in version control: it is the evidence that the copy matches the original at
a point in time, which matters if the site later changes or disappears.
