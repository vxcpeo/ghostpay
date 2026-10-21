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
  <footer class="colophon">
    <div class="colophon__inner">
      <div class="colophon__top">
        <a class="colophon__brand" href="#home" aria-label="Veilary home">
          <span class="colophon__mark">
            <Icon name="veilary" :size="20" :stroke="1.5" />
          </span>
          <code class="colophon__word">{{ site.name }}</code>
        </a>

        <p class="colophon__blurb">
          The private payment rail for Solana. Stealth addresses, HPKE-sealed instructions and
          non-custodial settlement — powered by {{ site.ticker }}.
        </p>

        <div class="colophon__socials">
          <a
            v-for="s in socials"
            :key="s.label"
            class="colophon__social"
            :class="{ 'colophon__social--pending': s.href === '#' }"
            :href="s.href === '#' ? undefined : s.href"
            :target="s.href === '#' ? undefined : '_blank'"
            :rel="s.href === '#' ? undefined : 'noopener'"
            :aria-label="s.href === '#' ? `${s.label} (link pending)` : s.label"
            :aria-disabled="s.href === '#' ? 'true' : undefined"
            :title="`${s.label} — ${s.handle}`"
          >
            <Icon :name="s.icon" :size="16" />
          </a>
        </div>
      </div>

      <div class="colophon__index">
        <div v-for="col in columns" :key="col.title" class="colophon__group">
          <h4 class="colophon__group-title"><small>{{ col.title }}</small></h4>
          <ul class="colophon__links">
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

      <div class="colophon__notice">
        <strong>Risk notice.</strong> Nothing on this website is financial, legal or tax advice.
        {{ site.ticker }} is a utility token for a decentralised protocol and its value can go to
        zero. Always copy the official mint address from the project’s own channels before trading —
        impersonator tokens are common — and never share your seed phrase. {{ site.name }} is
        non-custodial software: you alone control your keys and your funds. This is an independent
        demonstration project and is not operated by the GhostWareOS team.
      </div>

      <div class="colophon__base">
        <p class="colophon__copy">© <time>{{ year }}</time> {{ site.name }}. All rights reserved.</p>
        <div class="colophon__legal">
          <router-link to="/privacy">Privacy Policy</router-link>
          <span class="colophon__sep" aria-hidden="true" />
          <router-link to="/terms">Terms of Use</router-link>
          <span class="colophon__sep" aria-hidden="true" />
          <a :href="site.url" target="_blank" rel="noopener"><code>{{ site.domain }}</code></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.colophon__copy {
  margin: 0;
  color: var(--faint);
}
</style>
