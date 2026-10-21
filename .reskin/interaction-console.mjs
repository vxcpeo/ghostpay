/**
 * Verification-only interaction smoke test for the reskinned Veilary console.
 * Not part of the app; never shipped.
 */
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(path.join(process.cwd(), '.reskin', 'tools', 'package.json'));
const { chromium } = require('playwright-core');
const exe = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = 'http://127.0.0.1:4326/';
const results = [];
const check = (name, ok, detail) => results.push({ name, ok: Boolean(ok), detail });

const browser = await chromium.launch({ headless: true, executablePath: fs.existsSync(exe) ? exe : undefined });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  permissions: ['clipboard-read', 'clipboard-write'],
});
const page = await context.newPage();
const consoleErrors = [];
page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
page.on('pageerror', (e) => consoleErrors.push('pageerror: ' + e.message));

// 1. Home structure
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
check('single h1 on home', (await page.locator('h1').count()) === 1, await page.locator('h1').first().innerText());
check('home title', (await page.title()).includes('Veilary'), await page.title());
const barBox = await page.locator('.sysbar').boundingBox();
check('status bar is fixed at the top', Boolean(barBox) && barBox.y <= 2 && barBox.height >= 44, JSON.stringify(barBox));
check('masked icon glyphs render', (await page.locator('i.glyph').count()) > 10, `${await page.locator('i.glyph').count()} glyphs`);
check('no retired shell classes', (await page.evaluate(() => document.querySelectorAll('.tide, .harbor, .shore, .splash, .tide-bento').length)) === 0, 'none');

// 2. Status-bar route commands
await page.locator('.sysbar__cmd', { hasText: 'Features' }).click();
await page.waitForTimeout(900);
const anchor = await page.evaluate(() => ({ y: Math.round(window.scrollY), top: Math.round(document.querySelector('#features').getBoundingClientRect().top) }));
check('status-bar command scrolls to features', anchor.y > 100 && Math.abs(anchor.top) < 90, JSON.stringify(anchor));
check('status bar stays visible after scroll', await page.locator('.sysbar').isVisible(), 'visible');

// 3. Primary CTA scrolls to the closing gate
await page.locator('.sysbar__launch').click();
await page.waitForTimeout(1200);
const launch = await page.evaluate(() => ({
  y: Math.round(window.scrollY),
  top: Math.round(document.querySelector('#launch').getBoundingClientRect().top),
  view: window.innerHeight,
}));
check('launch command reaches #launch', launch.y > 5000 && launch.top < launch.view - 120, JSON.stringify(launch));

// 4. Back to top
check('back-to-top appears after scrolling', await page.locator('.term__jump').isVisible(), 'visible');
await page.locator('.term__jump').click();
await page.waitForTimeout(1400);
check('back-to-top returns to the boot console', await page.evaluate(() => window.scrollY) < 120, String(await page.evaluate(() => window.scrollY)));

// 5. Copy-to-clipboard readout
await page.locator('.readout').click();
await page.waitForTimeout(250);
check('mint readout reports copied', /Copied/i.test(await page.locator('.readout').innerText()), (await page.locator('.readout').innerText()).replace(/\s+/g, ' '));

// 6. FAQ accordion opens and closes
const q4 = page.locator('.log__trigger').nth(3);
await q4.scrollIntoViewIfNeeded();
await q4.click();
await page.waitForTimeout(450);
const answerH = await page.locator('.log__answer').nth(3).evaluate((el) => Math.round(el.getBoundingClientRect().height));
check('faq opens and reports state', (await q4.getAttribute('aria-expanded')) === 'true' && answerH > 30, `${await q4.getAttribute('aria-expanded')} / ${answerH}px`);
await q4.click();
await page.waitForTimeout(450);
const closedH = await page.locator('.log__answer').nth(3).evaluate((el) => Math.round(el.getBoundingClientRect().height));
check('faq closes again', (await q4.getAttribute('aria-expanded')) === 'false' && closedH < 2, `${await q4.getAttribute('aria-expanded')} / ${closedH}px`);

