<script setup>
import Icon from '@/components/Icon.vue'
import { features } from '@/data/site'
</script>

<template>
  <section id="features" class="scene modules">
    <div class="scene__inner">
      <div class="modules__head">
        <div class="modules__lede">
          <p class="tide-kicker">Core modules</p>
          <h2 class="tide-title modules__title">
            Everything a public chain
            <em>shows the world</em> — gone.
          </h2>
        </div>
        <p class="tide-deck modules__deck">
          Seclura replaces the transparent ledger with verifiable secrecy: payments that anyone can
          validate but nobody can trace.
        </p>
      </div>

      <div class="tide-rail modules__rail" role="group" aria-label="Core modules" tabindex="0">
        <article v-for="f in features" :key="f.title" class="modules__item">
          <span class="modules__icon">
            <Icon :name="f.icon" :size="20" />
          </span>
          <h3 class="modules__name">{{ f.title }}</h3>
          <p class="modules__text">{{ f.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.modules__head {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.7fr);
  gap: clamp(20px, 4vw, 64px);
  align-items: end;
  margin-bottom: clamp(30px, 4vw, 54px);
}

.modules__lede {
  display: grid;
  gap: clamp(14px, 1.8vw, 22px);
}

.modules__title {
  max-width: 24ch;
}

.modules__deck {
  justify-self: end;
  padding-bottom: 6px;
}

.modules__rail {
  margin-inline: calc(-1 * clamp(0px, 1vw, 10px));
  padding-inline: clamp(0px, 1vw, 10px);
}

.modules__item {
  display: grid;
  align-content: start;
  gap: 15px;
  min-height: clamp(280px, 30vw, 360px);
  padding: clamp(22px, 2.4vw, 34px);
  border-radius: var(--radius-lg);
  background: var(--surface);
  box-shadow: var(--shadow);
}

.modules__item:nth-child(3n + 2) {
  background: var(--surface-alt);
  box-shadow: none;
}

.modules__icon {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: var(--accent-wash);
  color: var(--accent-safe);
}

.modules__name {
  font-size: clamp(1.14rem, 1.4vw, 1.32rem);
  line-height: 1.12;
}

.modules__text {
  color: var(--muted);
  font-size: 0.9rem;
  line-height: 1.66;
}

@media (max-width: 980px) {
  .modules__head {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }

  .modules__deck {
    justify-self: start;
  }
}
</style>
