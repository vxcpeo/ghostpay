/**
 * Single source of truth for every piece of site copy, link and number.
 *
 * Reconstructed from public research on the original project / GhostWareOS. The original live
 * site could not be fetched from the authoring environment (its runtime refuses every hostname),
 * though its DNS was verified live — see docs/environment-notes.md and docs/research-brief.md.
 * The Seclura identity is new: seclura.xyz and @seclura are confirmed available but not
 * registered. Every value that could
 * not be sourced is a labelled placeholder in the UI.
 */

export const site = {
  name: 'Seclura',
  domain: 'seclura.xyz',
  url: 'https://seclura.xyz/',
  tagline: 'Private Payments, Invisible by Design',
  ticker: '$GHOST',
  chain: 'Solana',
  description:
    'Seclura is the private payment rail for Solana — money that settles in under a second while the sender, the receiver and the amount stay off the public record.',
  // VERIFIED Solana SPL mint for $GHOST (GhostwareOS), cross-checked against Solflare,
  // DEXrabbit and GeckoTerminal. Confirm it on the official site before publishing.
  contract: 'BBKPiLM9KjdJW7oQSKt99RVWcZdhF6sEHRKnwqeBGHST',
  audit: 'Non-custodial · No KYC · Stealth addresses + HPKE shielding'
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Tokenomics', href: '#tokenomics' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'FAQ', href: '#faq' }
]

/**
 * ⚠️ The X handle @seclura is confirmed available but not registered yet; the Telegram, Discord
 * and GitHub profiles remain unverified placeholders. `docs` points at the GhostWareOS GitBook.
 */
export const socials = [
  { label: 'X / Twitter', handle: '@seclura', href: 'https://x.com/seclura', icon: 'x' },
  { label: 'Telegram', handle: 'handle TBA', href: '#', icon: 'telegram' },
  { label: 'Discord', handle: 'handle TBA', href: '#', icon: 'discord' },
  { label: 'GitHub', handle: 'repo TBA', href: '#', icon: 'github' },
  {
    label: 'Docs',
    handle: 'ghostwareos.gitbook.io',
    href: 'https://ghostwareos.gitbook.io/docs/core-modules/ghostpay',
    icon: 'book'
  }
]

export const docsUrl = 'https://ghostwareos.gitbook.io/docs/core-modules/ghostpay'

export const heroStats = [
  { value: '<1s', label: 'Settlement on Solana' },
  { value: '0', label: 'Identity data required' },
  { value: '1', label: 'Chain to start on' },
  { value: '100%', label: 'Non-custodial' }
]

/**
 * Only Solana is confirmed as a Seclura network. The rest are ecosystems reached through
 * GhostSwap / the wider privacy stack, or aspirational — listed here as an ecosystem marquee.
 */
export const trustLogos = [
  'Solana',
  'GhostSwap',
  'Solflare',
  'Moonshot',
  'GhostOS',
  'DarkRelay',
  'ID Obfuscation Layer',
  'GhostWareOS'
]

export const features = [
  {
    icon: 'mask',
    title: 'Stealth Addresses',
    text: 'Every incoming payment lands on a fresh one-time address derived from your keys, so two payments can never be linked back to the same wallet. Stealth address derivation is a documented core module.'
  },
  {
    icon: 'bolt',
    title: 'Sub-second Settlement',
    text: 'Built on Solana throughput — the first private payment rail on the network. Payments finalise in under a second instead of waiting in a mixer queue.'
  },
  {
    icon: 'lock',
    title: 'HPKE-Shielded Payloads',
    text: 'Payment instructions are sealed with hybrid public-key encryption, so the contents of a transfer are readable only by its intended recipient.'
  },
  {
    icon: 'key',
    title: 'Non-Custodial by Default',
    text: 'Seclura never holds your funds or your keys. Your seed phrase stays in your wallet; the protocol only ever sees a payment it can validate, never a balance it controls.'
  },
  {
    icon: 'shield',
    title: 'Privacy as a Core Module',
    text: 'The privacy design follows the GhostWareOS payments module, alongside GhostSwap, the ID Obfuscation Layer and DarkRelay messaging — not a bolt-on mixer.'
  },
  {
    icon: 'globe',
    title: 'One Balance, Many Chains',
    text: 'GhostSwap extends the same private balance cross-chain, so funds can move between ecosystems without exposing the wallet that holds them.'
  },
  {
    icon: 'wallet',
    title: 'Wallet-Native',
    text: 'Swap and pay without leaving your wallet — the flow is designed for integrations like Solflare, so privacy is one tap rather than a separate app.'
  },
  {
    icon: 'eyeOff',
    title: 'No Identity, No Logs',
    text: 'No accounts, no KYC queue and no identity data to leak. You connect a wallet and the protocol does the rest.'
  }
]

export const steps = [
  {
    step: '01',
    title: 'Connect your Solana wallet',
    text: 'Phantom, Solflare, Backpack or any wallet you already use. No account, no email, no identity — connecting is the only onboarding step.'
  },
  {
    step: '02',
    title: 'Fund your private balance',
    text: 'Move SOL or SPL tokens into Seclura. Stealth addresses are derived from your own keys, so the deposit never publishes where your future payments will land.'
  },
  {
    step: '03',
    title: 'Pay to a stealth address',
    text: 'Send to a fresh one-time address with the payment instructions sealed by HPKE. The recipient sees the money; the public ledger sees nothing that links the two of you.'
  },
  {
    step: '04',
    title: 'Spend or swap across chains',
    text: 'Use the balance directly, or route it through GhostSwap to move value into another ecosystem without exposing the wallet that holds it.'
  }
]

