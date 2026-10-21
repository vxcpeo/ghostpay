import { createRequire } from 'node:module';
import path from 'node:path';
const require = createRequire(path.join(process.cwd(), '.reskin', 'tools', 'package.json'));
const { chromium } = require('playwright-core');
const b = await chromium.launch({ headless: true, executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
for (const w of [1280, 1180, 1024, 980, 900, 820, 768, 640, 560, 480, 390, 320]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
  const p = await ctx.newPage();
  await p.goto('http://127.0.0.1:4326/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(350);
  const m = await p.evaluate(() => {
    const dock = document.querySelector('.harbor__dock').getBoundingClientRect();
    const brand = document.querySelector('.harbor__brand').getBoundingClientRect();
    return {
      sw: document.documentElement.scrollWidth,
      cw: document.documentElement.clientWidth,
      dock: { x: Math.round(dock.x), w: Math.round(dock.width), right: Math.round(dock.right) },
      brandW: Math.round(brand.width),
      word: getComputedStyle(document.querySelector('.harbor__word')).display,
      toggle: getComputedStyle(document.querySelector('.harbor__toggle')).display,
      link: getComputedStyle(document.querySelector('.harbor__link')).display,
    };
  });
  console.log(w, JSON.stringify(m));
  await ctx.close();
}
await b.close();
