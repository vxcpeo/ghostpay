/**
 * Verification-only helper (not shipped): re-scan the project sources and diff
 * the content contract against the frozen baseline without starting a browser.
 *
 *   node .reskin/contract-diff.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const SKILL = process.env.RESKIN_DIR || path.join(process.env.USERPROFILE, '.dsh', 'skills', 'reskin');
const project = path.resolve(process.argv[2] || '.');
const inventory = await import(pathToFileURL(path.join(SKILL, 'scripts', 'inventory.mjs')).href);
const { analyzeProject, contractDiff } = inventory;
const { anchorAccent } = await import(pathToFileURL(path.join(SKILL, 'scripts', 'lib', 'compare.mjs')).href);

const current = await analyzeProject(project);
const baseline = JSON.parse(await fs.readFile(path.join(project, '.reskin', 'baseline', 'inventory.json'), 'utf8'));
const diff = contractDiff(baseline.contentContract, current.contentContract, { allowAdditions: true });

const promoted = [];
const warnings = [];
for (const warning of diff.warnings) {
  if (/^(visibleText|i18n|forms): (?:added|".*" count increased)/.test(warning)) promoted.push(warning);
  else warnings.push(warning);
}

console.log(`archetype: ${current.archetype.id} (${current.archetype.family})  [baseline ${baseline.archetype.id} (${baseline.archetype.family})]`);
console.log(`accent:    ${anchorAccent(current.palette, current)}  [baseline ${anchorAccent(baseline.palette, baseline)}]`);
console.log(`palette:   ${current.palette.slice(0, 10).map((c) => `${c.hex}(${c.count})`).join(' ')}`);
console.log(`classes:   ${current.classNames.length}`);
const oldClasses = new Set(baseline.classNames);
const overlap = current.classNames.filter((c) => oldClasses.has(c));
console.log(`class overlap with baseline: ${overlap.length}/${current.classNames.length} → ${overlap.slice(0, 20).join(', ')}`);
console.log('');
if (diff.issues.length) {
  console.log(`ISSUES (${diff.issues.length}):`);
  for (const issue of diff.issues) console.log('  - ' + issue);
} else {
  console.log('contract: no removals or count decreases');
}
if (promoted.length) {
  console.log(`\nBLOCKING ADDITIONS (${promoted.length}):`);
  for (const item of promoted) console.log('  + ' + item);
}
if (warnings.length) {
  console.log(`\nadditive warnings (${warnings.length}):`);
  for (const item of warnings.slice(0, 25)) console.log('  · ' + item);
}
process.exitCode = diff.issues.length || promoted.length ? 1 : 0;
