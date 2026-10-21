<script setup>
import Icon from '@/components/Icon.vue'
import { brandPillars, heroStats, site } from '@/data/site'

const facts = [
  { k: 'Network', v: site.chain },
  { k: 'Launched', v: 'Nov 2025' },
  { k: 'Custody', v: 'User-held keys' },
  { k: 'Identity required', v: 'None' },
  { k: 'Privacy primitives', v: 'Stealth addresses · HPKE' },
  { k: 'Site', v: site.domain }
]
</script>

<template>
  <section id="about" class="module manifest">
    <div class="module__inner">
      <div class="module__bar">
        <p class="kicker">The mission</p>
      </div>

      <div class="manifest__head">
        <h2 class="scene-title">
          Financial privacy is not a loophole.
          <em>It is the default.</em>
        </h2>
        <p class="deck">
          Every card payment you make is private. Every salary transfer is private. Crypto is the
          only money system where the opposite is true — where your landlord, your employer and your
          competitors can audit you in real time. Veilary exists to close that gap.
        </p>
      </div>

      <blockquote class="manifest__creed">“{{ site.description }}”</blockquote>

      <div class="manifest__grid">
        <div class="manifest__pillars">
          <article v-for="p in brandPillars" :key="p.title" class="manifest__pillar">
            <h3 class="manifest__pillar-title">{{ p.title }}</h3>
            <p class="manifest__pillar-text">{{ p.text }}</p>
          </article>
        </div>

        <div class="manifest__record">
          <div class="manifest__record-head">
            <span>protocol facts</span>
            <span class="manifest__live">mainnet</span>
          </div>
          <dl class="manifest__facts">
            <div v-for="f in facts" :key="f.k" class="manifest__fact">
              <dt>{{ f.k }}</dt>
              <dd><code>{{ f.v }}</code></dd>
            </div>
          </dl>
        </div>

        <div class="manifest__stats">
          <div v-for="s in heroStats" :key="s.label" class="manifest__stat">
            <output>{{ s.value }}</output>
            <span>{{ s.label }}</span>
          </div>
        </div>

        <div class="manifest__foot">
          <div class="manifest__audit">
            <Icon name="shield" :size="16" />
            {{ site.audit }}
          </div>
          <p class="manifest__source">
            <small>Unverified figures are labelled on this page · confirm everything at the official source</small>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.manifest__head {
  display: grid;
  gap: clamp(12px, 1.6vw, 18px);
  max-width: 66ch;
  margin-bottom: clamp(22px, 3.2vw, 38px);
}

.manifest__creed {
  max-width: 42ch;
  margin-bottom: clamp(26px, 3.6vw, 44px);
  padding-inline-start: clamp(14px, 2.2vw, 24px);
  border-left: 3px solid var(--red);
  color: var(--ink);
  font-family: var(--mono);
  font-size: clamp(1.15rem, 2.2vw, 1.8rem);
  font-weight: 700;
  line-height: 1.36;
  letter-spacing: -0.02em;
  text-wrap: balance;
}

.manifest__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.06fr) minmax(0, 0.94fr);
  gap: 1px;
  border: 1px solid var(--edge-2);
  background: var(--edge);
}

.manifest__pillars {
  display: grid;
  grid-column: 1;
  grid-row: 1 / span 2;
  background: var(--deck);
}

.manifest__pillar {
  padding: clamp(18px, 2.4vw, 30px);
  border-bottom: 1px solid var(--edge);
}

.manifest__pillar:last-child {
  border-bottom: 0;
}

.manifest__pillar-title {
  font-size: clamp(1rem, 1.3vw, 1.2rem);
  line-height: 1.14;
}

.manifest__pillar-text {
  margin-top: 8px;
  color: var(--dim);
  font-size: 0.88rem;
  line-height: 1.64;
}

.manifest__record {
  grid-column: 2;
  grid-row: 1;
  padding: clamp(18px, 2.4vw, 28px);
  background: var(--plate);
}

.manifest__record-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--edge-2);
  color: var(--faint);
  font-family: var(--mono);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.manifest__live {
  color: var(--mint);
}

.manifest__facts {
  display: grid;
}

.manifest__fact {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 10px;
  padding-block: 8px;
  border-bottom: 1px dashed var(--edge);
}

.manifest__fact:last-child {
  border-bottom: 0;
}

.manifest__fact dt {
  color: var(--faint);
  font-size: 0.82rem;
}

.manifest__fact dd {
  color: var(--ink);
  font-family: var(--mono);
  font-size: 0.8rem;
  line-height: 1.4;
  text-align: right;
}

.manifest__stats {
  grid-column: 2;
  grid-row: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--edge);
}

.manifest__stat {
  padding: clamp(14px, 1.8vw, 20px);
  background: var(--deck);
}

.manifest__stat output {
  display: block;
  color: var(--red);
  font-family: var(--mono);
  font-size: clamp(1.4rem, 2.2vw, 1.8rem);
  font-weight: 700;
  line-height: 1;
}

.manifest__stat span {
  display: block;
  margin-top: 6px;
  color: var(--faint);
  font-family: var(--mono);
  font-size: 0.55rem;
  line-height: 1.45;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.manifest__foot {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px 30px;
  padding: clamp(16px, 2.2vw, 24px);
  border-top: 1px solid var(--edge-2);
  background: var(--plate);
}

.manifest__audit {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  max-width: 46ch;
  color: var(--ink);
  font-size: 0.86rem;
  line-height: 1.52;
}

.manifest__audit svg {
  flex: none;
  margin-top: 2px;
  color: var(--red-safe);
}

.manifest__source {
  max-width: 44ch;
  color: var(--faint);
  font-family: var(--mono);
  font-size: 0.58rem;
  line-height: 1.62;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

@media (max-width: 980px) {
  .manifest__grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .manifest__pillars,
  .manifest__record,
  .manifest__stats,
  .manifest__foot {
    grid-column: 1;
    grid-row: auto;
  }
}

@media (max-width: 640px) {
  .manifest__creed {
    max-width: none;
  }

  .manifest__stats {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
