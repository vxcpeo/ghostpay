/**
 * Rebrand pre-screen — NOT the official availability evidence.
 *
 * Queries the .xyz registry RDAP for each candidate domain and, when the domain
 * is unregistered, the live x.com profile page. The official evidence is still
 * produced afterwards by the rebrand skill's Chrome checker; this only narrows a
 * large name pool so we do not burn the Chrome/X rate limit on obviously taken
 * names.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const OUT = path.resolve('.rebrand', 'prescreen.json');
const names = [
  'veilary', 'veilene', 'veilani', 'veilona', 'veilith', 'veillith',
  'veilora', 'veilova', 'veiluna', 'veilina',
  'hushali', 'hushera', 'hushvara', 'hushara', 'hushira',
  'sealira', 'sealuna', 'sealvora', 'sealith',
  'quietal', 'quietara', 'quietis', 'quieta',
  'shrouvia', 'shrouden', 'shrouda',
  'cifrona', 'cifrena', 'cifrala', 'ciphera',
  'latebra', 'latebria', 'tacitra', 'tacenna', 'quiesca',
  'opacira', 'noctera', 'velmara', 'velmira', 'velnora',
  'silvane', 'noveria', 'ocaria', 'umbrina', 'solvane',
  'velmyra', 'settla', 'anonyma', 'obfusca', 'pera', 'adora',
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/155.0.0.0 Safari/537.36';

async function checkDomain(name) {
  const url = `https://rdap.centralnic.com/xyz/domain/${name}.xyz`;
  try {
    const r = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(15000) });
    if (r.status === 404) return { status: 'available', signal: 'rdap-404' };
    if (r.status === 200) return { status: 'taken', signal: 'rdap-200' };
    return { status: 'unknown', signal: `rdap-${r.status}` };
  } catch (e) {
    return { status: 'unknown', signal: `rdap-error: ${e.message}` };
  }
}

async function checkX(name) {
  try {
    const r = await fetch(`https://x.com/${name}`, {
      redirect: 'follow',
      signal: AbortSignal.timeout(20000),
      headers: { 'user-agent': UA, 'accept-language': 'en-US,en;q=0.9' },
    });
    const text = await r.text();
    const title = (text.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
    if (r.status === 404 || /User Profile Not Found|doesn.t exist/i.test(title)) {
      return { status: 'available', signal: `http-${r.status}-not-found`, title: title.slice(0, 80) };
    }
    if (/\(@/.test(title)) {
      return { status: 'taken', signal: `http-${r.status}-profile`, title: title.slice(0, 80) };
    }
    return { status: 'taken', signal: `http-${r.status}-ambiguous`, title: title.slice(0, 80) };
  } catch (e) {
    return { status: 'unknown', signal: `http-error: ${e.message}` };
  }
}

const results = [];
let xChecks = 0;
for (const name of names) {
  const domain = await checkDomain(name);
  const row = { name, domain };
  if (domain.status === 'available' && xChecks < 26) {
    await sleep(1200);
    row.x = await checkX(name);
    xChecks += 1;
  }
  results.push(row);
  console.log(`${name.padEnd(10)} domain=${domain.status.padEnd(9)} x=${row.x ? row.x.status.padEnd(9) + ' ' + (row.x.title || row.x.signal) : '-'}`);
  await sleep(350);
}

await fs.writeFile(OUT, JSON.stringify({ checkedAt: new Date().toISOString(), xChecks, results }, null, 2) + '\n', 'utf8');
const winners = results.filter((r) => r.domain.status === 'available' && r.x?.status === 'available');
console.log('\nBOTH FREE:', winners.map((w) => w.name).join(', ') || 'none');
console.log(`wrote ${OUT}`);
