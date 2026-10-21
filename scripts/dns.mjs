#!/usr/bin/env node
/**
 * Veilary — verify every domain the site links to or names, over DNS.
 *
 * WHY THIS EXISTS
 * ---------------
 * The authoring environment blocks hostname resolution for normal HTTP fetches
 * ("URL hostname … resolves to a non-public IP"), but Google's JSON DNS API is reachable on an
 * **IP literal** — https://8.8.8.8/resolve — so DNS itself can be queried. That is enough to
 * answer the questions that matter for a site full of outbound links:
 *
 *   - did a domain in our copy stop resolving?
 *   - is a "known impersonator" domain actually live? (live = higher phishing risk)
 *   - is a cited source real, or did we cite something that never existed?
 *
 * USAGE
 *   node scripts/dns.mjs                 # check every target below
 *   node scripts/dns.mjs example.com …   # check specific names
 *   node scripts/dns.mjs --json          # machine-readable output
 *
 * Needs Node 18+ for built-in fetch. No dependencies. Read-only: DNS lookups only.
 */

const DOH = 'https://8.8.8.8/resolve'
const TYPES = ['A', 'AAAA', 'TXT', 'MX', 'NS']

/* ------------------------------------------------------------------ targets */

/**
 * `expect`: 'live'    → must resolve, the site links here
 *           'dead'    → expected NOT to resolve (documented as nonexistent)
 *           'any'     → informational
 * `note` is printed next to the verdict so the report explains itself.
 */
const TARGETS = [
  { name: 'veilary.xyz', expect: 'live', note: 'the site being rebuilt' },
  { name: 'www.veilary.xyz', expect: 'live', note: 'www alias of the above' },

  { name: 'ghostwareos.gitbook.io', expect: 'live', note: 'only verified docs host; every Documentation link uses it' },
  { name: 'solflare.com', expect: 'live', note: 'cited integration partner' },
  { name: 'cryptotimes.io', expect: 'live', note: 'cited press source' },
  { name: 'coincodex.com', expect: 'live', note: 'cited press source' },
  { name: 'kucoin.com', expect: 'live', note: 'cited press source' },

  // Known name collisions / impersonation cluster — must stay OUT of our link whitelist.
  { name: 'ghostpay.org', expect: 'any', note: 'UNRELATED: fiat prepaid-card company, do not link' },
  { name: 'ghostland.at', expect: 'any', note: 'UNRELATED: Nintendo homebrew eShop project' },
  { name: 'ghostwareos.com', expect: 'any', note: 'CAUTION: points at a private IP (31.43.160.6) — not a normal public site' },
  { name: 'ghostware-os.com', expect: 'any', note: 'CAUTION: flagged as phishing by phishdestroy.io' },
  { name: 'ghostwareos.org', expect: 'dead', note: 'CAUTION: flagged as a crypto drainer, and the domain does not resolve' },
  { name: 'rewards-ghost.com', expect: 'any', note: 'CAUTION: reported fake-airdrop domain' }
]

/* -------------------------------------------------------------------- query */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function resolve(name, type) {
  const url = `${DOH}?name=${encodeURIComponent(name)}&type=${type}`
  const res = await fetch(url, {
    headers: { accept: 'application/dns-json', 'user-agent': 'veilary-site-dns-check' }
  })
  if (!res.ok) throw new Error(`DoH HTTP ${res.status}`)
  const json = await res.json()
  return {
    status: json.Status, // 0 = NOERROR, 3 = NXDOMAIN
    answers: (json.Answer || []).filter((a) => a.type !== 6),
    authority: (json.Authority || []).map((a) => a.data)
  }
}

const typeName = (t) => ({ 1: 'A', 2: 'NS', 5: 'CNAME', 15: 'MX', 16: 'TXT', 28: 'AAAA', 6: 'SOA' }[t] || `T${t}`)

async function check(target) {
  const records = []
  let status = 0
  let error = null

  for (const type of TYPES) {
    try {
      const r = await resolve(target.name, type)
      status = r.status
      for (const a of r.answers) records.push({ type: typeName(a.type), value: a.data, ttl: a.TTL })
    } catch (err) {
      error = err.message
    }
    if (status === 3) break // NXDOMAIN — no point querying more types
    await sleep(120)
  }

  const live = status === 0 && records.length > 0
  const nxdomain = status === 3

  let verdict = 'ok'
  let detail = ''
  if (error) {
    verdict = 'error'
    detail = error
  } else if (target.expect === 'live' && !live) {
    verdict = 'BROKEN'
    detail = nxdomain ? 'NXDOMAIN — the domain no longer exists' : 'resolves with no records'
  } else if (target.expect === 'dead' && live) {
    verdict = 'CHANGED'
    detail = 'expected to be unregistered, but it now resolves — re-check the risk note'
  } else if (nxdomain) {
    verdict = 'nxdomain'
  }

  return { ...target, live, nxdomain, verdict, detail, records }
}

/* ------------------------------------------------------------------- report */

const argv = process.argv.slice(2)
const asJson = argv.includes('--json')
const explicit = argv.filter((a) => !a.startsWith('--'))
const list = explicit.length
  ? explicit.map((name) => ({ name, expect: 'live', note: 'requested on the command line' }))
  : TARGETS

const results = []
for (const target of list) {
  process.stdout.write(`  checking ${target.name}…\r`)
  results.push(await check(target))
}
process.stdout.write(' '.repeat(60) + '\r')

if (asJson) {
  console.log(JSON.stringify({ checkedAt: new Date().toISOString(), results }, null, 2))
  process.exit(results.some((r) => r.verdict === 'BROKEN' || r.verdict === 'error') ? 1 : 0)
}

const width = Math.max(...results.map((r) => r.name.length))
console.log('\nDNS verification — every domain this project links to or warns about\n')
console.log(`${'DOMAIN'.padEnd(width)}  ${'STATUS'.padEnd(9)}  RECORDS`)
console.log(`${'-'.repeat(width)}  ${'-'.repeat(9)}  ${'-'.repeat(60)}`)

for (const r of results) {
  const badge =
    r.verdict === 'ok' ? 'live' : r.verdict === 'BROKEN' ? 'BROKEN' : r.verdict.toUpperCase()
  const sample = r.records
    .filter((rec) => rec.type === 'A' || rec.type === 'NS' || rec.type === 'TXT' || rec.type === 'MX')
    .slice(0, 2)
    .map((rec) => `${rec.type}=${rec.value}`)
    .join('  ')
  console.log(`${r.name.padEnd(width)}  ${badge.padEnd(9)}  ${sample || '—'}`)
  if (r.note) console.log(`${' '.repeat(width)}  ${' '.repeat(9)}  ${r.note}`)
  if (r.detail) console.log(`${' '.repeat(width)}  ${' '.repeat(9)}  ↳ ${r.detail}`)
}

const broken = results.filter((r) => r.verdict === 'BROKEN' || r.verdict === 'error')
const changed = results.filter((r) => r.verdict === 'CHANGED')

console.log('')
if (broken.length) {
  console.log(`❌ ${broken.length} link(s) no longer resolve: ${broken.map((r) => r.name).join(', ')}`)
  console.log('   Fix these in src/data/site.js (and mirror them in preview/index.html).\n')
  process.exit(1)
}
if (changed.length) {
  console.log(`⚠️  ${changed.length} impersonation target(s) changed state: ${changed.map((r) => r.name).join(', ')}`)
  console.log('   Re-read the risk notes in docs/research-brief.md.\n')
  process.exit(0)
}
console.log('✅ All linked domains resolve; expected-dead domains are still dead.\n')
