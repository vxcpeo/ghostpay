<script setup>
import Icon from '@/components/Icon.vue'
import { navLinks, site, socials } from '@/data/site'

const year = new Date().getFullYear()

const columns = [
  { title: 'Product', links: navLinks.slice(1, 5) },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: 'https://ghostwareos.gitbook.io/docs/core-modules/ghostpay' },
      { label: 'Cryptography', href: 'https://ghostwareos.gitbook.io/docs/cryptography/stealth-addresses' },
      { label: 'Vision & principles', href: 'https://ghostwareos.gitbook.io/docs/vision-and-principles' },
      { label: 'Whitepaper', href: site.url }
    ]
  },
  {
    title: 'Community',
    links: [
      { label: 'Documentation', href: 'https://ghostwareos.gitbook.io/docs' },
      { label: 'Payment module', href: 'https://ghostwareos.gitbook.io/docs/core-modules/ghostpay' },
      { label: 'GhostSwap', href: 'https://ghostwareos.gitbook.io/docs/core-modules/ghostswap' },
      { label: 'Privacy & compliance', href: 'https://ghostwareos.gitbook.io/docs/privacy-and-compliance' }
    ]
  }
]
</script>

<template>
  <footer class="shore">
    <div class="shore__inner">
      <div class="shore__crest">
        <a class="shore__brand" href="#home" aria-label="Seclura home">
          <span class="shore__sigil">
            <Icon name="seclura" :size="22" :stroke="1.35" />
          </span>
          <span class="shore__word">{{ site.name }}</span>
        </a>

        <p class="shore__blurb">
          The private payment rail for Solana. Stealth addresses, HPKE-sealed instructions and
          non-custodial settlement — powered by {{ site.ticker }}.
        </p>

        <div class="shore__socials">
          <a
            v-for="s in socials"
            :key="s.label"
            class="shore__social"
            :class="{ 'shore__social--pending': s.href === '#' }"
            :href="s.href === '#' ? undefined : s.href"
            :target="s.href === '#' ? undefined : '_blank'"
            :rel="s.href === '#' ? undefined : 'noopener'"
            :aria-label="s.href === '#' ? `${s.label} (link pending)` : s.label"
            :aria-disabled="s.href === '#' ? 'true' : undefined"
            :title="`${s.label} — ${s.handle}`"
          >
            <Icon :name="s.icon" :size="17" />
          </a>
        </div>
      </div>

      <div class="shore__index">
        <div v-for="col in columns" :key="col.title" class="shore__group">
          <h4 class="shore__group-title">{{ col.title }}</h4>
          <ul class="shore__links">
            <li v-for="link in col.links" :key="link.label">
              <a
                :href="link.href"
                :target="link.href.startsWith('http') ? '_blank' : undefined"
                :rel="link.href.startsWith('http') ? 'noopener' : undefined"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="shore__notice">
        <strong>Risk notice.</strong> Nothing on this website is financial, legal or tax advice.
        {{ site.ticker }} is a utility token for a decentralised protocol and its value can go to
        zero. Always copy the official mint address from the project’s own channels before trading —
        impersonator tokens are common — and never share your seed phrase. {{ site.name }} is
        non-custodial software: you alone control your keys and your funds. This is an independent
        demonstration project and is not operated by the GhostWareOS team.
      </div>

      <div class="shore__base">
        <p class="shore__copy">© {{ year }} {{ site.name }}. All rights reserved.</p>
        <div class="shore__legal">
          <router-link to="/privacy">Privacy Policy</router-link>
          <span class="shore__sep" aria-hidden="true" />
          <router-link to="/terms">Terms of Use</router-link>
          <span class="shore__sep" aria-hidden="true" />
          <a :href="site.url" target="_blank" rel="noopener">{{ site.domain }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.shore {
  position: relative;
  z-index: 1;
  margin-top: clamp(40px, 6vw, 90px);
  padding-block: clamp(56px, 7vw, 96px) clamp(112px, 14vw, 152px);
  border-top: 1px solid var(--line);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  background:
    radial-gradient(120% 90% at 84% 0%, #ffffff 0%, rgba(255, 255, 255, 0) 55%),
    var(--surface-alt);
}

.shore__inner {
  width: min(100% - 2 * var(--gutter), var(--shell));
  margin-inline: auto;
}

.shore__crest {
  display: grid;
  grid-template-columns: minmax(220px, 0.7fr) minmax(0, 1.5fr) auto;
  gap: clamp(20px, 3.6vw, 56px);
  align-items: start;
}

.shore__brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.shore__sigil {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--ink);
  color: var(--shade-ink);
}

.shore__word {
  font-family: var(--font-display);
  font-size: 1.42rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.05em;
}

.shore__blurb {
  max-width: 46ch;
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.68;
}

.shore__socials {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.shore__social {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  color: var(--ink);
  transition:
    background var(--motion) var(--ease),
    color var(--motion) var(--ease),
    border-color var(--motion) var(--ease);
}

.shore__social:hover {
  border-color: var(--ink);
  background: var(--ink);
  color: var(--shade-ink);
}

.shore__social--pending {
  opacity: 0.42;
  cursor: not-allowed;
}

.shore__social--pending:hover {
  border-color: var(--line-strong);
  background: transparent;
  color: var(--ink);
}

.shore__index {
  display: grid;
  gap: 0;
  margin-top: clamp(28px, 4vw, 52px);
  border-top: 1px solid var(--line-strong);
}

.shore__group {
  display: grid;
  grid-template-columns: minmax(120px, 0.42fr) minmax(0, 1fr);
  gap: clamp(14px, 3vw, 44px);
  align-items: baseline;
  padding-block: 15px;
  border-bottom: 1px solid var(--line);
}

.shore__group-title {
  color: var(--accent-safe);
  font-family: var(--font-mono);
  font-size: 0.64rem;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.shore__links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 26px;
}

.shore__links a {
  color: var(--ink);
  font-size: 0.94rem;
  line-height: 1.4;
  transition: color var(--motion) var(--ease);
}

.shore__links a:hover {
  color: var(--accent-safe);
  text-decoration: underline;
  text-underline-offset: 4px;
}

.shore__notice {
  margin-top: clamp(26px, 3.4vw, 40px);
  padding: clamp(16px, 2vw, 22px);
  border-left: 3px solid var(--warning);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  background: rgba(255, 255, 255, 0.78);
  color: var(--muted);
  font-size: 0.84rem;
  line-height: 1.74;
}

.shore__notice strong {
  color: var(--warning);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.shore__base {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 14px 30px;
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.82rem;
}

.shore__legal {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.shore__legal a {
  color: var(--ink);
  transition: color var(--motion) var(--ease);
}

.shore__legal a:hover {
  color: var(--accent-safe);
  text-decoration: underline;
  text-underline-offset: 4px;
}

.shore__sep {
  width: 1px;
  height: 11px;
  background: var(--line-strong);
}

@media (max-width: 1180px) {
  .shore__crest {
    grid-template-columns: minmax(0, 1fr) auto;
  }

  .shore__blurb {
    grid-column: 1 / -1;
    grid-row: 2;
    max-width: 62ch;
  }
}

@media (max-width: 820px) {
  .shore__crest {
    grid-template-columns: minmax(0, 1fr);
    gap: 18px;
  }

  .shore__group {
    grid-template-columns: minmax(0, 1fr);
    gap: 8px;
  }

  .shore__blurb {
    grid-column: auto;
    grid-row: auto;
  }
}
</style>
