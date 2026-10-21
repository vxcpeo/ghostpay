/**
 * Verification-only preview capture (not shipped).
 * Viewport slices for visual review of the new scenes.
 */
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(path.join(process.cwd(), '.reskin', 'tools', 'package.json'));
const { chromium } = require('playwright-core');
const exe = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = 'http://127.0.0.1:4326/';
const out = path.join(process.cwd(), '.reskin', 'current');
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ headless: true, executablePath: fs.existsSync(exe) ? exe : undefined });

async function shoot(name, hash, viewport, positions) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
  const page = await context.newPage();
  await page.goto(BASE + hash, { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const step = Math.max(300, Math.floor(window.innerHeight * 0.8));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await sleep(25);
    }
    window.scrollTo(0, 0);
    await sleep(250);
  });
  for (const y of positions) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(320);
    const file = path.join(out, `${name}-${y}.png`);
    await page.screenshot({ path: file });
    console.log(file);
  }
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    scrollHeight: document.documentElement.scrollHeight,
    landmarks: [...document.querySelectorAll('header,nav,main,aside,footer')].map((el) => `${el.tagName.toLowerCase()}:${el.getAttribute('aria-label') || ''}`),
    h1: [...document.querySelectorAll('h1')].map((el) => el.innerText),
  }));
  console.log(name, JSON.stringify(metrics));
  await context.close();
}

await shoot('home', '', { width: 1440, height: 900 }, [0, 900, 1900, 3000, 4200, 5400, 6600, 7800, 8900]);
await shoot('home-mobile', '', { width: 390, height: 844 }, [0, 900, 2200, 5200]);
await shoot('privacy', '#/privacy', { width: 1440, height: 900 }, [0, 700]);
await shoot('terms', '#/terms', { width: 1440, height: 900 }, [0]);
await shoot('notfound', '#/lost-signal', { width: 1440, height: 900 }, [0]);

await browser.close();
