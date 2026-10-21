<script setup>
import Icon from '@/components/Icon.vue'
</script>

<template>
  <section class="module module--first fault">
    <div class="module__inner">
      <div class="fault__inner">
        <span class="fault__mark">
          <Icon name="veilary" :size="40" :stroke="1.15" />
        </span>
        <samp class="fault__code">404 · signal lost</samp>
        <h1 class="fault__title">This page has gone <em>quiet</em>.</h1>
        <p class="fault__text">
          The link you followed doesn’t exist — or it was never meant to be found. Either way, nothing
          here is traceable.
        </p>
        <div class="fault__acts">
          <router-link class="cmd" to="/">
            <Icon name="arrow" :size="15" class="fault__back" />
            Back to home
          </router-link>
          <router-link class="cmd cmd--ghost" to="/#features">Explore features</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fault {
  display: grid;
  align-content: center;
  min-height: calc(100svh - var(--bar) - 120px);
  padding-block: clamp(50px, 8vw, 110px);
}

.fault__inner {
  position: relative;
  display: grid;
  justify-items: start;
  max-width: 760px;
  padding: clamp(24px, 4vw, 48px);
  border: 1px solid var(--edge-2);
  border-radius: var(--r-md);
  background:
    linear-gradient(180deg, rgba(20, 35, 46, 0.78), rgba(10, 18, 26, 0.96)),
    var(--deck);
}

.fault__inner::after {
  content: "";
  position: absolute;
  top: -1px;
  right: -1px;
  width: 90px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--red));
}

.fault__mark {
  display: grid;
  place-items: center;
  width: clamp(66px, 8vw, 88px);
  height: clamp(66px, 8vw, 88px);
  margin-bottom: clamp(16px, 2.2vw, 24px);
  border: 1px solid var(--edge-2);
  border-radius: var(--r-sm);
  background: rgba(255, 59, 48, 0.06);
  color: var(--red);
}

.fault__code {
  color: var(--red-safe);
  font-family: var(--mono);
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.fault__title {
  max-width: 17ch;
  margin-top: 12px;
  color: var(--ink);
  font-size: clamp(2.1rem, 5vw, 4rem);
  line-height: 0.96;
  letter-spacing: -0.045em;
}

.fault__title em {
  color: var(--red);
  font-style: normal;
}

.fault__text {
  max-width: 50ch;
  margin-top: 16px;
  color: var(--dim);
  font-size: clamp(0.96rem, 1.15vw, 1.06rem);
  line-height: 1.7;
}

.fault__acts {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: clamp(22px, 3vw, 30px);
}

.fault__back {
  transform: rotate(180deg);
}

@media (max-width: 640px) {
  .fault__acts .cmd {
    flex: 1 1 100%;
  }
}
</style>
