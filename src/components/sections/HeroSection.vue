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
  <section id="home" class="module module--first boot">
    <div class="module__inner">
      <div class="boot__grid">
        <div class="boot__copy">
          <p class="boot__stamp">
            <span class="tag">{{ site.chain }}</span>
            <span class="boot__date"><code>mainnet · live private payments</code></span>
          </p>

          <h1 class="boot__title">
            Private payments,
            <span class="boot__ink">invisible by design.</span>
          </h1>

          <p class="boot__lede">
            Veilary is the private payment rail for Solana. Send, receive and swap with stealth
            addresses and HPKE-sealed instructions — your counterparties, your balances and your
            amounts stay yours alone.
          </p>

          <div class="boot__acts">
            <button class="cmd" type="button" @click="go('#launch')">
              Launch App
              <Icon name="arrow" :size="16" />
            </button>
            <button class="cmd cmd--ghost" type="button" @click="go('#how-it-works')">
              <Icon name="eye" :size="16" />
              See how it works
            </button>
          </div>
        </div>

        <div class="boot__stack">
          <div class="tx">
            <div class="tx__bar">
              <code class="tx__route">veilary://send</code>
              <span class="tx__flag">
                <Icon name="lock" :size="11" />
                private
              </span>
            </div>

            <dl class="tx__rows">
              <div class="tx__row">
                <dt>From</dt>
                <dd>0x7f…a91c · Veilary balance</dd>
              </div>
              <div class="tx__row">
                <dt>To</dt>
                <dd>stealth ●●9d4f</dd>
              </div>
              <div class="tx__row tx__row--veil">
                <dt>Amount</dt>
                <dd>▮▮▮▮▮▮ · hidden</dd>
              </div>
            </dl>

            <div class="tx__seal">
              <div class="tx__seal-head">
                <span>hpke seal</span>
                <span class="tx__seal-ok">sealed ✓</span>
              </div>
              <pre class="tx__hash">0x8ac4 f19b 22de 77a0 4c31 9fbe 08d2 5c66</pre>
            </div>

            <button class="tx__send" type="button" @click="go('#launch')">
              <Icon name="send" :size="15" />
              Send privately
            </button>
          </div>

          <button
            class="readout"
            type="button"
            :title="site.contract"
            :aria-label="`Copy the $GHOST mint address ${site.contract}`"
            @click="copyContract"
          >
            <code class="readout__key">CA</code>
            <code class="readout__value">{{ shortContract }}</code>
            <span class="readout__act" :class="{ 'readout__act--done': copied }">
              <Icon :name="copied ? 'check' : 'copy'" :size="13" />
              {{ copied ? 'Copied' : 'Copy' }}
            </span>
          </button>

          <dl class="readout__stats">
            <div v-for="stat in heroStats" :key="stat.label" class="readout__stat">
              <dt>{{ stat.label }}</dt>
              <dd><output>{{ stat.value }}</output></dd>
            </div>
          </dl>

          <ul class="readout__notes">
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

    <div class="relay">
      <div class="module__inner relay__inner">
        <ul class="relay__list">
          <li v-for="(logo, i) in [...trustLogos, ...trustLogos]" :key="`${logo}-${i}`">
            <Icon name="layers" :size="12" />
            <span>{{ logo }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.boot__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  gap: clamp(26px, 4vw, 62px);
  align-items: start;
}

.boot__stamp {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: clamp(16px, 2vw, 24px);
}

.boot__date {
  color: var(--faint);
  font-family: var(--mono);
  font-size: 0.64rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.boot__title {
  max-width: 21ch;
  font-size: clamp(2.2rem, 4.6vw, 4.3rem);
  line-height: 0.98;
  letter-spacing: -0.045em;
}

.boot__ink {
  display: block;
  color: var(--red);
}

.boot__lede {
  max-width: 52ch;
  margin-top: clamp(18px, 2.4vw, 28px);
  color: var(--dim);
  font-size: clamp(1rem, 1.1vw, 1.1rem);
  line-height: 1.68;
}

.boot__acts {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: clamp(22px, 2.8vw, 32px);
}

.boot__stack {
  display: grid;
  gap: 10px;
  min-width: 0;
}

/* transaction console */
.tx {
  border: 1px solid var(--edge-2);
  border-radius: var(--r-md);
  background:
    linear-gradient(180deg, rgba(20, 35, 46, 0.92), rgba(10, 18, 26, 0.98)),
    var(--deck);
  box-shadow: 0 0 60px rgba(255, 59, 48, 0.08);
  overflow: hidden;
}

.tx__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 11px 16px;
  border-bottom: 1px solid var(--edge-2);
  background: rgba(255, 59, 48, 0.06);
}

