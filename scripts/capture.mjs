#!/usr/bin/env node
/**
 * Veilary — capture the live veilary.xyz homepage and diff it against this build.
 *
 * WHY THIS EXISTS
 * ---------------
 * The agent that wrote this site could not reach the domain: its runtime rejects every named
 * host ("resolves to a non-public IP"), while IP literals work. So the site you have is a
 * reconstruction with clearly-labelled placeholders. Run this script from a machine with normal
 * DNS and it will fetch the real page, extract every fact that matters, and tell you exactly
 * which lines of src/data/site.js disagree with the original.
 *
 * USAGE
 *   node scripts/capture.mjs                      # fetch + extract + diff (writes docs/capture/)
 *   node scripts/capture.mjs --url http://localhost:8080   # against a local mirror
 *   node scripts/capture.mjs --file saved.html    # parse a page you already saved
 *   node scripts/capture.mjs --json               # machine-readable diff only
 *
 * Needs Node 18+ (built-in fetch). No dependencies, no install step.
 */

import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = join(ROOT, 'docs', 'capture')
const DEFAULT_URL = 'https://veilary.xyz/'

/* ------------------------------------------------------------------ args */

const argv = process.argv.slice(2)
const argOf = (name) => {
  const i = argv.indexOf(name)
  return i === -1 ? null : argv[i + 1]
}
const asJson = argv.includes('--json')
const url = argOf('--url') || DEFAULT_URL
const localFile = argOf('--file')
const depth = Number(argOf('--depth') ?? 1)
const subPages = Number(argOf('--pages') ?? 6)

/* ----------------------------------------------------------------- fetch */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/** Turn a URL into a filesystem-safe slug. */
const slug = (u) =>
  u
    .replace(/^https?:\/\//, '')
    .replace(/[^\w.-]+/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 80)

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'

async function fetchPage(target, { retries = 3 } = {}) {
  if (typeof fetch !== 'function') {
    throw new Error(
      `this script needs Node 18+ for built-in fetch (running ${process.version}). ` +
        'Upgrade Node, or save the page in a browser and re-run with --file <page.html>'
    )
  }

  const init = {
    redirect: 'follow',
    headers: {
      // Some origin servers (and every CDN bot rule) vary on these.
      'user-agent': UA,
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'accept-language': 'en-US,en;q=0.9',
      'cache-control': 'no-cache'
    }
  }

  let last
  for (let attempt = 1; attempt <= retries; attempt++) {
    last = await fetch(target, init)
    // 403/429/503 usually means a bot rule rather than a missing page — back off and retry.
    if (![403, 429, 503].includes(last.status) || attempt === retries) break
    const wait = 1200 * attempt
    console.log(`  HTTP ${last.status} — retrying in ${wait}ms (attempt ${attempt + 1}/${retries})`)
    await sleep(wait)
  }

  const body = await last.text()
  return {
    status: last.status,
    finalUrl: last.url,
    headers: Object.fromEntries(last.headers.entries()),
    body
  }
}

/* --------------------------------------------------------------- extract */

const decodeEntities = (s) =>
  s
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;|&rsquo;/gi, "'")
    .replace(/&mdash;/gi, '—')
    .replace(/&ndash;/gi, '–')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))

const clean = (s) =>
  decodeEntities(
    s
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  )
    .replace(/\s+/g, ' ')
    .trim()

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, 'i'))
  return m ? decodeEntities(m[1]).trim() : null
}

/** Internal page links worth crawling for verbatim copy (one level deep). */
function interestingLinks(html, baseUrl) {
  const host = (() => {
    try {
      return new URL(baseUrl).host
    } catch {
      return null
    }
  })()

  const KEYWORDS = /about|token|tokenomic|roadmap|how|feature|faq|whitepaper|doc|privacy|term|buy|ecosystem|technology|vision|contact/i
  const seen = new Set()
  const out = []

  for (const [tag] of html.matchAll(/<a\b[^>]*>/gi)) {
    const href = attr(tag, 'href')
    if (!href || href.startsWith('#') || /^(mailto|tel|javascript):/i.test(href)) continue
    let abs
    try {
      abs = new URL(href, baseUrl)
    } catch {
      continue
    }
    if (host && abs.host !== host) continue
    abs.hash = ''
    const key = abs.toString()
    if (seen.has(key) || key === baseUrl) continue
    if (!KEYWORDS.test(abs.pathname) && !KEYWORDS.test(abs.search)) continue
    seen.add(key)
    out.push(key)
    if (out.length >= 6) break
  }
  return out
}

