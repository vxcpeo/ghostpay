/**
 * Verification-only interaction smoke test for the reskinned Seclura site.
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
check('home title', (await page.title()).includes('Seclura'), await page.title());

const dockBox = await page.locator('.harbor__dock').boundingBox();
check('dock floats at the bottom', Boolean(dockBox) && dockBox.y > 700 && dockBox.y + dockBox.height > 820, JSON.stringify(dockBox));

// 2. Dock section navigation
await page.locator('.harbor__link', { hasText: 'Features' }).click();
await page.waitForTimeout(900);
const anchor = await page.evaluate(() => ({ y: Math.round(window.scrollY), top: Math.round(document.querySelector('#features').getBoundingClientRect().top) }));
check('dock link scrolls to features', anchor.y > 100 && Math.abs(anchor.top) < 80, JSON.stringify(anchor));
check('dock stays visible after scroll', await page.locator('.harbor__dock').isVisible(), 'visible');

// 3. Primary CTA scrolls to the closing scene
await page.locator('.harbor__cta').click();
await page.waitForTimeout(1200);
const launch = await page.evaluate(() => ({
  y: Math.round(window.scrollY),
  top: Math.round(document.querySelector('#launch').getBoundingClientRect().top),
  view: window.innerHeight,
  max: Math.round(document.documentElement.scrollHeight - window.innerHeight),
}));
check('launch app reaches #launch', launch.y > 5000 && launch.top < launch.view - 120, JSON.stringify(launch));

// 4. Back to top
check('back-to-top appears after scrolling', await page.locator('.tidetop').isVisible(), 'visible');
await page.locator('.tidetop').click();
await page.waitForTimeout(1400);
check('back-to-top returns to the opening', await page.evaluate(() => window.scrollY) < 120, String(await page.evaluate(() => window.scrollY)));

// 5. Copy-to-clipboard control
await page.locator('.mintline').click();
await page.waitForTimeout(250);
check('mint button reports copied', /Copied/i.test(await page.locator('.mintline').innerText()), (await page.locator('.mintline').innerText()).replace(/\s+/g, ' '));

// 6. FAQ accordion opens and closes
const q4 = page.locator('.shallows__trigger').nth(3);
await q4.scrollIntoViewIfNeeded();
await q4.click();
await page.waitForTimeout(400);
const answerH = await page.locator('.shallows__answer').nth(3).evaluate((el) => Math.round(el.getBoundingClientRect().height));
check('faq opens and reports state', (await q4.getAttribute('aria-expanded')) === 'true' && answerH > 30, `${await q4.getAttribute('aria-expanded')} / ${answerH}px`);
await q4.click();
await page.waitForTimeout(400);
const closedH = await page.locator('.shallows__answer').nth(3).evaluate((el) => Math.round(el.getBoundingClientRect().height));
check('faq closes again', (await q4.getAttribute('aria-expanded')) === 'false' && closedH < 2, `${await q4.getAttribute('aria-expanded')} / ${closedH}px`);

// 7. Early-access form: invalid, valid, reset
await page.locator('#email').scrollIntoViewIfNeeded();
await page.locator('#email').fill('not-an-email');
await page.locator('.inlet__form').evaluate((f) => f.requestSubmit());
await page.waitForTimeout(300);
check('invalid email shows error', await page.locator('.inlet__error').isVisible(), await page.locator('.inlet__error').innerText());
await page.locator('#email').fill('privacy@seclura.xyz');
await page.locator('.inlet__form').evaluate((f) => f.requestSubmit());
await page.waitForTimeout(350);
check('valid email shows receipt', await page.locator('.inlet__receipt').isVisible(), (await page.locator('.inlet__receipt').innerText()).replace(/\s+/g, ' ').slice(0, 70));
await page.locator('.inlet__receipt .tide-button').click();
await page.waitForTimeout(250);
check('receipt reset restores form', await page.locator('.inlet__form').isVisible(), 'form back');

// 8. Footer legal route
await page.locator('.shore__legal a').first().click();
await page.waitForTimeout(700);
check('footer privacy link routes', page.url().includes('#/privacy') && (await page.locator('h1').innerText()) === 'Privacy Policy', page.url());

// 9. 404 route
await page.goto(BASE + '#/nope', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
check('404 h1', (await page.locator('h1').innerText()).includes('This page has gone quiet'), await page.locator('h1').innerText());
check('404 title', (await page.title()).includes('Signal lost'), await page.title());
check('404 routes home', (await page.locator('.signal__acts a').count()) === 2, 'two actions');

// 10. Mobile dock + index sheet
const mobile = await context.newPage();
await mobile.setViewportSize({ width: 390, height: 844 });
await mobile.goto(BASE, { waitUntil: 'networkidle' });
await mobile.waitForTimeout(500);
check('mobile legal shortcuts visible', (await mobile.locator('.harbor__legal').count()) === 2, 'two shortcuts');
await mobile.locator('.harbor__toggle').click();
await mobile.waitForTimeout(350);
const sheetLinks = await mobile.locator('.harbor__sheet-link').count();
check('mobile index sheet opens', (await mobile.locator('.harbor__sheet').isVisible()) && sheetLinks === 6, String(sheetLinks));
await mobile.keyboard.press('Escape');
await mobile.waitForTimeout(350);
check('escape closes the index sheet', !(await mobile.locator('.harbor__sheet').isVisible()), 'closed');
await mobile.locator('.harbor__legal').first().click();
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
