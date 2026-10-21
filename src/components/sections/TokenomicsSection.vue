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
  <section id="tokenomics" class="module data">
    <div class="module__inner">
      <div class="module__bar">
        <p class="kicker">Tokenomics</p>
      </div>

      <div class="data__head">
        <h2 class="scene-title">
          {{ site.ticker }} — the fuel of
          <em>invisible money</em>
        </h2>
        <p class="deck">
          A utility token for the private payment rail — it pays for access, backs ecosystem
          incentives and puts how the privacy stack evolves in the hands of the people using it.
        </p>
      </div>

      <div class="data__grid">
        <div class="data__supply">
          <div class="data__supply-head">
            <span class="data__label">total supply</span>
            <output class="data__figure">{{ tokenomics.supply }}</output>
          </div>

          <div class="data__rows">
            <div v-for="d in tokenomics.distribution" :key="d.label" class="data__row">
              <small class="data__name">{{ d.label }}</small>
              <span class="data__track">
                <span class="data__bar" :style="{ width: `${d.pct}%` }" />
              </span>
              <output class="data__pct">{{ d.pct }}%</output>
            </div>
          </div>
        </div>

        <div class="data__facts">
          <dl>
            <div class="data__fact">
              <dt>Token</dt>
              <dd><code>{{ site.ticker }}</code></dd>
            </div>
            <div class="data__fact">
              <dt>Network</dt>
              <dd><code>{{ site.chain }}</code></dd>
            </div>
            <div class="data__fact">
              <dt>Total supply</dt>
              <dd><code>{{ tokenomics.supply }}*</code></dd>
            </div>
            <div class="data__fact">
              <dt>Trade tax</dt>
              <dd><code>{{ tokenomics.tax }}*</code></dd>
            </div>
            <div class="data__fact">
              <dt>Custody</dt>
              <dd><code>Non-custodial</code></dd>
            </div>
            <div class="data__fact">
              <dt>Mint address</dt>
              <dd>
                <button
                  class="data__copy"
                  type="button"
                  :title="site.contract"
                  :aria-label="`Copy the $GHOST mint address ${site.contract}`"
                  @click="copyContract"
                >
                  <code>{{ site.contract.slice(0, 10) }}…</code>
                  <Icon :name="copied ? 'check' : 'copy'" :size="13" />
                </button>
              </dd>
            </div>
          </dl>
        </div>

        <div class="data__utility">
          <h3 class="data__utility-title">What {{ site.ticker }} unlocks</h3>
          <ul class="data__uses">
            <li v-for="u in tokenomics.utility" :key="u">
              <Icon name="check" :size="14" />
              <span>{{ u }}</span>
            </li>
          </ul>
        </div>

        <div class="data__act">
          <a class="cmd cmd--block" href="#launch">
            Buy {{ site.ticker }}
            <Icon name="arrowUpRight" :size="15" />
          </a>
          <p class="data__fine">
            <Icon name="shield" :size="14" />
            <span>* {{ tokenomics.disclaimer }}</span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.data__head {
  display: grid;
  gap: clamp(12px, 1.6vw, 18px);
  max-width: 66ch;
  margin-bottom: clamp(24px, 3.4vw, 42px);
}

.data__grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 1px;
  border: 1px solid var(--edge-2);
  background: var(--edge);
}

.data__supply,
.data__facts,
.data__utility,
.data__act {
  min-width: 0;
  padding: clamp(18px, 2.4vw, 30px);
  background: var(--deck);
}

.data__supply {
  grid-column: span 7;
  background:
    radial-gradient(120% 100% at 94% 0%, rgba(255, 59, 48, 0.08), transparent 62%),
    var(--deck);
}

.data__facts {
  grid-column: span 5;
  background: var(--plate);
}

.data__utility {
  grid-column: span 7;
}

.data__act {
  grid-column: span 5;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: stretch;
  justify-content: center;
  background: var(--plate);
}

.data__supply-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 18px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--edge-2);
}

.data__label {
  color: var(--faint);
  font-family: var(--mono);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.data__figure {
  color: var(--ink);
  font-family: var(--mono);
  font-size: clamp(1.8rem, 3.4vw, 2.7rem);
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: -0.03em;
}

.data__rows {
  padding-top: 6px;
}

.data__row {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(64px, 1fr) 44px;
  align-items: center;
  gap: 14px;
  padding-block: 9px;
  border-bottom: 1px dashed var(--edge);
}

.data__row:last-child {
  border-bottom: 0;
}

.data__name {
  color: var(--ink);
  font-size: 0.87rem;
  line-height: 1.38;
}

.data__track {
  height: 7px;
  overflow: hidden;
  border-radius: 1px;
  background: rgba(255, 255, 255, 0.06);
}

.data__bar {
  display: block;
  height: 100%;
  border-radius: 1px;
  background: linear-gradient(90deg, var(--magenta), var(--red));
}

.data__row:nth-child(2) .data__bar {
  opacity: 0.86;
}

.data__row:nth-child(3) .data__bar {
  opacity: 0.76;
}

.data__row:nth-child(4) .data__bar {
  opacity: 0.66;
}

.data__row:nth-child(5) .data__bar {
  opacity: 0.56;
}

.data__row:nth-child(6) .data__bar {
  opacity: 0.46;
}

.data__pct {
  display: block;
  color: var(--red-safe);
  font-family: var(--mono);
  font-size: 0.7rem;
  font-weight: 700;
  text-align: right;
}

.data__facts dl {
  display: grid;
}

.data__fact {
  display: grid;
  grid-template-columns: minmax(0, 0.86fr) minmax(0, 1.14fr);
  gap: 10px;
  align-items: baseline;
  padding-block: 10px;
  border-bottom: 1px solid var(--edge-2);
}

.data__fact:last-child {
  border-bottom: 0;
}

.data__fact dt {
  color: var(--faint);
  font-family: var(--mono);
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.data__fact dd {
  overflow-wrap: anywhere;
  color: var(--ink);
  font-family: var(--mono);
  font-size: 0.82rem;
  line-height: 1.4;
  text-align: right;
}

.data__copy {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--red-safe);
  font-family: var(--mono);
  font-size: 0.7rem;
  text-align: right;
  cursor: pointer;
}

.data__utility-title {
  font-size: clamp(1.1rem, 1.5vw, 1.3rem);
  line-height: 1.12;
}

.data__uses {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px 20px;
  margin-top: 14px;
}

.data__uses li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: var(--dim);
  font-size: 0.85rem;
  line-height: 1.52;
}

.data__uses svg {
  flex: none;
  margin-top: 3px;
  color: var(--ok);
}

.data__fine {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  padding: 11px 12px;
  border: 1px solid rgba(242, 201, 76, 0.28);
  border-left: 2px solid var(--warn);
  color: var(--dim);
  font-size: 0.74rem;
  line-height: 1.6;
}

.data__fine svg {
  flex: none;
  margin-top: 3px;
  color: var(--warn);
}

@media (max-width: 980px) {
  .data__supply,
  .data__facts,
  .data__utility,
  .data__act {
    grid-column: span 12;
  }
}

@media (max-width: 640px) {
  .data__row {
    grid-template-columns: minmax(0, 1fr) 44px;
    gap: 8px;
  }

  .data__track {
    grid-column: 1 / -1;
    grid-row: 2;
  }

  .data__pct {
    grid-column: 2;
    grid-row: 1;
  }

  .data__uses {
    grid-template-columns: minmax(0, 1fr);
  }

  .data__supply-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
