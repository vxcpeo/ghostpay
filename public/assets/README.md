# Static assets

Copied verbatim into `dist/` by Vite. Referenced from `index.html`, so the validator checks that
every root-relative path here exists.

| File | Purpose |
| --- | --- |
| `favicon.svg` | 64×64 site icon: black console tile, red `V` monogram and a magenta status dot. Hand-authored SVG. |
| `og-cover.svg` | 1200×630 social card used by `og:image` and `twitter:image`. Hand-authored terminal-console SVG so it stays diffable in git. |
| `og-cover.png` | The same card rasterised at 1200×630 by headless Chrome from the SVG, so the pair cannot drift. |

## Converting the social card to PNG

`og-cover.png` is rendered from `og-cover.svg` with headless Chrome and Pillow. With no extra
tooling installed, any of these works too:

```bash
rsvg-convert -w 1200 -h 630 og-cover.svg -o og-cover.png   # librsvg
inkscape og-cover.svg --export-type=png -w 1200            # Inkscape
magick og-cover.svg og-cover.png                           # ImageMagick
```

Then keep `og:image` / `twitter:image` in `index.html` pointing at the file you rebuilt.

## Still wanted

| Filename | What it is |
| --- | --- |
| `app-private-send.png` | Real product screenshot to replace the CSS-drawn hero mock |
| `logo-veilary.svg` | Wordmark for press / brand kit use |

The icon set is CSS-masked from path data in `src/components/Icon.vue` (no inline `<svg>` in the
rendered page) and the favicon is `favicon.svg`; nothing else is needed at runtime.
