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
        lead: `These terms govern your use of the Seclura protocol interfaces published at ${site.domain}. By connecting a wallet you accept them.`,
        sections: [
          {
            h: '1. Non-custodial software',
            p: 'Seclura is non-custodial software. We never take possession of your assets, your keys or your identity. You are solely responsible for the security of your wallet, your seed phrase and every transaction you sign.'
          },
          {
            h: '2. No financial advice',
            p: `Nothing published on this website constitutes financial, legal, accounting or tax advice. ${site.ticker} is a utility token for a decentralised protocol; its value may fall to zero. Do your own research.`
          },
          {
            h: '3. Acceptable use',
            p: 'You agree not to use Seclura to violate any law applicable to you, including sanctions, anti-fraud and tax obligations. Privacy is a legitimate default, but it is not a licence to break the law.'
          },
          {
            h: '4. Availability and changes',
            p: 'The protocol and these interfaces are provided “as is”, without warranty of any kind. Features, fee curves and supported networks may change as governance evolves.'
          },
          {
            h: '5. Limitation of liability',
            p: 'To the maximum extent permitted by law, the Seclura contributors are not liable for any loss of funds, data or profits arising from your use of the protocol or any third-party wallet, bridge or exchange.'
          },
          {
            h: '6. Contact',
            p: `Questions about these terms can be raised in the community channels linked in the footer of ${site.domain}.`
          }
        ]
      }
    : {
        title: 'Privacy Policy',
        lead: `Seclura is built so that there is almost nothing to write a privacy policy about. Here is exactly what happens to data when you use ${site.domain}.`,
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
            p: 'Wallets, RPC providers, bridges and exchanges you choose to interact with are independent of Seclura and operate under their own policies. Review them before use.'
          }
        ]
      }
)
</script>

<template>
  <article class="legal">
    <div class="scene scene--tall legal__opening">
      <div class="scene__inner">
        <p class="tide-kicker">Legal</p>
        <p class="legal__stamp">Last updated: {{ new Date().getFullYear() }}</p>
        <h1 class="legal__title">{{ content.title }}</h1>
        <p class="legal__lead">{{ content.lead }}</p>
      </div>
    </div>

    <div class="scene legal__reading">
      <div class="scene__inner">
        <div class="legal__wall">
          <section v-for="s in content.sections" :key="s.h" class="legal__section">
            <h2 class="legal__heading">{{ s.h }}</h2>
            <p class="legal__copy">{{ s.p }}</p>
          </section>
        </div>

        <div class="legal__back">
          <router-link class="tide-button tide-button--line" to="/">Back to home</router-link>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.legal__opening {
  padding-block: clamp(96px, 12vw, 150px) clamp(48px, 6vw, 80px);
  overflow: clip;
}

.legal__opening::before {
  content: "";
  position: absolute;
  top: 50%;
  right: -10%;
  width: min(44vw, 600px);
  aspect-ratio: 1;
  border: 1px solid rgba(41, 141, 255, 0.22);
  border-radius: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.legal__opening::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 2%;
  width: min(26vw, 360px);
  aspect-ratio: 1;
  border: 1px dashed rgba(41, 141, 255, 0.24);
  border-radius: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.legal__stamp {
  margin-top: 18px;
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.legal__title {
  max-width: 18ch;
  margin-top: clamp(14px, 2vw, 22px);
  font-size: clamp(2.7rem, 6.4vw, 5.4rem);
  line-height: 0.92;
  letter-spacing: -0.055em;
}

.legal__lead {
  max-width: 56ch;
  margin-top: clamp(20px, 2.6vw, 30px);
  color: var(--muted);
  font-size: clamp(1.02rem, 1.2vw, 1.14rem);
  line-height: 1.7;
}

.legal__reading {
  padding-block: clamp(20px, 3vw, 40px) clamp(56px, 8vw, 110px);
}

.legal__wall {
  display: grid;
  gap: clamp(26px, 3.6vw, 46px);
  width: min(100%, 720px);
  margin-inline: auto;
  padding: clamp(22px, 3.4vw, 46px);
  border-radius: var(--radius-xl);
  background:
    radial-gradient(110% 80% at 100% 0%, #ffffff 0%, rgba(255, 255, 255, 0) 52%),
    var(--surface-alt);
  box-shadow: var(--shadow);
}

.legal__section {
  display: grid;
  gap: 10px;
}

.legal__section + .legal__section {
  padding-top: clamp(22px, 3vw, 34px);
  border-top: 1px solid rgba(179, 210, 236, 0.55);
}

.legal__heading {
  font-size: clamp(1.16rem, 1.8vw, 1.5rem);
  line-height: 1.14;
}

.legal__copy {
  color: var(--muted);
  font-size: 1rem;
  line-height: 1.8;
}

.legal__back {
  display: flex;
  justify-content: center;
  margin-top: clamp(28px, 4vw, 48px);
}

@media (max-width: 640px) {
  .legal__title {
    font-size: clamp(2.4rem, 12vw, 3.2rem);
  }
}
</style>
