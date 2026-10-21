<script setup>
import Icon from '@/components/Icon.vue'
import { roadmap } from '@/data/site'

const statusLabel = { done: 'Shipped', active: 'In progress', next: 'Next up' }
</script>

<template>
  <section id="roadmap" class="module phase">
    <div class="module__inner">
      <div class="module__bar">
        <p class="kicker">Roadmap</p>
      </div>

      <div class="phase__head">
        <h2 class="scene-title">
          From private transfers to
          <em>invisible finance</em>
        </h2>
        <p class="deck">
          Privacy is not a one-off launch feature — it is a network effect. Here is how the Veilary
          protocol opens up, phase by phase.
        </p>
      </div>

      <div class="phase__list" role="group" aria-label="Roadmap">
        <article
          v-for="p in roadmap"
          :key="p.phase"
          class="phase__row"
          :class="`phase__row--${p.status}`"
        >
          <div class="phase__meta">
            <span class="phase__badge">
              <Icon :name="p.status === 'done' ? 'check' : 'spark'" :size="14" />
            </span>
            <code class="phase__name">{{ p.phase }}</code>
            <samp class="phase__status">{{ statusLabel[p.status] }}</samp>
          </div>
          <h3 class="phase__title">{{ p.title }}</h3>
          <ul class="phase__items">
            <li v-for="item in p.items" :key="item">
              <Icon name="check" :size="13" />
              <small>{{ item }}</small>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.phase__head {
  display: grid;
  gap: clamp(12px, 1.6vw, 18px);
  max-width: 64ch;
  margin-bottom: clamp(24px, 3.4vw, 42px);
}

.phase__list {
  border-top: 1px solid var(--edge-2);
}

.phase__row {
  display: grid;
  grid-template-columns: minmax(180px, 0.26fr) minmax(190px, 0.3fr) minmax(0, 1fr);
  gap: clamp(16px, 2.6vw, 42px);
  align-items: start;
  padding-block: clamp(18px, 2.4vw, 30px);
  border-bottom: 1px solid var(--edge);
  border-left: 2px solid transparent;
  padding-left: clamp(10px, 1.4vw, 18px);
}

.phase__row--done {
  border-left-color: var(--edge-3);
}

.phase__row--active {
  border-left-color: var(--red);
  background: linear-gradient(90deg, rgba(255, 59, 48, 0.05), transparent 46%);
}

.phase__row--next {
  border-left-color: var(--magenta);
  background: linear-gradient(90deg, rgba(255, 92, 214, 0.04), transparent 46%);
}

.phase__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 10px;
}

.phase__badge {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border: 1px solid var(--edge-2);
  border-radius: var(--r-xs);
  color: var(--dim);
}

.phase__row--done .phase__badge {
  color: var(--ok);
}

.phase__row--active .phase__badge {
  border-color: var(--red);
  background: var(--red);
  color: #070b10;
}

.phase__row--next .phase__badge {
  color: var(--magenta);
}

.phase__name {
  color: var(--ink);
  font-family: var(--mono);
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.phase__status {
  padding: 3px 8px;
  border: 1px solid var(--edge-2);
  border-radius: var(--r-xs);
  color: var(--dim);
  font-family: var(--mono);
  font-size: 0.55rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.phase__row--done .phase__status {
  border-color: rgba(92, 225, 160, 0.32);
  color: var(--ok);
}

.phase__row--active .phase__status {
  border-color: var(--red);
  color: var(--red-safe);
}

.phase__title {
  font-size: clamp(1.1rem, 1.5vw, 1.3rem);
  line-height: 1.12;
}

.phase__items {
  display: grid;
  gap: 7px;
}

.phase__items li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: var(--dim);
  font-size: 0.84rem;
  line-height: 1.5;
}

.phase__items svg {
  flex: none;
  margin-top: 3px;
  color: var(--edge-3);
}

.phase__row--done .phase__items svg {
  color: var(--ok);
}

.phase__row--active .phase__items svg {
  color: var(--red-safe);
}

@media (max-width: 980px) {
  .phase__row {
    grid-template-columns: minmax(0, 1fr);
    gap: 10px;
  }

  .phase__items {
    padding-top: 2px;
  }
}
</style>
