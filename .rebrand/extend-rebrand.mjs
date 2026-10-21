/**
 * Rebrand extension pass — root README + the X kit, outside the Vue project root.
 * Text-only name/domain/handle replacement; byte-for-byte backups were copied to
 * .rebrand/backup/extended/ before this ran.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const files = [
  '../README.md',
  '../twitter/README.md',
  '../twitter/bio.md',
  '../twitter/tweet.md',
  '../twitter/logo.svg',
  '../twitter/src/banner.html',
  '../twitter/src/tweet.html',
  '../twitter/src/logo.html',
  '../twitter/src/render.ps1',
];

const mapping = [
  ['Seclura', 'Veilary'],
  ['seclura', 'veilary'],
  ['SECLURA', 'VEILARY'],
];

const report = [];
for (const rel of files) {
  const file = path.resolve(rel);
  const before = await fs.readFile(file, 'utf8');
  let after = before;
  let count = 0;
  for (const [from, to] of mapping) {
    const parts = after.split(from);
    count += parts.length - 1;
    after = parts.join(to);
  }
  if (count) await fs.writeFile(file, after, 'utf8');
  const leftover = (after.match(/seclura/gi) || []).length;
  report.push({ file: rel, replacements: count, leftover });
  console.log(`${rel.padEnd(34)} replacements=${String(count).padStart(3)} leftover=${leftover}`);
}
const total = report.reduce((n, r) => n + r.replacements, 0);
const leftovers = report.reduce((n, r) => n + r.leftover, 0);
console.log(`\ntotal replacements=${total} leftover=${leftovers}`);
if (leftovers) process.exitCode = 1;
