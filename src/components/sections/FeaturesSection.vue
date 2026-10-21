<script setup>
import Icon from '@/components/Icon.vue'
import { features } from '@/data/site'
</script>

<template>
  <section id="features" class="module registry">
    <div class="module__inner">
      <div class="module__bar">
        <p class="kicker">Core modules</p>
      </div>

      <div class="registry__head">
        <h2 class="scene-title registry__title">
          Everything a public chain
          <em>shows the world</em> — gone.
        </h2>
        <p class="deck registry__deck">
          Veilary replaces the transparent ledger with verifiable secrecy: payments that anyone can
          validate but nobody can trace.
        </p>
      </div>

      <div class="registry__grid" role="group" aria-label="Core modules">
        <article v-for="f in features" :key="f.title" class="registry__item">
          <span class="registry__icon">
            <Icon :name="f.icon" :size="19" />
          </span>
          <div class="registry__body">
            <h3 class="registry__name">{{ f.title }}</h3>
            <p class="registry__text"><small>{{ f.text }}</small></p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.registry__head {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
  gap: clamp(18px, 3vw, 46px);
  align-items: end;
  margin-bottom: clamp(24px, 3.4vw, 42px);
}

.registry__title {
  max-width: 26ch;
}

.registry__deck {
  justify-self: end;
  padding-bottom: 4px;
}

.registry__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-top: 1px solid var(--edge-2);
}

.registry__item {
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr);
  gap: clamp(12px, 1.6vw, 18px);
  align-items: start;
  padding: clamp(18px, 2.2vw, 26px) 0;
  border-bottom: 1px solid var(--edge);
}

.registry__item:nth-child(odd) {
  padding-right: clamp(16px, 2.4vw, 34px);
  border-right: 1px solid var(--edge);
}

.registry__item:nth-child(even) {
  padding-left: clamp(16px, 2.4vw, 34px);
}

.registry__icon {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid var(--edge-2);
  border-radius: var(--r-sm);
  background: rgba(255, 59, 48, 0.06);
  color: var(--red-safe);
}

.registry__body {
  min-width: 0;
}

.registry__name {
  font-size: clamp(1rem, 1.3vw, 1.22rem);
  line-height: 1.15;
}

.registry__text {
  max-width: 46ch;
  margin-top: 7px;
  color: var(--dim);
  font-size: 0.88rem;
  line-height: 1.62;
}

@media (max-width: 980px) {
  .registry__head {
    grid-template-columns: minmax(0, 1fr);
    gap: 14px;
  }

  .registry__deck {
    justify-self: start;
  }
}

@media (max-width: 640px) {
  .registry__grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .registry__item:nth-child(odd) {
    padding-right: 0;
    border-right: 0;
  }

  .registry__item:nth-child(even) {
    padding-left: 0;
  }
}
</style>
