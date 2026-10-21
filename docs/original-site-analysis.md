# GhostPay (`ghostpayfin.xyz`) — Original Site Analysis & Homepage Reconstruction

**Prepared:** research pass run from workspace `E:\workspace\chuangye\ghostpay`
**Target of analysis:** `https://ghostpayfin.xyz/` — a crypto project referred to by the requester as "GhostPay"
**Method:** `web_search` only (≈170 distinct query strings across 44 batches, in English, Chinese, Japanese, French, Spanish, German, Korean, Portuguese, Russian, Vietnamese, Hindi and Bengali phrasings). `web_fetch` is blocked in this runtime (every hostname resolves to a non-public IP); `pwsh` is also unavailable in this runtime (`exit code 3221225794`, `STATUS_DLL_INIT_FAILED`) — attempted once, not retried.

> ## ⚠️ Read this first — the identity problem
>
> **No search result in ~170 queries returned a page, title, snippet, link, WHOIS record, scanner entry or archive reference for the domain `ghostpayfin.xyz`.** The domain itself is effectively invisible in the reachable index.
>
> Every substantive "GhostPay" hit resolves to a **different, well-covered project**: **GhostWare / GhostWareOS**, a Solana privacy stack whose payments module is literally named **GhostPay** (docs at `ghostwareos.gitbook.io`, token `$GHOST`, official site `ghostwareos.com`, app `app.ghostwareos.com`).
>
> Two possibilities remain open and **cannot be separated with the tools available to me**:
>
> 1. `ghostpayfin.xyz` is an **official or affiliated** domain of the GhostWareOS/GhostPay team (e.g. a payments-focused landing domain).
> 2. `ghostpayfin.xyz` is an **unaffiliated or impersonating** site. This is a live risk: in this exact brand space, `ghostwareos.org` is the subject of a **"Crypto Drainer Investigation"** by PhishDestroy, `ghostware-os.com` has a **"Phishing Intelligence Report"**, and `ghostpay.vip`, `ghostpay.in`, `ghostpay.pro` all have Scamadviser entries. ([phishdestroy ghostwareos.org](https://phishdestroy.io/domain/ghostwareos.org/), [phishdestroy ghostware-os.com](https://phishdestroy.io/domain/ghostware-os.com/), [scamadviser ghostpay.vip](https://www.scamadviser.com/check-website/ghostpay.vip), [scamadviser ghostpay.in](https://www.scamadviser.com/zh/check-website/ghostpay.in), [scamadviser ghostpay.pro](https://www.scamadviser.com/check-website/ghostpay.pro))
>
> Therefore **Section 1 below is explicitly a reconstruction, not an observation.** Nothing in it is CONFIRMED homepage copy. Sections 2–8 separate what is confirmed about the *GhostPay product / $GHOST token* from what is unknown about the *ghostpayfin.xyz homepage*.

### Methodological warning about the search tool
The search backend is **semantic, not exact-phrase**. Control test: the nonsense query `zibblewobble quantum ghostpay flurble` returned the *same* GhostPay/GhostWare result set as real queries, and the query `"ghostpayfin.xyz"` (quoted) returned generic results rather than the site. **Consequence:** appearing in a result list is evidence of *topical relevance*, not proof that a string exists verbatim on a page. Every "verbatim" string in Section 2 is quoted **as it appeared in a search-result title or snippet**, and is labelled as such — not as confirmed on-page copy.

---

## 1. Section-by-section map of the homepage

**Status of this entire section: INFERRED / UNVERIFIED.** It is a best-effort structural reconstruction. No section of the `ghostpayfin.xyz` homepage was directly observed.

Basis for the ordering: (a) the section inventory of the in-repo rebuild at `website/src/components/sections/` (itself a reconstruction, not an observation), (b) the standard launch-page pattern for Solana privacy tokens evidenced by the coverage in Section 2 (announcement → private-payments claim → token → roadmap → community), and (c) the confirmed existence of functional areas in the GhostWareOS stack (payments, swap, stealth addresses, OS architecture, compliance, vision) that a marketing homepage for "GhostPay" would surface.

| # | Section | Heading (verbatim?) | Subheading | Items / cards | CTA buttons | Basis |
|---|---------|--------------------|-----------|---------------|-------------|-------|
| 1 | Sticky header / nav | *unknown* — INFERRED pattern: logo + `Home · Features · How it works · Tokenomics · Roadmap · FAQ` + one primary CTA | — | Logo/wordmark, anchor links, "Launch app"/"Buy $GHOST" CTA | `Launch App` / `Buy $GHOST` (INFERRED, unsourced) | INFERRED |
| 2 | Hero | *unknown.* The strongest **confirmed** positioning phrase in circulation is **"Solana's first private payment rail"** and **"Complete Payment Privacy"** (headlines, not site copy) | INFERRED subhead theme: private payments on Solana | Headline, sub-paragraph, 1–2 CTAs, possibly a stat row or app mock, contract-address copy field | INFERRED: `Launch App`, `Buy $GHOST`, `Read Docs` | INFERRED — anchors: [CoinStats](https://coinstats.app/news/de55e2fc284b42d35dc9f74e7e5c2aa10412415d0fd2967b606ef65d8d06d95c_JUST-IN%3A-%24GHOST-launches-GhostPay%2C-Solana%E2%80%99s-first-private-payment-rail%2C-sparking-brief-40%25-rally-at-release-as-traders-react-to-growing-on-chain-privacy-narrative/), [CryptoTimes](https://www.cryptotimes.io/2025/11/27/ghostpay-debuts-on-solana-with-full-private-payments/) |
| 3 | Trust / integration bar | *unknown* | — | INFERRED logo strip: **Solflare** (confirmed integration), plus likely Phantom / Backpack / Jupiter-type Solana venues | — | INFERRED, anchored by [CoinCodex Solflare integration](https://coincodex.com/article/81717/solana-privacy-push-continues-as-ghostwareos-integrates-with-solflare-wallet/) |
| 4 | Features grid | *unknown* | *unknown* | INFERRED cards, each backed by a confirmed product area: **private payments** ("Full Private Payments"), **stealth addresses**, **cross-chain swap** (GhostSwap), **wallet integration** (Solflare), **privacy layer for Solana**, **GhostOS architecture**, **privacy & compliance** posture | — | INFERRED — anchors: [GhostWare docs](https://ghostwareos.gitbook.io/docs/core-modules/ghostpay), [Stealth Addresses](https://ghostwareos.gitbook.io/docs/cryptography/stealth-addresses), [GhostSwap](https://ghostwareos.gitbook.io/docs/core-modules/ghostswap), [GhostOS](https://ghostwareos.gitbook.io/docs/architecture/ghostos), [Privacy & Compliance](https://ghostwareos.gitbook.io/docs/privacy-and-compliance) |
| 5 | How it works | *unknown* | *unknown* | INFERRED 3–4 steps: connect a Solana wallet → deposit/shield funds → send privately (stealth address) → withdraw/swap | — | INFERRED (no source describes a step flow) |
| 6 | Comparison block | *unknown* | — | INFERRED: privacy-vs-transparency table. Coverage explicitly benchmarks against **Zcash** and **DASH**, so a comparison motif is plausible | — | INFERRED — anchor: [KuCoin "Outperforms Zcash and DASH"](https://www.kucoin.com/news/flash/ghost-surges-33-after-ghostpay-launch-outperforms-zcash-and-dash) |
| 7 | Tokenomics / $GHOST | *unknown* | *unknown* | INFERRED: ticker, chain (Solana), mint address, buy links, supply chart. **No supply, allocation or tax figures are confirmed by any source I reached** | INFERRED: `Buy $GHOST`, `View Chart` | INFERRED |
| 8 | Roadmap | *unknown.* A **confirmed external artifact** exists: **"GHOST Announces 2026 Privacy Roadmap — Building the Privacy Layer of Solana"** | — | INFERRED phases keyed to the 2026 roadmap announcement (privacy layer, cross-chain swap, integrations, airdrop) | — | INFERRED — anchor: [Bitrue roadmap post](https://www.bitrue.com/blog/ghost-2026-privacy-roadmap-solana-privacy-layer) |
| 9 | Ecosystem / modules | *unknown* | — | INFERRED module cards mirroring the docs tree: **GhostPay**, **GhostSwap**, **GhostOS**, **Stealth Addresses** | — | INFERRED — anchors: [docs](https://ghostwareos.gitbook.io/docs), [GhostSwap](https://ghostwareos.gitbook.io/docs/core-modules/ghostswap), [GhostOS](https://ghostwareos.gitbook.io/docs/architecture/ghostos) |
| 10 | Airdrop / community | *unknown* | — | INFERRED: airdrop claim block — a **Moonshot partnership airdrop** is confirmed by press | INFERRED: `Claim Airdrop`, `Join Community` | INFERRED — anchor: [Cryptopolitan Moonshot airdrop](https://www.cryptopolitan.com/ghostwareos-moonshot-partnership-can-this-crypto-airdrop-drive-privacy-token-narrative/) |
| 11 | FAQ | *unknown.* A **comparable FAQ question** appears on a syndicated wiki page: *"Qu'est-ce que GhostPay ? En quoi se distingue-t-il des paiements cryptographiques classiques ?"* ("What is GhostPay? How does it differ from classic crypto payments?") — that is the **Gate/OKX wiki**, not the homepage | — | INFERRED accordion: what is GhostPay, is it a mixer, KYC, which chains, who holds funds, how to buy $GHOST | — | INFERRED — anchor: [Gate wiki FR](https://web.gate.it/fr/crypto-wiki/article/ghost-privacy-and-ghostpay-revolutionizing-blockchain-transactions-with-next-gen-privacy-solutions-20260121) |
| 12 | CTA band + footer | *unknown* | — | INFERRED: final CTA, social links, docs link, legal/risk notice, contract address | INFERRED: `Launch App`, `Follow on X` | INFERRED |

### 1b. What the in-repo rebuild currently claims (and why it must not be trusted)
`website/src/data/site.js` contains a full invented content set: tagline *"Private Payments, Invisible by Design"*, a `contract` of `GH0STpay111111111111111111111111111111111111`, socials `@GhostPayFin`, `t.me/GhostPayPortal`, `discord.gg/ghostpay`, `github.com/ghostpay`, `docs.ghostpayfin.xyz`, a **1,000,000,000 supply**, a **6-way distribution split**, **0%/0% tax**, **8 features**, **4 steps**, **4 roadmap phases**, **8 FAQs**.

**None of these strings, numbers, handles or addresses appear in any source found in this research.** The README itself calls the contract address and handles placeholders. They must be treated as **fabricated placeholders**, not recovered copy, and must not be published as if authentic. Two of them are actively hazardous: a made-up contract address (users could be drained by a wrong address) and made-up social handles (they may resolve to squatters).

---

## 2. Verbatim copy recovered

All strings below are reproduced **exactly as they appeared in search-result titles or snippet fragments**. "Source" = the URL the search engine returned for that string. These are **third-party headlines**, not confirmed homepage copy — except where marked *(docs title)*.

| Verbatim string | Where it came from | Source URL |
|---|---|---|
| "GhostPay Debuts on Solana With Full Private Payments - Key Highlights" | Article headline | https://www.cryptotimes.io/2025/11/27/ghostpay-debuts-on-solana-with-full-private-payments/ |
| "GhostPay Launches on Solana: Complete Payment Privacy Finally Arrives" | Syndicated headline (BTCC / CryptotimesIO) | https://www.btcc.com/en-CA/amp/square/CryptotimesIO/1218147 |
| "GhostPay Fait Ses Débuts sur Solana avec des Paiements Entièrement Privés" | French syndication headline | https://www.btcc.com/fr-FR/amp/square/B1tzNbyte/1218139 |
| "GhostSwap 第二款產品發布，獲得 Solana 支持" ("GhostSwap, the second product released, with Solana support") | Chinese syndication headline | https://www.btcc.com/zh-TW/square/528BTC/1467574 |
| "JUST IN: $GHOST launches GhostPay, Solana's first private payment rail, sparking brief 40% rally at release as traders react to growing on-chain privacy narrative" | News-flash snippet | https://coinstats.app/news/de55e2fc284b42d35dc9f74e7e5c2aa10412415d0fd2967b606ef65d8d06d95c_JUST-IN%3A-%24GHOST-launches-GhostPay%2C-Solana%E2%80%99s-first-private-payment-rail%2C-sparking-brief-40%25-rally-at-release-as-traders-react-to-growing-on-chain-privacy-narrative/ |
| "GHOST Surges 33% After GhostPay Launch, Outperforms Zcash and DASH" | News headline | https://www.kucoin.com/news/flash/ghost-surges-33-after-ghostpay-launch-outperforms-zcash-and-dash |
| "GHOST、GhostPayのローンチ後に33％急上昇、ZcashやDASHを上回る" | Japanese headline | https://www.kucoin.com/ja/news/flash/ghost-surges-33-after-ghostpay-launch-outperforms-zcash-and-dash |
| "GHOST sube un 33% tras el lanzamiento de GhostPay, supera a Zcash y DASH." | Spanish headline | https://www.kucoin.com/es/news/flash/ghost-surges-33-after-ghostpay-launch-outperforms-zcash-and-dash |
| "GhostPay Launch Confirmed: Is GHOST The Best Privacy Crypto To Buy Now?" | Article headline | https://coincentral.com/ghostpay-launch-confirmed-is-ghost-the-best-privacy-crypto-to-buy-now/ |
| "With the official announcement of the GhostPay launch on November 26, the privacy market on Solana has gained a clear point of f..." | Snippet fragment (truncated by the engine) | https://coincentral.com/ghostpay-launch-confirmed-is-ghost-the-best-privacy-crypto-to-buy-now/ |
| "Solana's Privacy Coin Jumps 60% After New Cross-Chain Swap Reveal" | Headline (BeInCrypto, syndicated) | https://www.bitget.com/amp/news/detail/12560605167212 · https://www.tradingview.com/news/beincrypto:34a0ab4ac094b:0-solana-s-privacy-coin-jumps-60-after-new-cross-chain-swap-reveal/ |
| "Solana 的隱私幣 GHOST 在公佈新的跨鏈交換方案後一度飆升 60%" | Chinese headline | https://www.chaincatcher.com/zh-tw/article/2240305 |
| "This Solana Privacy Coin Just Exploded 60%, But Why Now?" | Headline | https://beincrypto.com/solana-privacy-coin-rally-ghostware/ · https://www.mexc.io/news/553938 |
| "GHOST Announces 2026 Privacy Roadmap — Building the Privacy Layer of Solana" | Headline | https://www.bitrue.com/blog/ghost-2026-privacy-roadmap-solana-privacy-layer |
| "GHOST Annonce la Feuille de Route de la Confidentialité 2026 — Construction de la Couche de Confidentialité de Solana" | French headline | https://www.bitrue.com/fr/blog/ghost-2026-privacy-roadmap-solana-privacy-layer |
| "Solana Privacy Push Continues as GhostWareOS Integrates With Solflare Wallet" | Headline | https://coincodex.com/article/81717/solana-privacy-push-continues-as-ghostwareos-integrates-with-solflare-wallet/ |
| "GhostWareOS & Moonshot Partnership: Can This Crypto Airdrop Drive Privacy Token Narrative?" | Headline | https://www.cryptopolitan.com/ghostwareos-moonshot-partnership-can-this-crypto-airdrop-drive-privacy-token-narrative/ |
| "GhostWareOS 与 Moonshot 合作：这次加密货币空投能否推动隐私代币的发展？" | Chinese headline | https://www.cryptopolitan.com/zh-cn/ghostwareos-moonshot-partnership-can-this-crypto-airdrop-drive-privacy-token-narrative/ |
| "Alianza GhostWareOS y Moonshot: ¿Puede este airdrop de criptomonedas impulsar la narrativa de los tokens de privacidad?" | Spanish headline | https://www.cryptopolitan.com/es/ghostwareos-moonshot-partnership-can-this-crypto-airdrop-drive-privacy-token-narrative/ |
| "Ghost kooperiert mit Moonshot, um die Nutzung von Datenschutzfunktionen auf Solana auszuweiten" | German headline | https://coinfomania.com/de/ghost-kooperiert-mit-moonshot-um-die-nutzung-von-datenschutzfunktionen-auf-solana-auszuweiten/ |
| "Ghost - nächster Privacy Coin Hype oder Rugpull?" ("Ghost — next privacy coin hype or rugpull?") | Headline | https://99bitcoins.com/de/news/presales/ghost-naechster-privacy-coin-hype-oder-rugpull/ |
| "Kaspa币价飙升，隐私币市场回暖：GhostPay正式上线" ("…GhostPay officially launches") | Chinese headline | https://www.baiyi.com/news/de5919205fc44411be30704c095b7ffb.html |
| "GHOST Privacy et GhostPay : une révolution dans les transactions blockchain avec des solutions de confidentialité de nouvelle génération" | Wiki headline | https://web.gate.it/fr/crypto-wiki/article/ghost-privacy-and-ghostpay-revolutionizing-blockchain-transactions-with-next-gen-privacy-solutions-20260121 |
| "Qu'est-ce que GhostPay ? En quoi se distingue-t-il des paiements cryptographiques classiques ?" ("What is GhostPay? How does it differ from classic crypto payments?") | Wiki body/FAQ fragment | https://web.gate.it/fr/crypto-wiki/article/ghost-privacy-and-ghostpay-revolutionizing-blockchain-transactions-with-next-gen-privacy-solutions-20260121 |
| "GHOST 隐私与 GhostPay：以新一代隐私技术引领区块链交易变革" | Chinese wiki headline | https://www.gateweb3.net/zh/crypto-wiki/article/ghost-privacy-and-ghostpay-revolutionizing-blockchain-transactions-with-next-gen-privacy-solutions-20260121 |
| "GHOST隐私与GhostPay：通过下一代隐私解决方案革新区块链交易" | Chinese wiki headline (OKX Learn) | https://www.okx.com/zh-hans-au/learn/ghost-privacy-ghostpay-blockchain-transactions |
| "Comment fonctionne Ghost (GHOST)" / "Dans le paysage en évolution de la finance numérique, la vie privée est passée d'une préférence marginale à une exigence fondame..." | Knowledge-base headline + intro fragment | https://www.kucoin.com/fr/knowledge-base/Knowledge/how-does-ghost-ghost-work |
| "加密貨幣中的幽靈（GHOST）" / "什麼是加密貨幣中的 Ghost (GHOST)" | Chinese knowledge-base headline | https://www.kucoin.com/zh-hant/knowledge-base/Concepts/what-is-ghost-ghost-in-crypto |
| "GhostWareOS Là Gì? Lớp Privacy Trên Solana Cho Giao Dịch Ẩn Danh" ("What is GhostWareOS? The privacy layer on Solana for anonymous transactions") | Vietnamese explainer headline | https://hakresearch.com/en/ghostwareos-la-gi |
| "GhostPay" / "GhostSwap" / "Stealth Addresses" / "GhostOS" / "Privacy & Compliance" / "Welcome to GhostWare" *(docs page titles)* | **Project's own documentation titles** | https://ghostwareos.gitbook.io/docs/core-modules/ghostpay · /core-modules/ghostswap · /cryptography/stealth-addresses · /architecture/ghostos · /privacy-and-compliance · https://ghostwareos.gitbook.io/docs |
| "GhostwareOS Price, GHOST Price, Live Charts, and Marketcap - Don't invest unless you're prepared to lose all the money you invest" | Exchange listing-page title | https://www.coinbase.com/en-gb/price/solana-ghostwareos-ghst |
| "Les GhostwareOS ne peuvent pas être tradés sur Coinbase" ("GhostwareOS cannot be traded on Coinbase") | Exchange page notice | https://www.coinbase.com/fr-fr/price/solana-ghostwareos-ghst |
| "GhostwareOS (GHOST) Futures Data - OI, Volume & Funding Rates" | Market-data page | https://coinranking.com/coin/OyfjbFLBKyHW+ghostwareos-ghost/futures |
| "ghostwareos.org — Crypto Drainer Investigation" | Threat-intel report | https://phishdestroy.io/domain/ghostwareos.org/ |
| "ghostware-os.com Phishing Intelligence Report" | Threat-intel report | https://phishdestroy.io/domain/ghostware-os.com/ |
| "App.ghostwareos.com Scam Check: Blacklist Warning (23/100 Trust Score)" | Reputation scanner | https://gridinsoft.com/online-virus-scanner/url/app-ghostwareos-com |
| "GhostWareOS - Questions" | Forum thread title | https://discuss.privacyguides.net/t/ghostwareos/32529/5 |
| "GhostPay - Secure Virtual Disposable Cards" | **Different, unrelated product** named GhostPay | https://ghostpay.org/ |
| "ghostPay: your bridge to web2 and web3 in brand new and unprecedented privacy" | **Unrelated** GitHub hobby repo | https://github.com/melkecelioglu/ghostPay |
| "GhostPay v4.0.0 - Payment system rebuilt from scratch" | **Unrelated** (Ghost Land team) | https://ghostland.at/news/2026-03-31-ghostpay-v4_0_0/ |
| "@ghostpay/sdk - Use this API when you want to create, list, receive, and sync payment intents as first-class mesh events without reaching into t..." | **Unrelated-to-be-verified** npm package | https://www.npmjs.com/package/@ghostpay/sdk |

---

## 3. Feature list the project advertises (with the wording used)

Legend: **[C]** = confirmed by an independent indexed source; **[I]** = inferred; **[U]** = unverified (claimed by the in-repo rebuild or by generic crypto marketing, no source found).

| Feature | Wording observed | Status | Source |
|---|---|---|---|
| Private payments | "**Full Private Payments**"; "**Complete Payment Privacy Finally Arrives**" | C (phrasing is third-party headline wording describing the product) | [CryptoTimes](https://www.cryptotimes.io/2025/11/27/ghostpay-debuts-on-solana-with-full-private-payments/), [BTCC](https://www.btcc.com/en-CA/amp/square/CryptotimesIO/1218147) |
| Private payment rail on Solana | "**Solana's first private payment rail**" | C (claim as reported by CoinStats) | [CoinStats](https://coinstats.app/news/de55e2fc284b42d35dc9f74e7e5c2aa10412415d0fd2967b606ef65d8d06d95c_JUST-IN%3A-%24GHOST-launches-GhostPay%2C-Solana%E2%80%99s-first-private-payment-rail%2C-sparking-brief-40%25-rally-at-release-as-traders-react-to-growing-on-chain-privacy-narrative/) |
| Stealth addresses | docs page literally titled "**Stealth Addresses**" | C | [GhostWare docs](https://ghostwareos.gitbook.io/docs/cryptography/stealth-addresses) |
| Cross-chain / private swap | module "**GhostSwap**"; "**New Cross-Chain Swap Reveal**" | C | [GhostSwap docs](https://ghostwareos.gitbook.io/docs/core-modules/ghostswap), [BeInCrypto](https://beincrypto.com/solana-privacy-coin-rally-ghostware/) |
| Wallet integration | "**Integrates With Solflare Wallet**" | C | [CoinCodex](https://coincodex.com/article/81717/solana-privacy-push-continues-as-ghostwareos-integrates-with-solflare-wallet/) |
| Privacy layer / OS architecture | "**Building the Privacy Layer of Solana**"; docs page "**GhostOS**" | C | [Bitrue](https://www.bitrue.com/blog/ghost-2026-privacy-roadmap-solana-privacy-layer), [GhostOS docs](https://ghostwareos.gitbook.io/docs/architecture/ghostos) |
| Airdrop / community incentives | "**Moonshot Partnership… Crypto Airdrop**" | C | [Cryptopolitan](https://www.cryptopolitan.com/ghostwareos-moonshot-partnership-can-this-crypto-airdrop-drive-privacy-token-narrative/) |
| Compliance posture | docs page "**Privacy & Compliance**" (content unknown) | C (page exists) | [GhostWare docs](https://ghostwareos.gitbook.io/docs/privacy-and-compliance) |
| Vision / principles messaging | docs page "**Vision and Principles**" (content unknown) | C (page exists) | https://ghostwareos.gitbook.io/docs/vision-and-principles |
| Benchmark vs Zcash / DASH | "**Outperforms Zcash and DASH**" | C (as a market claim) | [KuCoin](https://www.kucoin.com/news/flash/ghost-surges-33-after-ghostpay-launch-outperforms-zcash-and-dash) |
| Zero-knowledge proofs | "zero-knowledge settlement" etc. | **U** — no source found using ZK language for GhostPay | — |
| No-KYC | "no KYC" | **U** — no source found; a "Privacy & Compliance" page hints at the opposite framing | — |
| Non-custodial | "non-custodial" | **U** for GhostPay homepage; the parent rebuild asserts it without a source | — |
| Shielded transfers / mixers | "shielded" | **U** | — |
| Sub-second settlement, zero data retention, private payroll, Ghost Links, merchant SDK | — | **U** (invented in `site.js`) | — |

---

## 4. Token / $GHOST facts

| Fact | Value | Confidence | Source |
|---|---|---|---|
| Project / token name | **GhostwareOS**, ticker **GHOST** (Coinbase slug renders it "…ghostwareos-ghst") | High | [CoinMarketCap](https://coinmarketcap.com/currencies/ghostwareos/), [Coinbase](https://www.coinbase.com/en-gb/price/solana-ghostwareos-ghst) |
| Chain | **Solana** | High | Coinbase slug `price/solana-ghostwareos-ghst`; OpenSea Solana token page; DEX pools |
| Mint / contract address | **`BBKPiLM9KjdJW7oQSKt99RVWcZdhF6sEHRKnwqeBGHST`** — reproduced identically in three independent URLs | High | [OpenSea](https://opensea.io/token/solana/BBKPiLM9KjdJW7oQSKt99RVWcZdhF6sEHRKnwqeBGHST/holders), [Coinbase](https://www.coinbase.com/zh-cn/price/ghostwareos-solana-bbkpilm9kjdjw7oqskt99rvwczdhf6sehrknwqebghst-token), [DEXrabbit](https://dexrabbit.bitquery.io/solana/token/BBKPiLM9KjdJW7oQSKt99RVWcZdhF6sEHRKnwqeBGHST) |
| Launch venue | **pump.fun** pools (two), later **Orca** and **Meteora** pools | High (pools exist); Medium (that pump.fun was the *launch* venue) | [GeckoTerminal pump.fun GHOST/SOL](https://www.geckoterminal.com/zh-TW/solana/pools/5gvp3PcXhV7bRczyk76LSfKJ1uthBGq9NFu3cG6em53G), [pump.fun GhostPay/SOL](https://www.geckoterminal.com/zh-TW/solana/pools/4odKF9jaitgTSvuqq19fwJ6xsKzVvdYtGveCALRuZmvo), [Orca](https://www.geckoterminal.com/solana/pools/7gemQpYTFXgwPan19YPU4c4DP9uW3yH2Kz89kxmGoe6P), [Meteora](https://www.geckoterminal.com/fr/solana/pools/9RRDon6SarD7uR7VdoWfgQMQBgk9fAHDXgkY2nMcU4ri) |
| Product launch date | **26 November 2025** ("official announcement of the GhostPay launch on November 26"; CryptoTimes published 27 Nov 2025) | High for "late Nov 2025", Medium for the exact day | [CoinCentral](https://coincentral.com/ghostpay-launch-confirmed-is-ghost-the-best-privacy-crypto-to-buy-now/), [CryptoTimes](https://www.cryptotimes.io/2025/11/27/ghostpay-debuts-on-solana-with-full-private-payments/) |
| Price reaction claims | "+33% after GhostPay launch (outperformed Zcash and DASH)"; "brief 40% rally at release"; "jumps 60% after new cross-chain swap reveal"; "exploded 60%" | High that these are the words used; **no absolute price captured** | [KuCoin](https://www.kucoin.com/news/flash/ghost-surges-33-after-ghostpay-launch-outperforms-zcash-and-dash), [CoinStats](https://coinstats.app/news/de55e2fc284b42d35dc9f74e7e5c2aa10412415d0fd2967b606ef65d8d06d95c_JUST-IN%3A-%24GHOST-launches-GhostPay%2C-Solana%E2%80%99s-first-private-payment-rail%2C-sparking-brief-40%25-rally-at-release-as-traders-react-to-growing-on-chain-privacy-narrative/), [Bitget](https://www.bitget.com/amp/news/detail/12560605167212) |
| Market-cap / absolute price | **Not determined** (price pages exist but snippets returned no numbers) | — | [CMC](https://coinmarketcap.com/currencies/ghostwareos/), [Coinpaprika](https://coinpaprika.com/coin/ghost-ghostwareos/), [Crypto.com](https://crypto.com/en-es/price/ghostwareos) |
| Supply / distribution / tax | **Not published in any source reached.** Treat the 1,000,000,000 supply and 6-way split in `site.js` as **invented** | — | — |
| Exchange / venue listings | Price pages at CMC, Coinbase (not tradable there), Binance, Crypto.com, Coinpaprika, Investing.com, ET Now, BTCC; **futures data** on Coinranking; Bitget "how to sell" guide; DEX pools on pump.fun/Orca/Meteora | Medium-High (listing *pages* exist; actual CEX listing status not confirmed) | [Coinranking futures](https://coinranking.com/coin/OyfjbFLBKyHW+ghostwareos-ghost/futures), [Binance](https://www.binance.com/en-NG/price/ghostwareos), [Bitget](https://www.bitget.ng/ph/how-to-sell/wallet/ghostwareos) |
| Security review | **CertiK Skynet project page exists** for GhostwareOS; **score/result not captured** | Medium (page exists), Unknown (result) | [CertiK Skynet](https://skynet.certik.com/zh-CN/projects/ghostwareos) |
| ICO record | ICOholder project page exists (ID 1102506) | Medium | [ICOholder](https://icoholder.com/es/ghostwareos-1102506) |
| Roadmap | "**2026 Privacy Roadmap**" announced | High | [Bitrue](https://www.bitrue.com/blog/ghost-2026-privacy-roadmap-solana-privacy-layer) |
| ⚠️ Name collision | A **different `$GHOST` on BSC** (`0xa834f616a6c106a91986330d1bec5d8ff6777777`, price ≈ `$0.0₅43419`) is surfaced by Binance Web3 wallet — **not** the Solana GhostwareOS token; do not merge the two | Medium | [Binance Web3](https://web3.binance.com/zh-CN/token/bsc/0xa834f616a6c106a91986330d1bec5d8ff6777777) |

---

## 5. Social + docs links

| Channel | Value | Confidence | Source |
|---|---|---|---|
| Docs (primary official artifact) | **https://ghostwareos.gitbook.io/docs** | **High** | Docs home + subpages, all under the same GitBook space |
| Docs — GhostPay module | https://ghostwareos.gitbook.io/docs/core-modules/ghostpay | High | docs |
| Docs — GhostSwap module | https://ghostwareos.gitbook.io/docs/core-modules/ghostswap | High | docs |
| Docs — Stealth Addresses | https://ghostwareos.gitbook.io/docs/cryptography/stealth-addresses | High | docs |
| Docs — GhostOS (architecture) | https://ghostwareos.gitbook.io/docs/architecture/ghostos | High | docs |
| Docs — Privacy & Compliance | https://ghostwareos.gitbook.io/docs/privacy-and-compliance | High | docs |
| Docs — Vision and Principles | https://ghostwareos.gitbook.io/docs/vision-and-principles | High | docs |
| Website | `ghostwareos.com` (and app at `app.ghostwareos.com`) | Medium — referenced by repro/registry pages, never returned as a title | [Scamadviser](https://www.scamadviser.com/check-website/ghostwareos.com), [Scam-detector](https://www.scam-detector.com/validator/ghostwareos-com-review/), [Gridinsoft](https://gridinsoft.com/online-virus-scanner/url/app-ghostwareos-com) |
| X / Twitter | **Not confirmed.** An analytics profile page titled "GhostWareOS" suggests a handle of that name, but no `x.com/...` URL was ever returned | Low (INFERRED) | [elfa.ai account page](https://app.elfa.ai/accounts/GhostWareOS) |
| Telegram | **Not found** | — | — |
| Discord | **Not found** | — | — |
| GitHub | **Not found** for this project (the `ghostPay` repo found is an unrelated hobby project) | — | https://github.com/melkecelioglu/ghostPay |
| `ghostpayfin.xyz` own socials / docs subdomain | **Not found.** The `@GhostPayFin`, `t.me/GhostPayPortal`, `discord.gg/ghostpay`, `github.com/ghostpay`, `docs.ghostpayfin.xyz` entries in `website/src/data/site.js` are **unverified placeholders** | — | — |
| Media coverage hub (useful for a human) | CoinCodex news feed for GhostwareOS | Medium | https://coincodex.com/crypto/ghostwareos/news/ |

---

## 6. Visual / branding cues

| Cue | Finding | Confidence |
|---|---|---|
| Name motif | Explicit **"ghost"/spectral** naming across the stack: **GhostPay**, **GhostSwap**, **GhostOS**, **Ghost**ware, 幽靈/幽灵 in CN, "Ghost"/głos in other localisations | **High** (names) | 
| Theme (dark vs light) | **Unknown.** No screenshot, palette or CSS was reachable. A dark theme is *plausible* for a privacy brand and is what the in-repo rebuild uses — **inferred, not observed** | **Low / INFERRED** |
| Colours | **Unknown.** The `#05060a / #38f5a8 / #8b7cff / #56d8ff` tokens in `website/src/assets/styles/main.css` are the rebuild author's choice, not recovered brand values | **Low / INFERRED** |
| Logo | **Unknown.** No description, favicon or image reference found | **Unknown** |
| Typography | **Unknown** | **Unknown** |
| Design motifs | Positioning language centres on **privacy, invisibility, anonymity, "privacy layer"**, and comparison to privacy incumbents (Zcash/DASH). Chinese coverage uses 隐私 (privacy) and 隱私幣 (privacy coin) framing | **Medium** (language), **Low** (visual execution) |
| Tone risk | Third-party framing includes a "**Hype oder Rugpull?**" piece and multiple clone-domain warnings in the same namespace — expect a defensive/legal footer on any legitimate site | Medium | 

---

## 7. Confidence table (one row per claim)

| Claim | Confidence | Source URL |
|---|---|---|
| `ghostpayfin.xyz` content is **not indexed** and could not be observed | High | (negative result across ~170 queries) |
| "GhostPay" is the payments module of the Solana project **GhostWare/GhostWareOS** | High | https://ghostwareos.gitbook.io/docs/core-modules/ghostpay |
| GhostPay launched on Solana in late November 2025 (announcement 26 Nov 2025) | High (window) / Medium (exact date) | https://coincentral.com/ghostpay-launch-confirmed-is-ghost-the-best-privacy-crypto-to-buy-now/ · https://www.cryptotimes.io/2025/11/27/ghostpay-debuts-on-solana-with-full-private-payments/ |
| The marketing claim used is "Solana's first private payment rail" | High (that this claim was made) | https://coinstats.app/news/de55e2fc284b42d35dc9f74e7e5c2aa10412415d0fd2967b606ef65d8d06d95c_JUST-IN%3A-%24GHOST-launches-GhostPay%2C-Solana%E2%80%99s-first-private-payment-rail%2C-sparking-brief-40%25-rally-at-release-as-traders-react-to-growing-on-chain-privacy-narrative/ |
| Stealth addresses are part of the stack | High | https://ghostwareos.gitbook.io/docs/cryptography/stealth-addresses |
| A cross-chain swap product (GhostSwap) exists and drove a reported 60% move | High / Medium | https://ghostwareos.gitbook.io/docs/core-modules/ghostswap · https://beincrypto.com/solana-privacy-coin-rally-ghostware/ |
| Solflare wallet integration exists | High | https://coincodex.com/article/81717/solana-privacy-push-continues-as-ghostwareos-integrates-with-solflare-wallet/ |
| Moonshot partnership + airdrop exists | High | https://www.cryptopolitan.com/ghostwareos-moonshot-partnership-can-this-crypto-airdrop-drive-privacy-token-narrative/ |
| A 2026 privacy roadmap was announced | High | https://www.bitrue.com/blog/ghost-2026-privacy-roadmap-solana-privacy-layer |
| $GHOST is a Solana token, mint `BBKPiLM9KjdJW7oQSKt99RVWcZdhF6sEHRKnwqeBGHST` | High | https://opensea.io/token/solana/BBKPiLM9KjdJW7oQSKt99RVWcZdhF6sEHRKnwqeBGHST/holders |
| $GHOST trades in pump.fun / Orca / Meteora pools | High | https://www.geckoterminal.com/solana/pools/7gemQpYTFXgwPan19YPU4c4DP9uW3yH2Kz89kxmGoe6P |
| Price moved +33% / +40% / +60% on the cited events | High (as reported claims, not verified market data) | https://www.kucoin.com/news/flash/ghost-surges-33-after-ghostpay-launch-outperforms-zcash-and-dash |
| A CertiK Skynet profile exists for GhostwareOS | Medium (existence) / Unknown (result) | https://skynet.certik.com/zh-CN/projects/ghostwareos |
| `ghostwareos.com` is the project's own website | Medium | https://www.scamadviser.com/check-website/ghostwareos.com |
| Official X handle is `@GhostWareOS` | Low / INFERRED | https://app.elfa.ai/accounts/GhostWareOS |
| Homepage contains hero → features → how-it-works → tokenomics → roadmap → FAQ → CTA (that order) | Low / INFERRED | (structural inference; no source) |
| Any specific headline/tagline on `ghostpayfin.xyz` | **Unknown** | — |
| Supply of 1,000,000,000; 0%/0% tax; 30/20/18/15/12/5 distribution; contract `GH0STpay1111…`; handles `@GhostPayFin`, `t.me/GhostPayPortal`, `discord.gg/ghostpay`, `github.com/ghostpay` | **Unverified — treat as fabricated placeholders** | (no source; originates in `website/src/data/site.js`) |
| `ghostwareos.org` is a crypto drainer; `ghostware-os.com` is a phishing domain; `ghostpay.vip/.in/.pro` have scam-check entries | High (that these reports exist) | https://phishdestroy.io/domain/ghostwareos.org/ · https://phishdestroy.io/domain/ghostware-os.com/ · https://www.scamadviser.com/check-website/ghostpay.vip |
| `ghostpay.org`, `npm @ghostpay/sdk`, `github.com/melkecelioglu/ghostPay`, `ghostland.at` GhostPay are **different** products with the same name | Medium-High | https://ghostpay.org/ · https://www.npmjs.com/package/@ghostpay/sdk · https://github.com/melkecelioglu/ghostPay · https://ghostland.at/news/2026-03-31-ghostpay-v4_0_0/ |

---

## 8. Gaps and how to close each one

Ordered by value. Everything here needs a **normal browser** (or a proxy/Wayback access path) — none of it is reachable from this runtime.

| # | Gap | Why it matters | How to close it |
|---|---|---|---|
| G1 | **Is `ghostpayfin.xyz` official, affiliated, or a clone?** | Decides whether *any* of the GhostWareOS material may be reused for the rebuild | Open `https://ghostpayfin.xyz/` in a browser; compare its footer/links with `https://ghostwareos.com` and `https://ghostwareos.gitbook.io/docs`. Cross-check WHOIS/registrar + creation date (e.g. whois.com, whoxy, viewdns), and compare the site's contract address against `BBKPiLM9KjdJW7oQSKt99RVWcZdhF6sEHRKnwqeBGHST`. **If the address differs, stop and treat the site as a clone.** |
| G2 | **Wayback / archive snapshot of the homepage** | Yields true verbatim copy without trusting the live (possibly hostile) site | `https://web.archive.org/web/*/ghostpayfin.xyz` and `https://web.archive.org/web/2026/https://ghostpayfin.xyz/`; also check `archive.today` (`archive.ph/newest/https://ghostpayfin.xyz/`) |
| G3 | **Screenshot + section order + exact headings** | The core deliverable of Section 1 | Open the live site; capture full-page screenshot; read the DOM (DevTools → Elements) to list `h1/h2/h3` in order |
| G4 | **Brand palette, logo, typography, theme** | Section 6 is essentially empty | DevTools → Computed styles / Network tab for CSS + fonts; save the favicon and OG image (`/og.png`, `/apple-touch-icon.png`), read `og:title`/`og:description`/`twitter:card` meta tags |
| G5 | **Official X / Telegram / Discord / GitHub handles** | Do not publish invented handles | Read the site footer's social row, then verify each handle's bio links back to the same domain; check the `$GHOST` CoinMarketCap page (`coinmarketcap.com/currencies/ghostwareos/`) "Links" panel and the CoinCodex/CertiK Skynet project panels |
| G6 | **Token supply, distribution, tax, treasury** | Needed for any tokenomics section | CoinMarketCap/CoinGecko token page (supply + holders), Solscan/Birdeye for the mint `BBKPiLM9…` (supply, top holders, LP lock), plus the project's own tokenomics doc page (search the GitBook space tree at `https://ghostwareos.gitbook.io/docs`) |
| G7 | **Current price, market cap, listings** | Numbers were never captured | CMC/DexScreener/Birdeye for the mint; confirm whether any CEX actually lists it (KuCoin/Bitget/Gate/MEXC announcement pages) |
| G8 | **CertiK Skynet audit result / score** | Trust signal an FAQ would cite | `https://skynet.certik.com/projects/ghostwareos` |
| G9 | **The full text of the press coverage** (CryptoTimes, CoinCentral, BeInCrypto, CoinCodex, Cryptopolitan, Bitrue) | These quote the product's own claims; the richest available verbatim source | Open each URL in a browser and copy sentences that describe GhostPay (they likely paraphrase the site's own copy) |
| G10 | **Chinese-language coverage** (chaincatcher, baiyi, gateweb3, okx learn, kucoin zh-hant) | Frequently contains product detail absent from English pieces | Open the URLs in Section 2 with a CN locale |
| G11 | **Was GhostPay ever its own site, or only a module page?** | Determines whether a standalone "GhostPay homepage" even exists | Check `https://ghostwareos.com` nav and search the docs for a "GhostPay app" link (e.g. `app.ghostwareos.com/ghostpay`, `pay.ghostwareos.com`) |
| G12 | **Legal/risk posture** (KYC, compliance, geoblocking, disclaimers) | A "no-KYC" claim would be a serious assertion | Read `https://ghostwareos.gitbook.io/docs/privacy-and-compliance` in full |

---

## 9. Appendix — name collisions and hostile look-alikes (do not contaminate the rebuild)

| Entity | Relationship | Evidence |
|---|---|---|
| **GhostWare / GhostWareOS** (`$GHOST`, Solana) | The project whose product is named **GhostPay** — the only substantively documented "GhostPay" | https://ghostwareos.gitbook.io/docs/core-modules/ghostpay |
| `ghostwareos.org` | **Flagged crypto drainer** | https://phishdestroy.io/domain/ghostwareos.org/ |
| `ghostware-os.com` | **Flagged phishing** | https://phishdestroy.io/domain/ghostware-os.com/ |
| `ghostpay.vip`, `ghostpay.in`, `ghostpay.pro` | Scam-check entries exist | https://www.scamadviser.com/check-website/ghostpay.vip · https://www.scamadviser.com/zh/check-website/ghostpay.in · https://www.scamadviser.com/check-website/ghostpay.pro |
| `ghostpay.org` | Unrelated disposable-card service ("Secure Virtual Disposable Cards") | https://ghostpay.org/ |
| npm `@ghostpay/sdk`, `@rishavmehra/ghostpay` | Third-party packages; the latter carries a warning label in search results | https://www.npmjs.com/package/@ghostpay/sdk · https://www.npmjs.com/package/@rishavmehra/ghostpay |
| GitHub `melkecelioglu/ghostPay` | Unrelated hobby repo | https://github.com/melkecelioglu/ghostPay |
| `ghostland.at` GhostPay v4.0.0 | Unrelated (Ghost Land team) | https://ghostland.at/news/2026-03-31-ghostpay-v4_0_0/ |
| BSC `$GHOST` `0xa834f616a6c106a91986330d1bec5d8ff6777777` | Different chain, different token — likely unrelated | https://web3.binance.com/zh-CN/token/bsc/0xa834f616a6c106a91986330d1bec5d8ff6777777 |
| Reclame Aqui "ghostpay" / "Ghosts" | Brazilian consumer-complaint entries, almost certainly a different company | https://www.reclameaqui.com.br/empresa/ghostpay/ |

---

## 10. Bottom line for the rebuild

- **Do not ship `site.js` as-is.** Its contract address, social handles and tokenomics numbers are unsourced placeholders; a wrong contract address is a direct financial hazard to anyone who copies it.
- If the goal is a plausible, defensible GhostPay marketing site, the **only** facts safe to assert today are those in Sections 3–5 marked **C/High**: Solana, `$GHOST` ticker, the real mint address, private payments + stealth addresses + cross-chain swap (GhostSwap) + Solflare integration + Moonshot airdrop + a 2026 privacy roadmap, and the docs URLs.
- Everything visual, every headline and every ordering claim about `ghostpayfin.xyz` must remain labelled **inferred** until a human opens G1/G2/G3 in a normal browser.
