<script setup>
import { computed, ref } from 'vue'
import Icon from '@/components/Icon.vue'
import { heroStats, site, trustLogos } from '@/data/site'

const copied = ref(false)
const shortContract = computed(() =>
  site.contract.length > 18
    ? `${site.contract.slice(0, 8)}…${site.contract.slice(-6)}`
    : site.contract
)

function go(href) {
  const el = document.querySelector(href)
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 18, behavior: 'smooth' })
}

async function copyContract() {
  try {
    if (!navigator.clipboard) throw new Error('clipboard unavailable')
    await navigator.clipboard.writeText(site.contract)
    copied.value = true
    window.setTimeout(() => (copied.value = false), 1800)
  } catch {
    copied.value = false
  }
}
</script>

<template>
  <section id="home" class="splash">
    <div class="splash__inner">
      <div class="splash__copy">
        <p class="splash__stamp">
          <span class="splash__chain">{{ site.chain }}</span>
          <span class="splash__date">mainnet · live private payments</span>
        </p>

        <h1 class="splash__title">
          Private payments,
          <span class="splash__ink">invisible by design.</span>
        </h1>

        <p class="splash__lede">
          Seclura is the private payment rail for Solana. Send, receive and swap with stealth
          addresses and HPKE-sealed instructions — your counterparties, your balances and your
          amounts stay yours alone.
        </p>

        <div class="splash__acts">
          <button class="tide-button tide-button--fill" type="button" @click="go('#launch')">
            Launch App
            <Icon name="arrow" :size="16" />
          </button>
          <button class="tide-button tide-button--line" type="button" @click="go('#how-it-works')">
            <Icon name="eye" :size="16" />
            See how it works
          </button>
        </div>
      </div>

      <div class="splash__stage">
        <span class="splash__halo" aria-hidden="true" />

        <div class="ticket">
          <div class="ticket__bar">
            <span class="ticket__route">seclura://send</span>
            <span class="ticket__flag">
              <Icon name="lock" :size="11" />
              private
            </span>
          </div>

          <dl class="ticket__rows">
            <div class="ticket__row">
              <dt>From</dt>
              <dd>0x7f…a91c · Seclura balance</dd>
            </div>
            <div class="ticket__row">
              <dt>To</dt>
              <dd>stealth ●●9d4f</dd>
            </div>
            <div class="ticket__row ticket__row--veil">
              <dt>Amount</dt>
              <dd>▮▮▮▮▮▮ · hidden</dd>
            </div>
          </dl>

          <div class="ticket__seal">
            <div class="ticket__seal-head">
              <span>hpke seal</span>
              <span class="ticket__seal-ok">sealed ✓</span>
            </div>
            <p class="ticket__hash">0x8ac4 f19b 22de 77a0 4c31 9fbe 08d2 5c66</p>
          </div>

          <button class="ticket__send" type="button" @click="go('#launch')">
            <Icon name="send" :size="15" />
            Send privately
          </button>
        </div>

        <div class="splash__aside">
          <button
            class="mintline"
            type="button"
            :title="site.contract"
            :aria-label="`Copy the $GHOST mint address ${site.contract}`"
            @click="copyContract"
          >
            <span class="mintline__key">CA</span>
            <span class="mintline__value">{{ shortContract }}</span>
            <span class="mintline__act" :class="{ 'mintline__act--done': copied }">
              <Icon :name="copied ? 'check' : 'copy'" :size="13" />
              {{ copied ? 'Copied' : 'Copy' }}
            </span>
          </button>

          <dl class="splash__stats">
            <div v-for="stat in heroStats" :key="stat.label" class="splash__stat">
              <dt>{{ stat.label }}</dt>
              <dd>{{ stat.value }}</dd>
            </div>
          </dl>

          <ul class="splash__notes">
            <li>
              <Icon name="mask" :size="14" />
              No address link
            </li>
            <li>
              <Icon name="bolt" :size="14" />
              0.4s finality
            </li>
            <li>
              <Icon name="lock" :size="14" />
              Zero logs
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="splash__belt">
      <ul class="splash__logos">
        <li v-for="(logo, i) in [...trustLogos, ...trustLogos]" :key="`${logo}-${i}`">
          <Icon name="layers" :size="12" />
          <span>{{ logo }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.splash {
  position: relative;
  display: grid;
  align-content: center;
  min-height: 100svh;
  padding-block: clamp(92px, 10vw, 136px) 0;
  overflow-x: clip;
}

.splash__inner {
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.88fr);
  gap: clamp(28px, 4vw, 64px);
  align-items: center;
  width: min(100% - 2 * var(--gutter), var(--shell));
  margin-inline: auto;
}

.splash__stamp {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
  margin-bottom: clamp(18px, 2.2vw, 28px);
}

.splash__chain {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 7px 15px;
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.78);
  color: var(--accent-safe);
  font-family: var(--font-mono);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  box-shadow: 0 8px 22px rgba(20, 96, 173, 0.1);
}

.splash__chain::before {
  content: "";
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 3px rgba(41, 141, 255, 0.18);
}