/** Fetch up to `limit` stylesheets and return every colour literal found. */
async function collectStyles(html, baseUrl, limit = 3) {
  const urls = [...html.matchAll(/<link\b[^>]*>/gi)]
    .filter((m) => /stylesheet/i.test(m[0]))
    .map((m) => attr(m[0], 'href'))
    .filter(Boolean)
    .map((h) => {
      try {
        return new URL(h, baseUrl).toString()
      } catch {
        return null
      }
    })
    .filter(Boolean)
    .slice(0, limit)

  const inline = [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join('\n')
  const chunks = [inline]

  for (const url of urls) {
    try {
      const res = await fetch(url, { headers: { 'user-agent': UA } })
      if (res.ok) chunks.push(await res.text())
    } catch {
      /* a missing stylesheet must never fail the run */
    }
    await sleep(200)
  }

  const css = chunks.join('\n')
  const hex = css.match(/#[0-9a-f]{3,8}\b/gi) || []
  const rgb = css.match(/rgba?\([^)]+\)/gi) || []
  const vars = [...css.matchAll(/(--[\w-]+)\s*:\s*([^;}]+)/g)].map((m) => `${m[1]}: ${m[2].trim()}`)

  // Rank hex colours by frequency — the most-used ones are the brand palette.
  const tally = new Map()
  for (const c of hex.map((c) => c.toLowerCase())) tally.set(c, (tally.get(c) || 0) + 1)
  const ranked = [...tally.entries()].sort((a, b) => b[1] - a[1]).map(([c, n]) => ({ color: c, count: n }))

  return {
    stylesheetUrls: urls,
    topColors: ranked.slice(0, 20),
    rgbSamples: [...new Set(rgb)].slice(0, 20),
    cssVariables: [...new Set(vars)].slice(0, 80),
    bytesScanned: css.length
  }
}