.tx__route {
  color: var(--ink);
  font-family: var(--mono);
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.tx__flag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--red-safe);
  font-family: var(--mono);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.tx__rows {
  padding-inline: 16px;
}

.tx__row {
  display: grid;
  grid-template-columns: 62px minmax(0, 1fr);
  gap: 12px;
  padding-block: 10px;
  border-bottom: 1px dashed var(--edge);
}

.tx__row dt {
  color: var(--faint);
  font-family: var(--mono);
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.tx__row dd {
  overflow-wrap: anywhere;
  color: var(--ink);
  font-family: var(--mono);
  font-size: 0.72rem;
  line-height: 1.5;
  text-align: right;
}

.tx__row--veil dd {
  color: var(--red-safe);
  letter-spacing: 0.1em;
}

.tx__seal {
  margin: 14px 16px;
  padding: 12px 14px;
  border: 1px solid rgba(255, 92, 214, 0.26);
  border-radius: var(--r-sm);
  background: rgba(255, 92, 214, 0.055);
}

.tx__seal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  color: var(--magenta);
  font-family: var(--mono);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.tx__seal-ok {
  color: var(--ok);
}

.tx__hash {
  margin: 7px 0 0;
  color: var(--faint);
  font-family: var(--mono);
  font-size: 0.58rem;
  line-height: 1.7;
  letter-spacing: 0.02em;
  word-spacing: 3px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.tx__send {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  width: 100%;
  padding: 14px;
  border: 0;
  background: var(--red);
  color: #070b10;
  font-family: var(--mono);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background var(--tick) var(--ease);
}

.tx__send:hover {
  background: var(--red-safe);
}

/* CA readout + stats */
.readout {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 11px 14px;
  border: 1px solid var(--edge-2);
  border-radius: var(--r-sm);
  background: rgba(10, 18, 26, 0.86);
  color: var(--ink);
  text-align: left;
  cursor: pointer;
  transition:
    border-color var(--tick) var(--ease),
    background var(--tick) var(--ease);
}

.readout:hover {
  border-color: var(--red);
  background: var(--plate);
}

.readout__key {
  color: var(--red-safe);
  font-family: var(--mono);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.readout__value {
  overflow: hidden;
  font-family: var(--mono);
  font-size: 0.72rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.readout__act {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding-left: 12px;
  border-left: 1px solid var(--edge);
  color: var(--dim);
  font-family: var(--mono);
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.readout__act--done {
  color: var(--ok);
}

.readout__stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  border: 1px solid var(--edge-2);
  border-radius: var(--r-sm);
  background: var(--edge-2);
  overflow: hidden;
}

.readout__stat {
  display: flex;
  flex-direction: column-reverse;
  gap: 6px;
  padding: 12px 14px;
  background: rgba(10, 18, 26, 0.94);
}

.readout__stat dd {
  color: var(--ink);
  font-family: var(--mono);
  font-size: clamp(1.35rem, 2.1vw, 1.8rem);
  font-weight: 700;
  line-height: 1;
}

.readout__stat dt {
  color: var(--faint);
  font-family: var(--mono);
  font-size: 0.56rem;
  line-height: 1.4;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.readout__notes {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.readout__notes li {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 10px;
  border: 1px solid var(--edge);
  border-radius: var(--r-xs);
  color: var(--dim);
  font-family: var(--mono);
  font-size: 0.6rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.readout__notes svg {
  flex: none;
  color: var(--red-safe);
}

/* relay strip */
.relay {
  margin-top: clamp(30px, 4vw, 48px);
  border-top: 1px solid var(--edge);
  border-bottom: 1px solid var(--edge);
  background: rgba(10, 18, 26, 0.5);
}

.relay__inner {
  padding-block: 14px;
}

.relay__list {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 10px 18px;
}

.relay__list li {
  display: flex;
  align-items: center;
  gap: 7px;
  color: var(--faint);
  font-family: var(--mono);
  font-size: 0.56rem;
  line-height: 1.35;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.relay__list svg {
  flex: none;
  color: var(--edge-3);
}

@media (max-width: 1180px) {
  .boot__grid {
    grid-template-columns: minmax(0, 1fr);
    gap: clamp(26px, 4vw, 40px);
  }

  .boot__stack {
    max-width: 620px;
  }

  .relay__list {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .boot__title {
    font-size: clamp(1.75rem, 7.5vw, 2.6rem);
  }

  .boot__acts .cmd {
    flex: 1 1 100%;
  }

  .relay__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .tx__row {
    grid-template-columns: 52px minmax(0, 1fr);
  }
}
</style>