// 7. Early-access form: invalid, valid, reset
await page.locator('#email').scrollIntoViewIfNeeded();
await page.locator('#email').fill('not-an-email');
await page.locator('.gate__form').evaluate((f) => f.requestSubmit());
await page.waitForTimeout(300);
check('invalid email shows error', await page.locator('.gate__error').isVisible(), await page.locator('.gate__error').innerText());
await page.locator('#email').fill('privacy@veilary.xyz');
await page.locator('.gate__form').evaluate((f) => f.requestSubmit());
await page.waitForTimeout(350);
check('valid email shows receipt', await page.locator('.gate__receipt').isVisible(), (await page.locator('.gate__receipt').innerText()).replace(/\s+/g, ' ').slice(0, 70));
await page.locator('.gate__receipt .cmd').click();
await page.waitForTimeout(250);
check('receipt reset restores form', await page.locator('.gate__form').isVisible(), 'form back');

// 8. Footer legal route
await page.locator('.colophon__legal a').first().click();
await page.waitForTimeout(700);
check('footer privacy link routes', page.url().includes('#/privacy') && (await page.locator('h1').innerText()) === 'Privacy Policy', page.url());

// 9. 404 route
await page.goto(BASE + '#/nope', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
check('404 h1', (await page.locator('h1').innerText()).includes('This page has gone quiet'), await page.locator('h1').innerText());
check('404 title', (await page.title()).includes('Signal lost'), await page.title());
check('404 routes home', (await page.locator('.fault__acts a').count()) === 2, 'two commands');

// 10. Mobile status bar + command palette
const mobile = await context.newPage();
await mobile.setViewportSize({ width: 390, height: 844 });
await mobile.goto(BASE, { waitUntil: 'networkidle' });
await mobile.waitForTimeout(500);
check('mobile legal shortcuts visible', (await mobile.locator('.sysbar__glyph').count()) === 2, 'two shortcuts');
check('mobile rail is collapsed', !(await mobile.locator('.sysbar__rail').isVisible()), 'hidden');
await mobile.locator('.sysbar__toggle').click();
await mobile.waitForTimeout(350);
const paletteLinks = await mobile.locator('.sysbar__palette-cmd').count();
check('mobile command palette opens', (await mobile.locator('.sysbar__palette').isVisible()) && paletteLinks === 6, String(paletteLinks));
await mobile.keyboard.press('Escape');
await mobile.waitForTimeout(350);
check('escape closes the command palette', !(await mobile.locator('.sysbar__palette').isVisible()), 'closed');
await mobile.locator('.sysbar__glyph').first().click();
await mobile.waitForTimeout(700);
check('mobile legal shortcut routes to privacy', mobile.url().includes('#/privacy') && (await mobile.locator('h1').innerText()) === 'Privacy Policy', mobile.url());

// 11. No horizontal overflow
for (const p of [page, mobile]) {
  const overflow = await p.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
  check(`no horizontal overflow at ${p.viewportSize().width}px`, !overflow, `scrollWidth ${await p.evaluate(() => document.documentElement.scrollWidth)}`);
}

const consoleFailures = consoleErrors.filter((m) => !/favicon|Devtools/i.test(m));
await browser.close();

const out = {
  generatedAt: new Date().toISOString(),
  checks: results,
  consoleErrors: consoleFailures,
  passed: results.every((r) => r.ok) && consoleFailures.length === 0,
};
fs.writeFileSync(path.join(process.cwd(), '.reskin', 'current', 'interaction-checks.json'), JSON.stringify(out, null, 2) + '\n');
for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}  ${r.detail ?? ''}`);
console.log('console errors:', consoleFailures.length);
console.log(out.passed ? 'ALL INTERACTION CHECKS PASS' : 'INTERACTION CHECKS FAILED');
process.exitCode = out.passed ? 0 : 1;
