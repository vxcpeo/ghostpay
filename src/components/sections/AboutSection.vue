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
  <section id="about" class="scene scene--deep crest">
    <div class="scene__inner">
      <div class="scene__head crest__head">
        <p class="tide-kicker">The mission</p>
        <h2 class="tide-title">
          Financial privacy is not a loophole.
          <em>It is the default.</em>
        </h2>
        <p class="tide-deck">
          Every card payment you make is private. Every salary transfer is private. Crypto is the
          only money system where the opposite is true — where your landlord, your employer and your
          competitors can audit you in real time. Seclura exists to close that gap.
        </p>
      </div>

      <blockquote class="crest__creed">“{{ site.description }}”</blockquote>

      <div class="crest__board tide-bento">
        <article
          v-for="p in brandPillars"
          :key="p.title"
          class="tide-bento__cell tide-bento__cell--deep crest__pillar"
        >
          <h3 class="crest__pillar-title">{{ p.title }}</h3>
          <p class="crest__pillar-text">{{ p.text }}</p>
        </article>

        <div class="tide-bento__cell tide-bento__cell--deep crest__record">
          <div class="crest__record-head">
            <span>protocol facts</span>
            <span class="crest__live">mainnet</span>
          </div>
          <dl class="crest__facts">
            <div v-for="f in facts" :key="f.k" class="crest__fact">
              <dt>{{ f.k }}</dt>
              <dd>{{ f.v }}</dd>
            </div>
          </dl>
        </div>

        <div class="tide-bento__cell tide-bento__cell--deep crest__stats">
          <div v-for="s in heroStats" :key="s.label" class="crest__stat">
            <strong>{{ s.value }}</strong>
            <span>{{ s.label }}</span>
          </div>
        </div>

        <div class="tide-bento__cell tide-bento__cell--deep crest__foot">
          <div class="crest__audit">
            <Icon name="shield" :size="16" />
            {{ site.audit }}
          </div>
          <p class="crest__source">
            Unverified figures are labelled on this page · confirm everything at the official source
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.crest {
  margin-inline: clamp(0px, 2vw, 26px);
  border-radius: var(--radius-xl);
}

.crest__head {
  margin-bottom: clamp(28px, 3.6vw, 46px);
}

.crest__creed {
  max-width: 34ch;
  margin-bottom: clamp(28px, 4vw, 48px);
  padding-inline-start: clamp(16px, 2.4vw, 28px);
  border-left: 3px solid var(--accent);
  color: var(--shade-ink);
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2.7vw, 2.2rem);
  font-weight: 600;
  line-height: 1.32;
  letter-spacing: -0.035em;
  text-wrap: balance;
}

.crest__pillar {
  grid-column: span 4;
}

.crest__record {
  grid-column: span 7;
}

.crest__stats {
  grid-column: span 5;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px 18px;
  align-content: start;
}

.crest__foot {
  grid-column: span 12;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px 32px;
}

.crest__pillar-title {
  color: var(--shade-ink);
  font-size: 1.1rem;
  line-height: 1.14;
  letter-spacing: -0.03em;
}

.crest__pillar-text {
  margin-top: 10px;
  color: var(--shade-muted);
  font-size: 0.88rem;
  line-height: 1.64;
}

.crest__record-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 11px;
  border-bottom: 1px solid rgba(169, 198, 221, 0.28);
  color: var(--shade-muted);
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.crest__live {
  color: var(--shade-link);
}

.crest__facts {
  display: grid;
}

.crest__fact {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 10px;
  padding-block: 9px;
  border-bottom: 1px solid rgba(169, 198, 221, 0.16);
}

.crest__fact:last-child {
  border-bottom: 0;
}

.crest__fact dt {
  color: var(--shade-muted);
  font-size: 0.84rem;
}

.crest__fact dd {
  color: var(--shade-ink);
  font-size: 0.86rem;
  line-height: 1.4;
  text-align: right;
}

.crest__stat strong {
  display: block;
  color: var(--shade-link);
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 2.4vw, 2rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.045em;
}

.crest__stat span {
  display: block;
  margin-top: 6px;
  color: var(--shade-muted);
  font-family: var(--font-mono);
  font-size: 0.56rem;
  line-height: 1.45;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.crest__audit {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  max-width: 44ch;
  color: var(--shade-ink);
  font-size: 0.86rem;
  line-height: 1.52;
}

.crest__audit svg {
  flex: none;
  margin-top: 2px;
  color: var(--shade-link);
}

.crest__source {
  max-width: 40ch;
  color: var(--shade-muted);
  font-family: var(--font-mono);
  font-size: 0.58rem;
  line-height: 1.62;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

@media (max-width: 980px) {
  .crest__pillar,
  .crest__record,
  .crest__stats,
  .crest__foot {
    grid-column: span 12;
  }
}

@media (max-width: 640px) {
  .crest__creed {
    max-width: none;
  }
}
</style>
