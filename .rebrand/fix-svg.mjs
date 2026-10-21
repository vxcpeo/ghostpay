/**
 * Fix the generated SVG-named assets: assets.py wrote PNG bytes into
 * `favicon.svg` and `og-cover.svg`. This replaces them with a real vector
 * favicon and a valid SVG wrapper around the generated OG PNG, then mirrors
 * both into `public/assets/` so generated and target stay byte-identical.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const dir = path.resolve('.rebrand', 'generated', 'public', 'assets');
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" role="img" aria-label="Veilary mark">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#4da2ff"/>
      <stop offset="1" stop-color="#0b64cc"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="16" fill="url(#g)"/>
  <path d="M15 19.5 32 47l17-27.5" fill="none" stroke="#ffffff" stroke-width="6.4" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="51.5" cy="13" r="3.1" fill="#d9ecff"/>
</svg>
`;

const png = await fs.readFile(path.join(dir, 'og-cover.png'));
const b64 = png.toString('base64');
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="Veilary — private payments, invisible by design">
  <title>Veilary — private payments, invisible by design</title>
  <image width="1200" height="630" href="data:image/png;base64,${b64}"/>
</svg>
`;

await fs.writeFile(path.join(dir, 'favicon.svg'), favicon, 'utf8');
await fs.writeFile(path.join(dir, 'og-cover.svg'), ogSvg, 'utf8');
await fs.writeFile(path.resolve('public', 'assets', 'favicon.svg'), favicon, 'utf8');
await fs.writeFile(path.resolve('public', 'assets', 'og-cover.svg'), ogSvg, 'utf8');
console.log('wrote valid favicon.svg and og-cover.svg (generated + public)');
