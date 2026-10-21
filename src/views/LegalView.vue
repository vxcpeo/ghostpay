<script setup>
import { computed } from 'vue'
import { site } from '@/data/site'

const props = defineProps({
  kind: { type: String, default: 'privacy' }
})

const content = computed(() =>
  props.kind === 'terms'
    ? {
        title: 'Terms of Use',
        lead: `These terms govern your use of the Veilary protocol interfaces published at ${site.domain}. By connecting a wallet you accept them.`,
        sections: [
          {
            h: '1. Non-custodial software',
            p: 'Veilary is non-custodial software. We never take possession of your assets, your keys or your identity. You are solely responsible for the security of your wallet, your seed phrase and every transaction you sign.'
          },
          {
            h: '2. No financial advice',
            p: `Nothing published on this website constitutes financial, legal, accounting or tax advice. ${site.ticker} is a utility token for a decentralised protocol; its value may fall to zero. Do your own research.`
          },
          {
            h: '3. Acceptable use',
            p: 'You agree not to use Veilary to violate any law applicable to you, including sanctions, anti-fraud and tax obligations. Privacy is a legitimate default, but it is not a licence to break the law.'
          },
          {
            h: '4. Availability and changes',
            p: 'The protocol and these interfaces are provided “as is”, without warranty of any kind. Features, fee curves and supported networks may change as governance evolves.'
          },
          {
            h: '5. Limitation of liability',
            p: 'To the maximum extent permitted by law, the Veilary contributors are not liable for any loss of funds, data or profits arising from your use of the protocol or any third-party wallet, bridge or exchange.'
          },
          {
            h: '6. Contact',
            p: `Questions about these terms can be raised in the community channels linked in the footer of ${site.domain}.`
          }
        ]
      }
    : {
        title: 'Privacy Policy',
        lead: `Veilary is built so that there is almost nothing to write a privacy policy about. Here is exactly what happens to data when you use ${site.domain}.`,
        sections: [
          {
            h: '1. What we collect',
            p: 'The marketing website collects no personal data by default: no account, no cookies for advertising, no fingerprinting, no third-party analytics trackers. If you voluntarily join the early access list, we store only the email address you submit.'
          },
          {
            h: '2. What the protocol sees',
            p: 'The protocol processes payments, not identities. Funds arrive at one-time stealth addresses and payment instructions are sealed with HPKE, so the link between a sender and a receiver is not recorded anywhere, including by us.'
          },
          {
            h: '3. Logs',
            p: 'We do not retain IP addresses, device identifiers or request metadata associated with your wallet activity, and the protocol has no account system that could tie activity to a person in the first place.'
          },
          {
            h: '4. Your rights',
            p: 'Because we hold no identity data, there is normally nothing to export or erase. If you joined the early access list, you can request deletion at any time through the community channels and we will remove your address.'
          },
          {
            h: '5. Third parties',
            p: 'Wallets, RPC providers, bridges and exchanges you choose to interact with are independent of Veilary and operate under their own policies. Review them before use.'
          }
        ]
      }
)
</script>

<template>
  <article class="statute">
    <div class="module module--first statute__opening">
      <div class="module__inner">
        <div class="module__bar">
          <p class="kicker">Legal</p>
        </div>
        <p class="statute__stamp">Last updated: <time>{{ new Date().getFullYear() }}</time></p>
        <h1 class="statute__title">{{ content.title }}</h1>
        <p class="statute__lead">{{ content.lead }}</p>
      </div>
    </div>

    <div class="module statute__reading">
      <div class="module__inner">
        <div class="statute__grid">
          <div class="statute__rail" aria-hidden="true" />

          <div class="statute__wall">
            <section v-for="s in content.sections" :key="s.h" class="statute__section">
              <h2 class="statute__heading"><code>{{ s.h }}</code></h2>
              <p class="statute__copy">{{ s.p }}</p>
            </section>
          </div>

          <div class="statute__meta" aria-hidden="true" />
        </div>

        <div class="statute__back">
          <router-link class="cmd cmd--ghost" to="/">Back to home</router-link>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.statute__opening {
  padding-block: clamp(40px, 7vw, 96px) clamp(28px, 4vw, 52px);
  overflow: clip;
}

.statute__stamp {
  margin-top: 14px;
  color: var(--faint);
  font-family: var(--mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.statute__title {
  max-width: 18ch;
  margin-top: clamp(12px, 1.8vw, 20px);
  color: var(--ink);
  font-size: clamp(2.3rem, 5.6vw, 4.8rem);
  line-height: 0.94;
  letter-spacing: -0.045em;
}

.statute__lead {
  max-width: 58ch;
  margin-top: clamp(18px, 2.4vw, 28px);
  color: var(--dim);
  font-size: clamp(1rem, 1.15vw, 1.12rem);
  line-height: 1.7;
}

.statute__reading {
  padding-block: clamp(20px, 3vw, 40px) clamp(52px, 7vw, 96px);
}

.statute__grid {
  display: grid;
  grid-template-columns: minmax(60px, 0.14fr) minmax(0, 1fr) minmax(120px, 0.22fr);
  gap: clamp(14px, 2.4vw, 34px);
  align-items: start;
}

.statute__rail {
  align-self: stretch;
  border-right: 1px solid var(--edge);
  background-image: repeating-linear-gradient(
    180deg,
    var(--edge-2) 0 1px,
    transparent 1px 26px
  );
  background-size: 14px 100%;
  background-repeat: no-repeat;
  min-height: 100%;
}

.statute__wall {
  min-width: 0;
  padding: clamp(18px, 3vw, 36px);
  border: 1px solid var(--edge-2);
  border-radius: var(--r-md);
  background: var(--deck);
}

.statute__section {
  display: grid;
  gap: 9px;
}

.statute__section + .statute__section {
  margin-top: clamp(20px, 2.8vw, 32px);
  padding-top: clamp(20px, 2.8vw, 32px);
  border-top: 1px dashed var(--edge-2);
}

.statute__heading {
  color: var(--ink);
  font-size: clamp(1.06rem, 1.6vw, 1.32rem);
  line-height: 1.18;
}

.statute__copy {
  color: var(--dim);
  font-size: 0.98rem;
  line-height: 1.78;
}

.statute__meta {
  align-self: stretch;
  min-height: 220px;
  border-left: 1px solid var(--edge);
  background-image: radial-gradient(circle at center, var(--edge-2) 0 1px, transparent 1px);
  background-size: 12px 12px;
  opacity: 0.55;
}

.statute__back {
  display: flex;
  justify-content: flex-start;
  margin-top: clamp(24px, 3.4vw, 40px);
}

@media (max-width: 980px) {
  .statute__grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .statute__rail,
  .statute__meta {
    display: none;
  }
}

@media (max-width: 640px) {
  .statute__title {
    font-size: clamp(2.1rem, 11vw, 3rem);
  }
}
</style>
