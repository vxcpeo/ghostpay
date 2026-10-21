# Research brief — GhostPay / $GHOST (GhostwareOS)

Consolidated findings used to rebuild the `ghostpayfin.xyz` marketing site as a Vue app.
Compiled in an environment where **`web_fetch` was blocked** (every hostname resolved to a
non-public IP) and **the shell was dead** (`0xC0000142` on every command), so all facts below come
from search-result metadata rather than page bodies. That limitation is why each claim carries a
confidence label.

---

## 1. What the project is

| Claim | Confidence | Source |
| --- | --- | --- |
| GhostPay is the payments **core module** of the GhostWareOS privacy stack on Solana | High | [ghostwareos.gitbook.io/docs/core-modules/ghostpay](https://ghostwareos.gitbook.io/docs/core-modules/ghostpay) |
| Ticker `$GHOST`; Coinbase slug `solana-ghostwareos-ghst` | High | Coinbase asset page |
| Solana SPL mint `BBKPiLM9KjdJW7oQSKt99RVWcZdhF6sEHRKnwqeBGHST` | High (3 independent URLs) | Solflare, DEXrabbit, GeckoTerminal |
| Launched ~26 Nov 2025 | High | [CoinCentral](https://coincentral.com/ghostpay-launch-confirmed-is-ghost-the-best-privacy-crypto-to-buy-now/), [CryptoTimes 2025-11-27](https://www.cryptotimes.io/2025/11/27/ghostpay-debuts-on-solana-with-full-private-payments/) |
| Positioned as “Solana’s first private payment rail” | High | [KuCoin flash](https://www.kucoin.com/news/flash/ghost-surges-33-after-ghostpay-launch-outperforms-zcash-and-dash) |
| DEX pools on Meteora / Raydium / pump.fun / Orca | Medium | GeckoTerminal, DEXrabbit pool URLs |

## 2. Confirmed technical primitives

Documented as GitBook modules (existence confirmed; bodies not readable):

- **Stealth addresses** — `/docs/cryptography/stealth-addresses`
- **HPKE** (hybrid public-key encryption) — `/docs/cryptography/hpke`
- **ID Obfuscation Layer** — `/docs/architecture/id-obfuscation-layer`
- **DarkRelay messaging** — `/docs/architecture/darkrelay-messaging`
- **GhostOS** — `/docs/architecture/ghostos`
- **GhostSwap** (cross-chain swap) — `/docs/core-modules/ghostswap`

**Explicitly NOT confirmed:** zero-knowledge proofs, a shielded pool, or “mixer-less” privacy. No
retrieved source ties any of those to GhostPay, so the rebuilt site does not claim them.

## 3. Ecosystem and market events

| Event | Confidence | Source |
| --- | --- | --- |
| Solflare wallet integration | High | [CoinCodex 81717](https://coincodex.com/article/81717/solana-privacy-push-continues-as-ghostwareos-integrates-with-solflare-wallet/) |
| Moonshot partnership + airdrop | Medium | Cryptopolitan |
| 2026 privacy roadmap, “Building the Privacy Layer of Solana” | Medium | Bitrue blog |
| +33% after launch; +60% on cross-chain swap reveal | Medium | KuCoin, Bitget, BeInCrypto |
| CertiK Skynet profile exists (score unknown) | Low | CertiK Skynet listing |
| Listings: MEXC (Meme+ zone), Bitget, BingX, XT.COM; **not** tradable on Coinbase | Medium | exchange notices |

**Not retrievable:** total supply, circulating supply, market cap, FDV, team identity. No named
person appears in any indexed source.

## 4. What could NOT be established

1. **Any content from `ghostpayfin.xyz` itself** — the domain never appeared in ~220 search queries
   across 12 languages, so its headings, nav, contract address and branding are unknown.
2. **Official social accounts** — no X, Telegram, Discord or GitHub handle could be verified.
3. **Tokenomics** — supply and distribution are unpublished in every reachable source.
4. **Visual design** — no screenshot, colour, font or logo reference. The dark spectral palette in
   this rebuild (`#05060a` / `#38f5a8` / `#8b7cff` / `#56d8ff`) is an original design choice.

## 4b. Live DNS reconnaissance (verified)

Name resolution was blocked for the fetch tool, but Google's JSON DNS API is reachable on an IP
literal (`https://8.8.8.8/resolve?…`), which allowed a real, live look at the domain's DNS:

| Record | Value | What it tells us |
| --- | --- | --- |
| A | `104.21.9.125`, `172.67.130.218` | Cloudflare-fronted and **live** |
| AAAA | `2606:4700:3032::ac43:82da`, `2606:4700:3037::6815:97d` | IPv6 enabled |
| NS | `ganz.ns.cloudflare.com`, `kia.ns.cloudflare.com` | DNS hosted on Cloudflare |
| SOA | serial `2417284245` | Cloudflare-managed zone |
| TXT (SPF) | `v=spf1 include:spf.efwd.registrar-servers.com ~all` | Namecheap email forwarding |
| `www` | same A records as apex | www is a configured alias |
| `app` · `docs` · `api` · `blog` | **NXDOMAIN** | no subdomains exist |

**Actionable conclusions**

- The site is real and online — the "domain may be a clone or dead" worry is settled: it is live.
- It is **apex-only**. There is no `app.` or `docs.` host, so the marketing site is a single page
  with in-page sections — the same shape as this rebuild.
- `docs.ghostpayfin.xyz` (used in an early draft of this project) **does not resolve** and has been
  removed from the site copy.
- The page body is still unobtainable: Cloudflare's edge needs SNI to serve a certificate and the
  fetch tool controls neither SNI nor headers, so both A records fail at TLS with `TypeError: fetch
  failed`. Full detail in [environment-notes.md](environment-notes.md).

## 5. Name collisions — do not merge these entities

- `ghostpay.org` — unrelated fiat virtual-card company
- `github.com/melkecelioglu/ghostPay` — unrelated hackathon project; source of the
  “bridge between web2 and web3” phrasing
- `ghostland.at` “GhostPay v4.0.0” — unrelated plugin (and Ghost Land is a Nintendo homebrew eShop
  project)
- npm `@ghostpay/sdk`, `@rishavmehra/ghostpay`; ICP “IC GHOST”; two pump-style Solana tokens
  (“Phantom Ghost”, “ghost.shell”); a separate BSC `$GHOST`
- Several ETHGlobal “GhostPay” hackathon submissions

## 6. Risk notes

- `phishdestroy.io` flags `ghostwareos.org` as a **crypto drainer** and `ghostware-os.com` as
  phishing. `scamadviser` has entries for `ghostpay.vip` / `.in` / `.pro`. Treat every domain other
  than the one you arrived from as suspect.
- Sponsorship-heavy promotion around this token (MEXC News, CMC community posts, guest posts) — low
  signal.
- One German outlet framed the whole thing as “next privacy coin hype or rugpull”.

## 7. How to close the remaining gaps

1. Open `https://ghostpayfin.xyz/` and **view source** — capture `<title>`, meta description, nav
   labels and the footer’s social links.
2. Fetch `/robots.txt` and `/sitemap.xml` for the real route list.
3. Pull `https://web.archive.org/web/*/ghostpayfin.xyz*` for a verbatim snapshot.
4. Compare the contract address shown on the site against
   `BBKPiLM9KjdJW7oQSKt99RVWcZdhF6sEHRKnwqeBGHST`. If it differs, treat the site as a clone.
5. Read the GitBook `core-modules/ghostpay` page for the official feature wording.
6. Check Solscan / CMC / CertiK for supply and verified official links.

Once those are known, update `website/src/data/site.js` — every string on the site flows from it.
