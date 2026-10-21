<script setup>
import Icon from '@/components/Icon.vue'
import { roadmap } from '@/data/site'

const statusLabel = { done: 'Shipped', active: 'In progress', next: 'Next up' }
</script>

<template>
  <section id="roadmap" class="scene horizon">
    <div class="scene__inner">
      <div class="scene__head horizon__head">
        <p class="tide-kicker">Roadmap</p>
        <h2 class="tide-title">
          From private transfers to
          <em>invisible finance</em>
        </h2>
        <p class="tide-deck">
          Privacy is not a one-off launch feature — it is a network effect. Here is how the Seclura
          protocol opens up, phase by phase.
        </p>
      </div>

      <div class="tide-rail horizon__rail" role="group" aria-label="Roadmap" tabindex="0">
        <article
          v-for="p in roadmap"
          :key="p.phase"
          class="horizon__phase"
          :class="`horizon__phase--${p.status}`"
        >
          <div class="horizon__meta">
            <span class="horizon__badge">
              <Icon :name="p.status === 'done' ? 'check' : 'spark'" :size="14" />
            </span>
            <span class="horizon__phase-name">{{ p.phase }}</span>
            <span class="horizon__status">{{ statusLabel[p.status] }}</span>
          </div>
          <h3 class="horizon__title">{{ p.title }}</h3>
          <ul class="horizon__items">
            <li v-for="item in p.items" :key="item">
              <Icon name="check" :size="13" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.horizon__head {
  margin-bottom: clamp(30px, 4vw, 54px);
}

.horizon__rail {
  margin-inline: calc(-1 * clamp(0px, 1vw, 10px));
  padding-inline: clamp(0px, 1vw, 10px);
}

.horizon__phase {
  display: grid;
  align-content: start;
  gap: 14px;
  min-height: clamp(320px, 36vw, 430px);
  padding: clamp(22px, 2.6vw, 34px);
  border-radius: var(--radius-lg);
  background: var(--surface);
  box-shadow: var(--shadow);
}

.horizon__phase--done {
  background: var(--surface-soft);
  box-shadow: none;
}

.horizon__phase--active {
  background:
    radial-gradient(120% 90% at 100% 0%, #ffffff 0%, rgba(255, 255, 255, 0) 58%),
    var(--surface-alt);
  box-shadow: none;
}

.horizon__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
}

.horizon__badge {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #ffffff;
  color: var(--muted);
  box-shadow: 0 6px 16px rgba(20, 96, 173, 0.12);
}

.horizon__phase--done .horizon__badge {
  color: var(--success);
}

.horizon__phase--active .horizon__badge {
  background: var(--fill);
  color: #ffffff;
  box-shadow: none;
}

.horizon__phase-name {
  font-family: var(--font-mono);
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.horizon__status {
  padding: 3px 10px;
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.75);
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.56rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.horizon__phase--done .horizon__status {
  background: var(--success-wash);
  color: var(--success);
}

.horizon__phase--active .horizon__status {
  background: #ffffff;
  color: var(--accent-safe);
}

.horizon__title {
  margin-top: 4px;
  font-size: clamp(1.2rem, 1.7vw, 1.42rem);
  line-height: 1.08;
}

.horizon__items {
  display: grid;
  gap: 8px;
  margin-top: 4px;
}

.horizon__items li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: var(--muted);
  font-size: 0.85rem;
  line-height: 1.5;
}

.horizon__items svg {
  flex: none;
  margin-top: 3px;
  color: var(--line-strong);
}

.horizon__phase--done .horizon__items svg {
  color: var(--success);
}

.horizon__phase--active .horizon__items svg {
  color: var(--accent-safe);
}
</style>
