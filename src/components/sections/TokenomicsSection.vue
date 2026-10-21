<script setup>
import { ref } from 'vue'
import Icon from '@/components/Icon.vue'
import { site, tokenomics } from '@/data/site'

const copied = ref(false)

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
  <section id="tokenomics" class="scene vault">
    <div class="scene__inner">
      <div class="scene__head vault__head">
        <p class="tide-kicker">Tokenomics</p>
        <h2 class="tide-title">
          {{ site.ticker }} — the fuel of
          <em>invisible money</em>
        </h2>
        <p class="tide-deck">
          A utility token for the private payment rail — it pays for access, backs ecosystem
          incentives and puts how the privacy stack evolves in the hands of the people using it.
        </p>
      </div>

      <div class="vault__board tide-bento">
        <div class="tide-bento__cell vault__supply">
          <div class="vault__supply-head">
            <span class="vault__label">total supply</span>
            <strong class="vault__figure">{{ tokenomics.supply }}</strong>
          </div>

          <div class="vault__rows">
            <div v-for="d in tokenomics.distribution" :key="d.label" class="vault__row">
              <span class="vault__name">{{ d.label }}</span>
              <span class="vault__track">
                <span class="vault__bar" :style="{ width: `${d.pct}%` }" />
              </span>
              <span class="vault__pct">{{ d.pct }}%</span>
            </div>
          </div>
        </div>

        <div class="tide-bento__cell tide-bento__cell--wash vault__ledger">
          <dl class="vault__facts">
            <div class="vault__fact">
              <dt>Token</dt>
              <dd>{{ site.ticker }}</dd>
            </div>
            <div class="vault__fact">
              <dt>Network</dt>
              <dd>{{ site.chain }}</dd>
            </div>
            <div class="vault__fact">
              <dt>Total supply</dt>
              <dd>{{ tokenomics.supply }}*</dd>
            </div>
            <div class="vault__fact">
              <dt>Trade tax</dt>
              <dd>{{ tokenomics.tax }}*</dd>
            </div>
            <div class="vault__fact">
              <dt>Custody</dt>
              <dd>Non-custodial</dd>
            </div>
            <div class="vault__fact">
              <dt>Mint address</dt>
              <dd>
                <button
                  class="vault__copy"
                  type="button"
                  :title="site.contract"
                  :aria-label="`Copy the $GHOST mint address ${site.contract}`"
                  @click="copyContract"
                >
                  {{ site.contract.slice(0, 10) }}…
                  <Icon :name="copied ? 'check' : 'copy'" :size="13" />
                </button>
              </dd>
            </div>
          </dl>
        </div>

        <div class="tide-bento__cell vault__utility">
          <h3 class="vault__utility-title">What {{ site.ticker }} unlocks</h3>
          <ul class="vault__uses">
            <li v-for="u in tokenomics.utility" :key="u">
              <Icon name="check" :size="14" />
              <span>{{ u }}</span>
            </li>
          </ul>
        </div>

        <div class="tide-bento__cell tide-bento__cell--wash vault__act">
          <a class="tide-button tide-button--fill vault__buy" href="#launch">
            Buy {{ site.ticker }}
            <Icon name="arrowUpRight" :size="15" />
          </a>
          <p class="vault__fine">
            <Icon name="shield" :size="14" />
            <span>* {{ tokenomics.disclaimer }}</span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vault__head {
  margin-bottom: clamp(30px, 4vw, 54px);
}

.vault__board {
  align-items: start;
}

.vault__supply {
  grid-column: span 7;
  background:
    radial-gradient(120% 100% at 94% 0%, var(--surface-alt) 0%, rgba(232, 243, 255, 0) 58%),
    var(--surface);
}

.vault__ledger {
  grid-column: span 5;
}

.vault__utility {
  grid-column: span 7;
}

.vault__act {
  grid-column: span 5;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
}

.vault__supply-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 18px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--line);
}

.vault__label {
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.vault__figure {
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 3.6vw, 2.9rem);
  font-weight: 600;
  line-height: 0.9;
  letter-spacing: -0.05em;
}

.vault__rows {
  padding-top: 8px;
}

.vault__row {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(64px, 1fr) 44px;
  align-items: center;
  gap: 14px;
  padding-block: 10px;
  border-bottom: 1px solid var(--line);
}

.vault__row:last-child {
  border-bottom: 0;
}

.vault__name {
  font-size: 0.88rem;
  line-height: 1.38;
}

.vault__track {
  height: 8px;
  overflow: hidden;
  border-radius: var(--radius-pill);
  background: var(--surface-soft);
}

.vault__bar {
  display: block;
  height: 100%;
  border-radius: var(--radius-pill);
  background: linear-gradient(90deg, var(--accent-2), var(--accent));
}

.vault__row:nth-child(2) .vault__bar {
  opacity: 0.84;
}

.vault__row:nth-child(3) .vault__bar {
  opacity: 0.74;
}

.vault__row:nth-child(4) .vault__bar {
  opacity: 0.64;
}

.vault__row:nth-child(5) .vault__bar {
  opacity: 0.54;
}

.vault__row:nth-child(6) .vault__bar {
  opacity: 0.44;
}

.vault__pct {
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  text-align: right;
}

.vault__facts {
  display: grid;
}

.vault__fact {
  display: grid;
  grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr);
  gap: 10px;
  align-items: baseline;
  padding-block: 11px;
  border-bottom: 1px solid rgba(179, 210, 236, 0.6);
}

.vault__fact:last-child {
  border-bottom: 0;
}

.vault__fact dt {
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.vault__fact dd {
  overflow-wrap: anywhere;
  font-size: 0.9rem;
  line-height: 1.4;
  text-align: right;
}

.vault__copy {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--accent-safe);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  text-align: right;
  cursor: pointer;
}

.vault__utility-title {
  font-size: clamp(1.15rem, 1.6vw, 1.35rem);
  line-height: 1.1;
}

.vault__uses {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 22px;
  margin-top: 16px;
}

.vault__uses li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: var(--muted);
  font-size: 0.86rem;
  line-height: 1.52;
}

.vault__uses svg {
  flex: none;
  margin-top: 3px;
  color: var(--success);
}

.vault__buy {
  align-self: stretch;
}

.vault__fine {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  padding: 13px 14px;
  border-left: 3px solid var(--warning);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  background: var(--warning-wash);
  color: var(--warning);
  font-size: 0.77rem;
  line-height: 1.6;
}

.vault__fine svg {
  flex: none;
  margin-top: 3px;
}

@media (max-width: 980px) {
  .vault__supply,
  .vault__ledger,
  .vault__utility,
  .vault__act {
    grid-column: span 12;
  }
}

@media (max-width: 640px) {
  .vault__row {
    grid-template-columns: minmax(0, 1fr) 44px;
    gap: 8px;
  }

  .vault__track {
    grid-column: 1 / -1;
    grid-row: 2;
  }

  .vault__pct {
    grid-column: 2;
    grid-row: 1;
  }

  .vault__uses {
    grid-template-columns: minmax(0, 1fr);
  }

  .vault__supply-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