/**
 * ⚠️ ILLUSTRATIVE NUMBERS — supply, distribution and tax are NOT published by the project in any
 * source that could be verified. The figures below are placeholders for layout purposes and are
 * labelled as such in the UI. Replace them with the official figures (or delete the split) once
 * they are confirmed, and remove `tokenomics.disclaimer` at the same time.
 */
export const tokenomics = {
  supply: '1,000,000,000',
  tax: '0% buy / 0% sell',
  illustrative: true,
  disclaimer:
    'Supply, tax and the allocation shown in the chart are illustrative placeholders — the project has not published official tokenomics in any source we could verify. Confirm every figure on the official channels before making any decision.',
  distribution: [
    { label: 'Liquidity & Market Making', pct: 30, color: '#38f5a8' },
    { label: 'Privacy R&D & Audits', pct: 20, color: '#56d8ff' },
    { label: 'Ecosystem & Privacy Incentives', pct: 18, color: '#8b7cff' },
    { label: 'Community & Airdrops', pct: 15, color: '#ffd166' },
    { label: 'Core Contributors', pct: 12, color: '#ff8ba7' },
    { label: 'Treasury Reserve', pct: 5, color: '#7c8ba1' }
  ],
  utility: [
    'Access and fee discounts across the private payment rail',
    'Staking for ecosystem and community incentive programmes',
    'Governance over how the privacy stack evolves',
    'Priority access to new privacy modules as they ship'
  ]
}

/**
 * Milestones marked `done` correspond to publicly reported events (launch date announcement,
 * the 26 Nov 2025 Solana launch, the Solflare integration, the Moonshot airdrop and the published
 * 2026 privacy roadmap). Later phases are the project's stated direction, restated here.
 */
export const roadmap = [
  {
    phase: 'Phase 01',
    status: 'done',
    title: 'Private Payment Rail',
    items: [
      'Launch date announced for the first private payment rail on Solana',
      'Stealth address derivation shipped as a core cryptography module',
      'HPKE-sealed payment payloads in production',
      'Private payment module live on Solana mainnet'
    ]
  },
  {
    phase: 'Phase 02',
    status: 'done',
    title: 'Ecosystem Reach',
    items: [
      'Solflare wallet integration for in-wallet private payments',
      'Moonshot partnership with a community airdrop',
      'Cross-chain swap reveal via GhostSwap',
      'Recognition as a leading privacy narrative on Solana'
    ]
  },
  {
    phase: 'Phase 03',
    status: 'active',
    title: 'Privacy Layer',
    items: [
      '2026 privacy roadmap: building the privacy layer of Solana',
      'ID Obfuscation Layer and DarkRelay messaging modules',
      'GhostOS as the operating surface for the stack',
      'Continued independent security review'
    ]
  },
  {
    phase: 'Phase 04',
    status: 'next',
    title: 'Private By Default',
    items: [
      'Merchant and payment-request tooling on the private rail',
      'Deeper cross-chain coverage through GhostSwap',
      'Open SDK so other Solana apps can embed Seclura',
      'Governance over privacy parameters and fee curves'
    ]
  }
]

export const faqs = [
  {
    q: 'What is Seclura, and how is it different from ordinary crypto payments?',
    a: 'Seclura is a private payment rail on Solana. Ordinary crypto payments publish the sender, the receiver and the amount on a public ledger forever. Seclura keeps the payment valid and final while keeping who-paid-whom out of the public record.'
  },
  {
    q: 'How does the privacy actually work — is it a mixer?',
    a: 'It is not a mixer and there is no shared pool. Seclura uses stealth addresses, so each payment arrives at a fresh one-time address, and seals payment instructions with HPKE hybrid encryption so only the intended recipient can read them. Your privacy does not depend on other people joining a pool.'
  },
  {
    q: 'Do I need to complete KYC?',
    a: 'No. Seclura is non-custodial and permissionless: no sign-up, no identity document, no email. You connect a wallet and the protocol does the rest.'
  },
  {
    q: 'Which chain does it run on?',
    a: 'The private payment rail launched on Solana in late November 2025, and GhostSwap extends the same private balance across other ecosystems. Solana is the only chain confirmed by public sources — treat any other claim as unverified until the project states it directly.'
  },
  {
    q: 'Who holds my funds?',
    a: 'You do. Seclura is non-custodial — the protocol never takes possession of your assets or your private keys, and it cannot freeze, reverse or seize a payment.'
  },
  {
    q: 'How do I buy $GHOST?',
    a: 'Acquire $GHOST on a Solana DEX or a listed venue using the official mint address, then hold it in any Solana-compatible wallet. Always copy the contract address from the project’s own channels — impersonator tokens are common in this sector.'
  },
  {
    q: 'What does $GHOST do?',
    a: 'It is the utility token of the privacy stack: it gives access to the private payment rail, backs ecosystem incentive programmes, and is intended to carry governance rights over how the stack evolves.'
  },
  {
    q: 'Is privacy legal where I live?',
    a: 'Financial privacy is a legitimate expectation in most jurisdictions. Even so, you are responsible for complying with the laws that apply to you. Seclura is software; using it to break the law is not permitted under our Terms of Use.'
  }
]

export const brandPillars = [
  {
    title: 'Privacy is a right, not a feature',
    text: 'Your salary, your suppliers and your savings are nobody else’s business. Every product decision in the stack follows from that one sentence.'
  },
  {
    title: 'Cryptography, not promises',
    text: 'Stealth addresses and HPKE-sealed payloads do the work. You should never have to trust a company’s logging policy to keep a payment private.'
  },
  {
    title: 'Private by default',
    text: 'Privacy that has to be switched on is privacy most people never use. On the Seclura rail, private is the only mode there is.'
  }
]
