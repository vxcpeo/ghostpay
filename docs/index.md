# GhostPay — website

Vue 3 + Vite marketing site for the GhostPay (ghostpayfin.xyz) project.

- Full documentation: [`README.md`](./README.md)
- Source of truth for all copy, links and numbers: [`src/data/site.js`](./src/data/site.js)
- Reconstructed reference notes on the original site: [`docs/original-site-analysis.md`](./docs/original-site-analysis.md)

## Run it

```bash
cd website
npm install
npm run dev        # http://127.0.0.1:5173
```

Build for production:

```bash
npm run build      # -> website/dist
npm run preview
```

## Publish

The build is a static bundle with a relative `base` and hash-based routing, so `dist/` can be
uploaded to any host (nginx, S3, GitHub Pages, Netlify, Vercel) with no rewrite rules.
`vercel.json` and `netlify.toml` are already included if you use one of those platforms.