function extract(html, baseUrl) {
  const meta = {}
  for (const [tag] of html.matchAll(/<meta\b[^>]*>/gi)) {
    const key = attr(tag, 'name') || attr(tag, 'property')
    const val = attr(tag, 'content')
    if (key && val) meta[key.toLowerCase()] = val
  }

  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)

  const headings = []
  for (const [tag, inner] of html.matchAll(/<(h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi)) {
    const text = clean(inner)
    if (text) headings.push({ level: tag.toLowerCase(), text })
  }

  const links = []
  for (const [tag] of html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/gi)) {
    const href = attr(tag, 'href')
    if (!href) continue
    const text = clean(tag.replace(/^<a\b[^>]*>/i, '').replace(/<\/a>$/i, ''))
    links.push({ text, href })
  }

  const buttons = [...html.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/gi)]
    .map((m) => clean(m[1]))
    .filter(Boolean)

  const sections = []
  for (const [tag] of html.matchAll(/<(?:section|div)\b[^>]*\bid\s*=\s*["']([^"']+)["'][^>]*>/gi)) {
    sections.push(attr(tag, 'id'))
  }

  const stylesheets = [...html.matchAll(/<link\b[^>]*>/gi)]
    .filter((m) => /stylesheet/i.test(m[0]))
    .map((m) => attr(m[0], 'href'))
    .filter(Boolean)

  const scripts = [...html.matchAll(/<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/gi)].map((m) => m[1])

  const inlineScriptBytes = [...html.matchAll(/<script\b(?![^>]*\bsrc)[^>]*>([\s\S]*?)<\/script>/gi)]
    .reduce((n, m) => n + m[1].length, 0)

  const bodyText = clean(html)
  const palette = [...new Set((html.match(/#[0-9a-f]{6}\b/gi) || []).map((c) => c.toLowerCase()))]

  // Candidate token mint addresses: base58 runs of 32-44 chars that are not obviously CSS/hex noise.
  const mints = [
    ...new Set(
      (html.match(/\b[1-9A-HJ-NP-Za-km-z]{32,44}\b/g) || []).filter(
        (s) => !/^[0-9a-f]+$/i.test(s) || s.length > 40
      )
    )
  ]

  const socials = links
    .filter((l) => /twitter\.com|x\.com|t\.me|telegram|discord|github|medium|reddit/i.test(l.href))
    .map((l) => l.href)

  return {
    fetchedAt: new Date().toISOString(),
    requestedUrl: baseUrl,
    title: title ? clean(title[1]) : null,
    meta,
    headings,
    buttons,
    links,
    socials: [...new Set(socials)],
    sections: [...new Set(sections)],
    stylesheets,
    scripts,
    inlineScriptBytes,
    palette,
    mints: [...new Set(mints)],
    bodyTextLength: bodyText.length,
    bodyTextSample: bodyText.slice(0, 1200)
  }
}

/* ------------------------------------------------- compare to this build */

function loadBuildFacts() {
  const site = readFileSync(join(ROOT, 'src', 'data', 'site.js'), 'utf8')
  const grab = (re, fallback = null) => {
    const m = site.match(re)
    return m ? m[1] : fallback
  }

  const strings = (key) => {
    const start = site.indexOf(`export const ${key} = [`)
    if (start === -1) return []
    const end = site.indexOf('\n]', start)
    const chunk = site.slice(start, end === -1 ? undefined : end)
    const out = []
    for (const [, v] of chunk.matchAll(/\b(?:title|label|q):\s*'([^']*)'/g)) out.push(v)
    return out
  }

  return {
    tagline: grab(/tagline:\s*'([^']*)'/),
    domain: grab(/domain:\s*'([^']*)'/),
    url: grab(/url:\s*'([^']*)'/),
    ticker: grab(/ticker:\s*'([^']*)'/),
    chain: grab(/chain:\s*'([^']*)'/),
    contract: grab(/contract:\s*'([^']*)'/),
    supply: grab(/supply:\s*'([^']*)'/),
    tax: grab(/tax:\s*'([^']*)'/),
    nav: strings('navLinks'),
    features: strings('features'),
    faqs: strings('faqs'),
    docs: grab(/docsUrl\s*=\s*'([^']*)'/)
  }
}

function buildDiff(cap, build) {
  const rows = []
  const norm = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
  const body = norm(cap.bodyTextSample)
  const allHeadings = cap.headings.map((h) => h.text)
  const headingBlob = norm(allHeadings.join(' | '))

  const check = (label, expected, found, note = '') => {
    const ok = expected ? (Array.isArray(found) ? found.includes(expected) : Boolean(found)) : false
    rows.push({ label, ours: expected, presentInCapture: ok, note })
  }

  check('tagline in a heading', build.tagline, allHeadings.includes(build.tagline))
  check('ticker appears on page', build.ticker, body.includes(norm(build.ticker)))
  check('chain named on page', build.chain, body.includes(norm(build.chain)))

  // The single most safety-critical field: the mint address.
  const contractOk = build.contract && cap.mints.includes(build.contract)
  rows.push({
    label: 'mint address matches the page',
    ours: build.contract,
    presentInCapture: Boolean(contractOk),
    note: contractOk
      ? 'verified against the live page'
      : cap.mints.length
        ? `page candidates: ${cap.mints.slice(0, 4).join(', ')}`
        : 'no base58 mint-like string found — check that the app loads it at runtime'
  })

  for (const nav of build.nav) {
    const ok = [...cap.links, ...cap.buttons].some((l) => norm(l.text) === norm(nav))
    rows.push({ label: `nav/CTA "${nav}"`, ours: nav, presentInCapture: ok, note: '' })
  }

  const missingHeadings = build.features.filter((f) => !headingBlob.includes(norm(f))).length
  rows.push({
    label: 'feature titles found in page headings',
    ours: `${build.features.length - missingHeadings}/${build.features.length}`,
    presentInCapture: missingHeadings === 0,
    note: missingHeadings ? `${missingHeadings} of our titles do not appear` : ''
  })

  rows.push({
    label: 'docs URL',
    ours: build.docs,
    presentInCapture: cap.links.some((l) => l.href && build.docs && l.href.includes(build.docs)),
    note: ''
  })

  return {
    summary: {
      compared: rows.length,
      matched: rows.filter((r) => r.presentInCapture).length,
      mismatched: rows.filter((r) => !r.presentInCapture).length
    },
    rows,
    capturedHeadings: allHeadings,
    capturedNavish: [...cap.links, ...cap.buttons].map((l) => l.text).filter(Boolean).slice(0, 60),
    capturedPalette: cap.palette.slice(0, 24),
    capturedSocials: cap.socials
  }
}

