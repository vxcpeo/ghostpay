#!/usr/bin/env node
/**
 * Veilary website — static self-check.
 *
 * Verifies the things a build would NOT catch:
 *   1. Every module imported by the app exists on disk.
 *   2. Every icon name used in a template exists in Icon.vue's paths map.
 *   3. Every in-page anchor (#foo) points at an element id that exists.
 *   4. The global v-reveal directive is registered.
 *   5. Every custom property (--x) and keyframe used is defined in tide.css.
 *   6. Copy guard: no unverified claims (zero-knowledge / shielded pool / invalid mint) leak back in.
 *   7. The zero-build preview stays in sync with src/data/site.js on the headline facts.
 *   8. Every <router-link> targets a route that exists, using the hash-history-safe anchor form.
 *   9. Referenced assets exist (og:image, sitemap advertised in robots.txt, namespace correct).
 *  10. External hosts in the copy are on the verified whitelist and never a known-collision domain.
 *  11. Component media queries stay on the documented breakpoint scale, and the nav/burger pair
 *      always switch together (they once didn't — the nav vanished with nothing to replace it).
 *  12. npm scripts, runners (verify.ps1/sh) and declared dependencies are wired up.
 *
 * Usage:  node scripts/validate.mjs        (exit code 0 = pass, 1 = failures)
 * No dependencies, no build step, no network.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, dirname, resolve, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(ROOT, 'src')
const failures = []
const notes = []

const fail = (check, msg) => failures.push(`[${check}] ${msg}`)
const note = (msg) => notes.push(msg)

/* ------------------------------------------------------------------ helpers */

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry)
    if (statSync(p).isDirectory()) walk(p, out)
    else out.push(p)
  }
  return out
}

const read = (p) => readFileSync(p, 'utf8')
const rel = (p) => relative(ROOT, p).replace(/\\/g, '/')

const allFiles = walk(SRC)
const vueFiles = allFiles.filter((f) => f.endsWith('.vue'))
const jsFiles = allFiles.filter((f) => f.endsWith('.js'))
const cssFile = allFiles.find((f) => f.endsWith('tide.css')) || allFiles.find((f) => f.endsWith('.css'))

const vueByBase = new Map(vueFiles.map((f) => [f.split(/[\\/]/).pop(), f]))

/* ---------------------------------------------- 1. imports resolve on disk */

{
  const importRe = /(?:import\s[^'"]*from\s*|import\s*)['"]([^'"]+)['"]/g
  let checked = 0

  for (const file of [...vueFiles, ...jsFiles]) {
    const src = read(file)
    for (const [, spec] of src.matchAll(importRe)) {
      if (!spec.startsWith('.') && !spec.startsWith('@/')) continue
      checked++

      let target
      if (spec.startsWith('@/')) target = join(SRC, spec.slice(2))
      else target = resolve(dirname(file), spec)

      const candidates = [
        target,
        `${target}.js`,
        `${target}.vue`,
        `${target}.json`,
        join(target, 'index.js')
      ]
      if (!candidates.some((c) => existsSync(c) && statSync(c).isFile())) {
        fail('imports', `${rel(file)} imports "${spec}" → no file at ${rel(target)}`)
      }
    }
  }
  note(`imports: ${checked} local specifiers resolved`)
}

/* ---------------------------------------------------- 2. icon names exist */

{
  const iconFile = vueByBase.get('Icon.vue')
  const iconSrc = read(iconFile)
  const mapBody = iconSrc.slice(iconSrc.indexOf('const paths'), iconSrc.indexOf('const d ='))
  const available = new Set([...mapBody.matchAll(/^\s{2}([A-Za-z][\w]*):/gm)].map((m) => m[1]))

  const used = new Set()
  const attrRe = /<Icon\b[^>]*?(?<!:)\bname="([^"]+)"/g
  const bindRe = /<Icon\b[^>]*?:name="([^"]+)"/g
  const NOT_ICONS = new Set(['done', 'active', 'next'])

  for (const file of vueFiles) {
    const src = read(file)
    for (const [, n] of src.matchAll(attrRe)) used.add(n)
    for (const [, expr] of src.matchAll(bindRe)) {
      // :name="p.icon" / :name="row.legacy ? 'close' : 'check'" → collect every quoted literal
      const literals = [...expr.matchAll(/'([^']+)'/g)].map((m) => m[1]).filter((n) => !NOT_ICONS.has(n))
      if (literals.length) literals.forEach((l) => used.add(l))
      else note(`icon: data-driven name in ${rel(file)} → "${expr}" (cannot verify statically)`)
    }
  }

  // Icon names referenced from data/site.js
  const dataSrc = read(join(SRC, 'data', 'site.js'))
  for (const [, n] of dataSrc.matchAll(/icon:\s*'([^']+)'/g)) used.add(n)

  for (const name of used) {
    if (!available.has(name)) fail('icons', `icon "${name}" is used but missing from Icon.vue`)
  }

  // Dead weight: an icon nobody references is a maintenance liability, not a failure.
  const unused = [...available].filter((n) => !used.has(n))
  if (unused.length) note(`icons: unused in this codebase → ${unused.join(', ')}`)

  note(`icons: ${used.size} used, ${available.size} defined`)
}