.splash__date {
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.splash__title {
  font-size: clamp(2.7rem, 4.9vw, 4.4rem);
  line-height: 0.92;
  letter-spacing: -0.052em;
}

.splash__ink {
  display: block;
  color: var(--accent);
  text-wrap: balance;
}

.splash__lede {
  max-width: 46ch;
  margin-top: clamp(20px, 2.4vw, 28px);
  color: var(--muted);
  font-size: clamp(1rem, 1.1vw, 1.12rem);
  line-height: 1.68;
}

.splash__acts {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: clamp(24px, 3vw, 34px);
}

.splash__stage {
  position: relative;
  display: grid;
  gap: 16px;
  min-width: 0;
}

.splash__halo {
  position: absolute;
  inset: -18% -10% auto;
  z-index: 0;
  height: 82%;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(41, 141, 255, 0.24), rgba(41, 141, 255, 0) 72%);
  pointer-events: none;
}

.splash__halo::after {
  content: "";
  position: absolute;
  inset: 16%;
  border: 1px dashed rgba(41, 141, 255, 0.32);
  border-radius: 50%;
}

.ticket {
  position: relative;
  z-index: 1;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.94);
  box-shadow: var(--shadow-lift);
  backdrop-filter: blur(10px);
}

.ticket__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 14px 20px;
  border-bottom: 1px solid var(--line);
  background: var(--surface-soft);
}

.ticket__route {
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.ticket__flag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--accent-safe);
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.ticket__rows {
  padding-inline: 20px;
}

.ticket__row {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  gap: 12px;
  padding-block: 11px;
  border-bottom: 1px solid var(--line);
}

.ticket__row dt {
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.ticket__row dd {
  overflow-wrap: anywhere;
  font-family: var(--font-mono);
  font-size: 0.74rem;
  line-height: 1.5;
  text-align: right;
}

.ticket__row--veil dd {
  color: var(--accent-safe);
  letter-spacing: 0.1em;
}

.ticket__seal {
  margin: 16px 20px;
  padding: 13px 15px;
  border-radius: var(--radius-md);
  background: var(--surface-alt);
}

.ticket__seal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  color: var(--accent-safe);
  font-family: var(--font-mono);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.ticket__seal-ok {
  color: var(--success);
}

.ticket__hash {
  margin-top: 8px;
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.58rem;
  line-height: 1.7;
  letter-spacing: 0.02em;
  word-spacing: 3px;
}

.ticket__send {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  width: 100%;
  padding: 16px;
  border: 0;
  background: var(--shade);
  color: #ffffff;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  transition: background var(--motion) var(--ease);
}

.ticket__send:hover {
  background: var(--fill);
}

.splash__aside {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 12px;
}

.mintline {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 13px 18px;
  border: 1px solid var(--line);
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.88);
  text-align: left;
  cursor: pointer;
  transition:
    border-color var(--motion) var(--ease),
    background var(--motion) var(--ease);
}

.mintline:hover {
  border-color: var(--accent);
  background: #ffffff;
}

.mintline__key {
  color: var(--accent-safe);
  font-family: var(--font-mono);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.mintline__value {
  overflow: hidden;
  font-family: var(--font-mono);
  font-size: 0.74rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mintline__act {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding-left: 12px;
  border-left: 1px solid var(--line);
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.mintline__act--done {
  color: var(--success);
}

.splash__stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--line);
}

.splash__stat {
  display: flex;
  flex-direction: column-reverse;
  gap: 7px;
  padding: 15px 17px;
  background: rgba(255, 255, 255, 0.9);
}

.splash__stat dd {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 2.3vw, 1.9rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.045em;
}

.splash__stat dt {
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.56rem;
  line-height: 1.4;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.splash__notes {
  display: grid;
  gap: 2px;
}

.splash__notes li {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 9px 15px;
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.72);
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.splash__notes svg {
  flex: none;
  color: var(--accent-safe);
}

.splash__belt {
  width: min(100% - 2 * var(--gutter), var(--shell));
  margin: clamp(36px, 4.4vw, 52px) auto 0;
  padding-block: clamp(22px, 2.6vw, 30px) clamp(30px, 4vw, 46px);
  border-top: 1px solid var(--line);
}

.splash__logos {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 12px 20px;
}

.splash__logos li {
  display: flex;
  align-items: center;
  gap: 7px;
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.58rem;
  line-height: 1.35;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.splash__logos svg {
  flex: none;
  color: var(--line-strong);
}

@media (max-width: 1180px) {
  .splash {
    padding-block: clamp(88px, 11vw, 110px) 0;
  }

  .splash__inner {
    grid-template-columns: minmax(0, 1fr);
    gap: clamp(30px, 5vw, 46px);
  }

  .splash__title {
    max-width: none;
  }

  .splash__logos {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .splash__title {
    font-size: clamp(2.5rem, 11.6vw, 3.4rem);
  }

  .splash__acts .tide-button {
    flex: 1 1 100%;
  }

  .splash__logos {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .ticket__row {
    grid-template-columns: 52px minmax(0, 1fr);
  }
}
</style>