/* ------------------------------------------------------------------- run */

async function main() {
  let html
  let source

  if (localFile) {
    const p = resolve(process.cwd(), localFile)
    if (!existsSync(p)) throw new Error(`--file not found: ${p}`)
    html = readFileSync(p, 'utf8')
    source = { status: 200, finalUrl: `file://${p}`, headers: {} }
  } else {
    source = await fetchPage(url)
    html = source.body
  }

  const base = source.finalUrl || url
  const cap = extract(html, base)

  // Create the output directory up front — the crawl below writes page snapshots into it.
  mkdirSync(OUT_DIR, { recursive: true })

  // ---- follow internal links one level deep, for verbatim copy of inner pages
  let crawl = { pages: [], styles: null }
  if (!localFile && depth > 0) {
    const targets = interestingLinks(html, base).slice(0, subPages)
    if (targets.length) console.log(`Following ${targets.length} internal page(s)…`)

    for (const target of targets) {
      try {
        const res = await fetchPage(target, { retries: 2 })
        const page = extract(res.body, res.finalUrl || target)
        crawl.pages.push({
          url: target,
          status: res.status,
          title: page.title,
          metaDescription: page.meta.description || null,
          headings: page.headings,
          buttons: page.buttons,
          bodyText: page.bodyTextSample
        })
        writeFileSync(
          join(OUT_DIR, `page-${slug(target)}.html`),
          res.body,
          'utf8'
        )
        console.log(`  ✓ ${target} — ${page.headings.length} headings`)
      } catch (err) {
        crawl.pages.push({ url: target, status: 'error', error: err.message })
        console.log(`  ✗ ${target} — ${err.message}`)
      }
      await sleep(400)
    }

    // ---- pull the real palette from the site's own stylesheets
    try {
      crawl.styles = await collectStyles(html, base)
      console.log(
        `Styles: ${crawl.styles.stylesheetUrls.length} sheet(s), ` +
          `${crawl.styles.topColors.length} ranked colours, ${crawl.styles.cssVariables.length} CSS vars`
      )
    } catch (err) {
      console.log(`  styles skipped — ${err.message}`)
    }
  }

  const build = loadBuildFacts()
  const diff = buildDiff(cap, build)

  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  const htmlPath = join(OUT_DIR, `homepage-${stamp}.html`)
  const jsonPath = join(OUT_DIR, 'capture.json')
  const diffPath = join(OUT_DIR, 'DIFF.md')

  writeFileSync(htmlPath, html, 'utf8')
  writeFileSync(jsonPath, JSON.stringify({ source, cap, crawl, diff }, null, 2), 'utf8')

  const md = [
    '# Capture diff — live veilary.xyz vs this build',
    '',
    `- Source: \`${source.finalUrl || url}\` (HTTP ${source.status})`,
    `- Captured: ${cap.fetchedAt}`,
    `- Raw HTML: \`${htmlPath.split(/[\\/]/).slice(-2).join('/')}\` (${html.length.toLocaleString()} bytes)`,
    `- Result: **${diff.summary.matched}/${diff.summary.compared} checks match**`,
    '',
    '## Field-by-field',
    '',
    '| Check | Our value | Found on page | Note |',
    '| --- | --- | --- | --- |',
    ...diff.rows.map(
      (r) =>
        `| ${r.label} | \`${String(r.ours).replace(/\|/g, '\\|')}\` | ${r.presentInCapture ? '✅' : '❌'} | ${r.note || ''} |`
    ),
    '',
    '## Headings on the original page',
    '',
    ...(diff.capturedHeadings.length
      ? diff.capturedHeadings.map((h, i) => `${i + 1}. ${h}`)
      : ['_(none found — the page may render client-side; run with a saved DOM dump instead)_']),
    '',
    '## Link / button labels on the original page',
    '',
    ...(diff.capturedNavish.length ? diff.capturedNavish.map((t) => `- ${t}`) : ['_(none found)_']),
    '',
    '## Colours seen in the original markup',
    '',
    diff.capturedPalette.length ? diff.capturedPalette.map((c) => `\`${c}\``).join(' · ') : '_(none)_',
    '',
    '## Social links found',
    '',
    ...(diff.capturedSocials.length ? diff.capturedSocials.map((s) => `- ${s}`) : ['_(none — all handles in site.js stay placeholders)_']),
    '',
    '## Real design palette (from the site’s own stylesheets)',
    '',
    ...(crawl.styles?.topColors?.length
      ? [
          'Most-used colour literals, ranked by frequency — the top few are the brand palette:',
          '',
          '| Colour | Uses |',
          '| --- | --- |',
          ...crawl.styles.topColors.map((c) => `| \`${c.color}\` | ${c.count} |`)
        ]
      : ['_(no stylesheet colours captured)_']),
    '',
    ...(crawl.styles?.cssVariables?.length
      ? ['### CSS custom properties on the original', '', '```css', ...crawl.styles.cssVariables, '```']
      : []),
    '',
    '## Inner pages captured (verbatim source for other routes)',
    '',
    ...(crawl.pages.length
      ? crawl.pages.flatMap((p) => [
          `### ${p.url}${p.status === 'error' ? ' — ❌ ' + p.error : ` (HTTP ${p.status})`}`,
          '',
          p.title ? `- Title: ${p.title}` : '',
          p.metaDescription ? `- Meta: ${p.metaDescription}` : '',
          '',
          ...(p.headings?.length ? p.headings.map((h) => `- \`${h.level}\` ${h.text}`) : ['_(no headings)_']),
          '',
          ...(p.buttons?.length ? [`Buttons: ${p.buttons.map((b) => `\`${b}\``).join(', ')}`, ''] : []),
          ''
        ])
      : ['_(no inner pages were followed — run without `--file` to crawl, or pass `--pages N`)_']),
    '---',
    '',
    'Next step: apply the ❌ rows to `src/data/site.js` (and mirror them in `preview/index.html`),',
    'then run `npm run validate && npm run build`.',
    ''
  ].join('\n')

  writeFileSync(diffPath, md, 'utf8')

  if (asJson) {
    console.log(JSON.stringify(diff, null, 2))
    return
  }

  console.log(`\nCaptured ${source.finalUrl || url} (HTTP ${source.status})`)
  console.log(`  title:   ${cap.title || '(none)'}`)
  console.log(`  headings: ${cap.headings.length}   links: ${cap.links.length}   buttons: ${cap.buttons.length}`)
  console.log(`  mints seen: ${cap.mints.length}`)
  if (crawl.pages.length) console.log(`  inner pages: ${crawl.pages.filter((p) => p.status !== 'error').length}/${crawl.pages.length} captured`)
  if (crawl.styles) console.log(`  palette: ${crawl.styles.topColors.length} ranked colours`)
  console.log(`\n${diff.summary.matched}/${diff.summary.compared} checks match:`)
  for (const r of diff.rows) {
    console.log(`  ${r.presentInCapture ? '✅' : '❌'} ${r.label}${r.note ? ` — ${r.note}` : ''}`)
  }
  console.log(`\nWrote:\n  ${htmlPath}\n  ${jsonPath}\n  ${diffPath}\n`)
}

main().catch((err) => {
  console.error(`\n❌ capture failed: ${err.message}\n`)
  console.error('If DNS or TLS failed, try:  --file <saved-page.html>  after saving the page')
  console.error('from a normal browser (Ctrl+S, or "Copy outerHTML" in DevTools).\n')
  process.exit(1)
})
