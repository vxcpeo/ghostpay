<script setup>
import Icon from '@/components/Icon.vue'
</script>

<template>
  <section class="signal">
    <div class="signal__inner">
      <span class="signal__mark">
        <Icon name="seclura" :size="44" :stroke="1.1" />
      </span>
      <p class="signal__code">404 · signal lost</p>
      <h1 class="signal__title">This page has gone <em>quiet</em>.</h1>
      <p class="signal__text">
        The link you followed doesn’t exist — or it was never meant to be found. Either way, nothing
        here is traceable.
      </p>
      <div class="signal__acts">
        <router-link class="tide-button tide-button--fill" to="/">
          <Icon name="arrow" :size="15" class="signal__back" />
          Back to home
        </router-link>
        <router-link class="tide-button tide-button--line" to="/#features">Explore features</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.signal {
  display: grid;
  place-items: center;
  min-height: 86svh;
  padding-block: clamp(100px, 12vw, 150px) clamp(56px, 8vw, 100px);
  padding-inline: var(--gutter);
  overflow-x: clip;
}

.signal__inner {
  position: relative;
  display: grid;
  justify-items: start;
  gap: 0;
  width: min(100%, 760px);
  padding: clamp(28px, 4vw, 56px);
  border-radius: var(--radius-xl);
  background: rgba(255, 255, 255, 0.68);
  box-shadow: var(--shadow);
  backdrop-filter: blur(14px);
}

.signal__inner::after {
  content: "";
  position: absolute;
  top: -18%;
  right: -14%;
  width: clamp(160px, 24vw, 300px);
  aspect-ratio: 1;
  border: 1px dashed rgba(41, 141, 255, 0.34);
  border-radius: 50%;
  pointer-events: none;
}

.signal__mark {
  display: grid;
  place-items: center;
  width: clamp(76px, 9vw, 104px);
  height: clamp(76px, 9vw, 104px);
  margin-bottom: clamp(18px, 2.4vw, 26px);
  border-radius: 50%;
  background: var(--surface-alt);
  color: var(--accent-safe);
}

.signal__code {
  color: var(--accent-safe);
  font-family: var(--font-mono);
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.signal__title {
  max-width: 16ch;
  margin-top: 14px;
  font-size: clamp(2.5rem, 6vw, 4.6rem);
  line-height: 0.94;
  letter-spacing: -0.055em;
}

.signal__title em {
  color: var(--accent);
  font-style: normal;
}

.signal__text {
  max-width: 46ch;
  margin-top: 20px;
  color: var(--muted);
  font-size: clamp(0.98rem, 1.2vw, 1.08rem);
  line-height: 1.7;
}

.signal__acts {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: clamp(24px, 3vw, 32px);
}

.signal__back {
  transform: rotate(180deg);
}

@media (max-width: 640px) {
  .signal__acts .tide-button {
    flex: 1 1 100%;
  }
}
</style>
