/**
 * Verification-only static server for a hash-history Vue app.
 *
 * The reskin verifier builds URLs as `origin + route` (`/privacy`). This app
 * uses `createWebHashHistory`, so the real route lives at `/#/privacy`. A plain
 * static server would answer `/privacy` with the home view, which would make the
 * route-parity evidence meaningless.
 *
 * This file is NOT part of the app and is never shipped. It 302s the two legal
 * paths to their hash equivalents so the browser loads the real view, then
 * serves the built dist/ files as-is.
 */
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(process.argv[2] || 'dist');
const PORT = Number(process.argv[3] || 4326);
const HASH_ROUTES = new Set(['/privacy', '/terms']);
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml'
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://127.0.0.1');
    if (HASH_ROUTES.has(url.pathname)) {
      res.writeHead(302, { Location: `/#${url.pathname}` });
      res.end();
      return;
    }

    let file = url.pathname === '/' ? '/index.html' : url.pathname;
    if (file.endsWith('/')) file += 'index.html';
    const full = path.join(ROOT, decodeURIComponent(file));
    if (!full.startsWith(ROOT)) {
      res.writeHead(403).end();
      return;
    }

    let data;
    try {
      data = await fs.readFile(full);
    } catch {
      // Unknown path: hand it to the SPA shell, same as a static host rewrite.
      data = await fs.readFile(path.join(ROOT, 'index.html'));
      file = '/index.html';
    }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  } catch (err) {
    res.writeHead(500).end(String(err));
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`hash-route verification server: http://127.0.0.1:${PORT}/ (root: ${ROOT})`);
});