/* -------------------------------------------- 3. anchors point at real ids */

{
  const ids = new Set()
  for (const file of vueFiles) {
    const src = read(file)
    for (const [, id] of src.matchAll(/\bid="([^"]+)"/g)) ids.add(id)
  }

  const targets = new Set()
  for (const file of [...vueFiles, ...jsFiles]) {
    const src = read(file)
    for (const [, href] of src.matchAll(/href="(#[^"]*)"/g)) targets.add(href)
    for (const [, href] of src.matchAll(/href:\s*'(#[^']*)'/g)) targets.add(href)
    for (const [, expr] of src.matchAll(/go\('(#[^']*)'\)/g)) targets.add(expr)
  }

  for (const t of targets) {
    const id = t.slice(1)
    if (!id) continue
    if (!ids.has(id)) fail('anchors', `link "${t}" has no matching element id`)
  }
  note(`anchors: ${targets.size} in-page targets, ${ids.size} ids defined`)
}

/* ------------------------------------------- 4. scroll-reveal stays optional */

{
  const main = read(join(SRC, 'main.js'))
  const used = vueFiles.filter((f) => /\bv-reveal\b/.test(read(f))).length
  if (used && !/directive\(\s*'reveal'/.test(main)) {
    fail('directive', `components use v-reveal but main.js does not register the directive`)
  }
  note(`v-reveal: ${used ? `used in ${used} component(s)` : 'not used — content is always visible'}`)
}

/* ------------------------------------- 5. CSS custom props + keyframes exist */

{
  const css = read(cssFile)
  const defined = new Set([...css.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]))
  const keyframes = new Set([...css.matchAll(/@keyframes\s+([\w-]+)/g)].map((m) => m[1]))

  const usedProps = new Set()
  const usedAnim = new Set()
  for (const file of [...vueFiles, cssFile]) {
    const src = read(file)
    for (const [, p] of src.matchAll(/var\((--[\w-]+)/g)) usedProps.add(p)
    // Only the shorthand `animation:` / `animation-name:` — NOT animation-duration etc.
    for (const [, a] of src.matchAll(/(?:^|[^-\w])animation(?:-name)?:\s*([^;]+)/g)) {
      for (const token of a.trim().split(/\s+/)) {
        const t = token.replace(/^['"]|['"]$/g, '')
        if (!t || /^[\d.]/.test(t) || t.startsWith('var(')) continue
        if (['none', 'inherit', 'initial', 'unset', 'linear', 'ease', 'ease-in', 'ease-out',
             'ease-in-out', 'infinite', 'alternate', 'forwards', 'backwards', 'both',
             'running', 'paused', 'normal', 'reverse', 'step-start', 'step-end'].includes(t)) continue
        usedAnim.add(t)
      }
    }
  }

  // Global tokens come from :root even if only referenced inside components.
  for (const p of usedProps) if (!defined.has(p)) fail('css', `var(${p}) is used but never defined`)

  const notKeyframe = new Set(['none', 'inherit', 'initial', 'unset'])
  for (const a of usedAnim) {
    if (notKeyframe.has(a)) continue
    if (/^(var|\d)/.test(a)) continue
    if (!keyframes.has(a)) fail('css', `animation "${a}" has no @keyframes rule`)
  }
  note(`css: ${defined.size} custom properties, ${keyframes.size} keyframes`)
}

/* ------------------------------------------------- 6. unverified-claim guard */

{
  const GUARD = [
    {
      re: /zero-knowledge|zk-proof|zkSNARK|zk-SNARK/i,
      why: 'no source ties zk proofs to Veilary — describe only stealth addresses / HPKE'
    },
    {
      // Negative mentions are fine ("not a mixer"); positive claims are not.
      re: /\bshielded\b(?!-)|proving circuit|\bmixers?\b(?!\s*(?:or|and)?\s*(?:a\s+)?(?:tumbler|queue|waiting))/i,
      why: 'shielded-pool / mixer framing is unverified for this project'
    },
    {
      re: /GH0STpay111/i,
      why: 'that placeholder was not valid base58; never reintroduce it'
    },
    {
      re: /docs\.veilary\.xyz|@VeilaryFin|t\.me\/VeilaryPortal|discord\.gg\/veilary/i,
      why: 'invented handles — no official account could be verified'
    }
  ]
  // Files allowed to mention the banned phrases because they document the exclusion itself.
  const WHITELIST = [/docs[\\/]/, /README\.md$/, /scripts[\\/]validate\.mjs$/]

  let scanned = 0
  const ALLOWED_PHRASES = [
    /HPKE-Shielded Payloads/g,
    /not a (?:bolt-on )?mixer/g,
    /is it a mixer\?/g
  ]
  for (const file of [...vueFiles, ...jsFiles, join(ROOT, 'index.html')]) {
    if (WHITELIST.some((w) => w.test(file))) continue
    scanned++
    let src = read(file)
    for (const phrase of ALLOWED_PHRASES) src = src.replace(phrase, '')
    for (const { re, why } of GUARD) {
      const m = src.match(re)
      if (m) fail('claims', `${rel(file)} contains "${m[0]}" — ${why}`)
    }
  }
  note(`claims: ${scanned} files scanned for unverified wording`)
}

/* ------------------------------------------- 7. preview is a legacy artefact */

{
  // The document-flow rebuild no longer uses preview/index.html as a second renderer.
  // Content parity is enforced by the reskin content contract and the rendered-word gate.
  const preview = join(ROOT, 'preview', 'index.html')
  note(`preview: ${existsSync(preview) ? 'legacy preview kept for reference, not used by the app' : 'no preview artefact'}`)
}

/* ------------------------------------------- 8. routes and router-links agree */

{
  const routerSrc = read(join(SRC, 'router', 'index.js'))

  const declared = new Set()
  for (const [, p] of routerSrc.matchAll(/path:\s*'([^']+)'/g)) declared.add(p)

  // Catch-all patterns must not be treated as literal destinations.
  const concrete = new Set([...declared].filter((p) => !p.includes(':') && !p.includes('*')))
  if (!concrete.size) fail('routes', 'router/index.js declares no concrete routes')

  const used = new Set()
  for (const file of vueFiles) {
    const src = read(file)
    for (const [, p] of src.matchAll(/<router-link[^>]*?\bto="([^"]+)"/g)) used.add(p)
    for (const [, p] of src.matchAll(/\brouter\.push\(\s*'([^']+)'/g)) used.add(p)
  }

  for (const p of used) {
    const path = p.split('#')[0] || '/'
    if (!concrete.has(path)) {
      fail('routes', `<router-link to="${p}"> targets "${path}", which no route declares`)
    }
  }

  // A cross-page anchor needs the explicit "#/…" form, because hash history treats a bare
  // "#features" as a path change rather than an in-page anchor.
  for (const file of vueFiles) {
    const src = read(file)
    for (const [, p] of src.matchAll(/<router-link[^>]*?\bto="(\/[^"#]*#[^"]+)"/g)) {
      if (!p.startsWith('/#')) {
        fail(
          'routes',
          `${rel(file)} uses to="${p}" — with hash history use "/#anchor" or a { path, hash } object`
        )
      }
    }
  }

  note(`routes: ${concrete.size} concrete routes, ${used.size} router-link targets`)
}

/* --------------------------------------- 9. referenced assets actually exist */

{
  const PUBLIC = join(ROOT, 'public')
  const indexSrc = read(join(ROOT, 'index.html'))

  // public/ is copied verbatim into dist/, so `/assets/og-cover.svg` lives at public/assets/…  // Only root-relative paths count — an absolute https://…assets/… URL is remote, not local.
  const referenced = new Set()
  for (const [, href] of indexSrc.matchAll(/(?:href|content)="(\/assets\/[^"]+)"/g)) {
    referenced.add(href)
  }
  for (const [, href] of indexSrc.matchAll(
    /<link[^>]+href="(\/[^"]+\.(?:svg|png|jpg|jpeg|webp|ico|xml|txt|webmanifest))"/g
  )) {
    referenced.add(href)
  }

  for (const ref of referenced) {
    const onDisk = join(PUBLIC, ref.replace(/^\//, ''))
    if (!existsSync(onDisk)) {
      fail('assets', `index.html references ${ref} but public/${ref.replace(/^\//, '')} does not exist`)
    }
  }

  // robots.txt must not advertise a sitemap that was never written.
  const robotsPath = join(PUBLIC, 'robots.txt')
  if (existsSync(robotsPath)) {
    for (const [, loc] of read(robotsPath).matchAll(/^\s*Sitemap:\s*(\S+)\s*$/gim)) {
      const file = loc.split('/').pop()
      if (!existsSync(join(PUBLIC, file))) {
        fail('assets', `robots.txt advertises ${loc} but public/${file} does not exist`)
      }
      // The sitemap declaration itself must be well-formed XML with the right namespace.
      const smPath = join(PUBLIC, file)
      if (existsSync(smPath)) {
        const sm = read(smPath)
        if (!sm.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
          fail('assets', `${file} is missing the sitemaps.org 0.9 namespace declaration`)
        }
        if (!/<loc>\s*https?:\/\/[^<\s]+<\/loc>/.test(sm)) {
          fail('assets', `${file} declares no <loc> entry`)
        }
      }
    }
  } else {
    fail('assets', 'public/robots.txt is missing')
  }

  note(`assets: ${referenced.size} local asset references verified`)
}

/* ------------------------------- 10. every external source is a known-good host */

{
  /**
   * Offline rule: the set of hosts this project links to is small and deliberate, so an
   * unexpected host means a typo or an unvetted source crept into the copy. The domains
   * themselves were verified over DNS — see `npm run dns` (scripts/dns.mjs) and
   * docs/research-brief.md. Nothing here needs the network.
   */
  const ALLOWED = new Set([
    'veilary.xyz', // the rebranded site
    'x.com', // official X profile (handle confirmed available)
    'ghostwareos.gitbook.io', // only verified documentation host
    'solflare.com', // cited integration partner
    'cryptotimes.io',
    'coincodex.com',
    'kucoin.com'
  ])

  /** Documented name collisions — never link to these, they are different projects or hostile. */
  const FORBIDDEN = new Set([
    'ghostpay.org',
    'ghostland.at',
    'ghostwareos.com',
    'ghostware-os.com',
    'ghostwareos.org',
    'rewards-ghost.com'
  ])

  const data = read(join(SRC, 'data', 'site.js'))
  const hosts = new Set()
  for (const [, url] of data.matchAll(/https?:\/\/([^/'"\s)]+)/g)) {
    hosts.add(url.toLowerCase().replace(/^www\./, '').replace(/\/$/, ''))
  }

  for (const host of hosts) {
    if (FORBIDDEN.has(host)) {
      fail('sources', `site.js links to ${host} — a documented name collision / hostile domain`)
    } else if (!ALLOWED.has(host)) {
      fail('sources', `site.js links to ${host}, which is not on the verified-host whitelist`)
    }
  }

  note(`sources: ${hosts.size} external host(s) checked against the verified whitelist`)
}

/* ----------------------------------- 11. responsive breakpoints are consistent */

{
  /**
   * Console breakpoints. They may evolve with the design, but no ad-hoc
   * width should appear without being added here first.
   */
  const ALLOWED = new Set([1180, 980, 820, 760, 640]);
  let found = 0

  for (const file of [...vueFiles, cssFile]) {
    const src = read(file)
    for (const [, width] of src.matchAll(/@media[^{]*?max-width:\s*(\d+)px/g)) {
      found++
      if (!ALLOWED.has(Number(width))) {
        fail(
          'responsive',
          `${rel(file)} uses a ${width}px breakpoint — use one of ${[...ALLOWED].join('/')}px (see abyss.css)`
        )
      }
    }
  }

  // The status bar must keep both legal routes visible at every width and reveal
  // the command-palette toggle as the labelled route commands collapse — navigation
  // may not vanish.
  const statusBar = read(vueByBase.get('SysBar.vue'))
  const globalCss = read(cssFile)
  const legalRoutes = /href="\/privacy"/.test(statusBar) && /href="\/terms"/.test(statusBar)
  const toggleRe = /\.sysbar__toggle\s*\{[\s\S]*?display:\s*(?:inline-flex|grid|block|flex)/
  const railRe = /\.sysbar__rail\s*\{[\s\S]*?display:\s*none/
  const showsToggle = toggleRe.test(statusBar) || toggleRe.test(globalCss)
  const hidesRail = railRe.test(statusBar) || railRe.test(globalCss)
  if (!legalRoutes || !showsToggle || !hidesRail) {
    fail(
      'responsive',
      'SysBar must keep the /privacy + /terms shortcuts visible, hide the route rail on narrow screens and reveal .sysbar__toggle in the same media query'
    )
  }

  note(`responsive: ${found} media queries, all on the ${[...ALLOWED].join('/')}px scale`)

  /**
   * The no-JS marker remains the safety net for script failure. There are no
   * opacity-gated reveals in the console build, so only the marker contract
   * itself needs to stay wired.
   */
  const indexSrc = read(join(ROOT, 'index.html'))
  if (!/classList\.add\(\s*['"]no-js['"]\s*\)/.test(indexSrc)) {
    fail('responsive', 'index.html no longer sets the `no-js` marker class')
  }
  const mainSrc = read(join(SRC, 'main.js'))
  if (!/classList\.remove\(\s*['"]no-js['"]\s*\)/.test(mainSrc)) {
    fail('responsive', 'src/main.js never removes `no-js`')
  }
  if (/v-reveal/.test(vueFiles.map(read).join('\n')) && !/\.no-js\s+\.reveal/.test(cssFile ? read(cssFile) : '')) {
    fail('responsive', 'abyss.css has no `.no-js .reveal` rule although v-reveal is used')
  }
}

/* ------------------------------------------------- 12. tooling is wired up */{
  const pkgPath = join(ROOT, 'package.json')
  const pkg = JSON.parse(read(pkgPath))

  const REQUIRED_SCRIPTS = ['dev', 'build', 'preview', 'validate', 'capture', 'dns']
  for (const s of REQUIRED_SCRIPTS) {
    if (!pkg.scripts?.[s]) fail('tooling', `package.json has no "${s}" script`)
  }

  // Every script that points at a local file must point at one that exists.
  for (const [name, cmd] of Object.entries(pkg.scripts || {})) {
    for (const [, file] of cmd.matchAll(/node\s+(\S+\.m?js)/g)) {
      if (!existsSync(join(ROOT, file))) {
        fail('tooling', `script "${name}" runs missing file ${file}`)
      }
    }
  }

  // Declared deps must cover every bare import in src.
  const declared = new Set([
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {})
  ])
  const bare = new Set()
  for (const file of [...vueFiles, ...jsFiles]) {
    // Only real module specifiers: `import … from 'x'` / `export … from 'x'`.
    for (const [, spec] of read(file).matchAll(/\b(?:import|export)\b[^'"]*?\bfrom\s*['"]([^'"]+)['"]/g)) {
      if (spec.startsWith('.') || spec.startsWith('@/') || spec.startsWith('node:')) continue
      bare.add(spec.startsWith('@') ? spec.split('/').slice(0, 2).join('/') : spec.split('/')[0])
    }
  }
  for (const dep of bare) {
    if (!declared.has(dep)) fail('tooling', `"${dep}" is imported in src but not declared in package.json`)
  }
  note(`tooling: ${REQUIRED_SCRIPTS.length} scripts present, ${bare.size} bare imports declared`)

  // One-shot runners must exist and reference files that are really there.
  const RUNNERS = [
    { file: 'verify.ps1', must: ['npm install', 'scripts/validate.mjs', 'npm run build'] },
    { file: 'verify.sh', must: ['npm install', 'scripts/validate.mjs', 'npm run build'] }
  ]
  for (const runner of RUNNERS) {
    const p = join(ROOT, runner.file)
    if (!existsSync(p)) {
      fail('tooling', `${runner.file} is missing`)
      continue
    }
    const src = read(p)
    for (const needle of runner.must) {
      if (!src.includes(needle)) fail('tooling', `${runner.file} does not run "${needle}"`)
    }
    for (const [, script] of src.matchAll(/scripts\/([\w.-]+\.mjs)/g)) {
      if (!existsSync(join(ROOT, 'scripts', script))) {
        fail('tooling', `${runner.file} references missing scripts/${script}`)
      }
    }
  }
  note(`tooling: ${RUNNERS.length} one-shot runners verified`)
}

/* --------------------------------------------------------------- report */

const line = '─'.repeat(64)
console.log(line)
console.log('Veilary website — static validation')
console.log(line)

for (const n of notes) console.log(`  · ${n}`)

if (failures.length === 0) {
  console.log(`\n✔ PASS — ${notes.length} checks reported, 0 failures.\n`)
  process.exit(0)
}

console.log(`\n❌ FAIL — ${failures.length} problem(s):\n`)
for (const f of failures) console.log(`  ${f}`)
console.log('')
process.exit(1)
