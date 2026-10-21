<script setup>
import { ref } from 'vue'
import Icon from '@/components/Icon.vue'
import { steps } from '@/data/site'

const activeStep = ref(0)
</script>

<template>
  <section id="how-it-works" class="module process">
    <div class="module__inner">
      <div class="module__bar">
        <p class="kicker">How it works</p>
      </div>

      <div class="process__head">
        <h2 class="scene-title">
          Private money in <em>four moves</em>
        </h2>
        <p class="deck">
          No sign-up, no verification queue, no shared pool to wait on. Connect a wallet and the
          protocol handles the cryptography.
        </p>
      </div>

      <div class="process__grid">
        <ol class="process__list">
          <li
            v-for="(s, i) in steps"
            :key="s.step"
            class="process__step"
            :class="{ 'process__step--on': activeStep === i }"
            @mouseenter="activeStep = i"
            @focusin="activeStep = i"
          >
            <button class="process__move" type="button" @click="activeStep = i">
              <output class="process__num">{{ s.step }}</output>
              <span class="process__body">
                <span class="process__name">{{ s.title }}</span>
                <span class="process__text">{{ s.text }}</span>
              </span>
              <span class="process__go" aria-hidden="true">
                <Icon name="arrow" :size="15" />
              </span>
            </button>
          </li>
        </ol>

        <div class="process__readout">
          <div class="process__meta">
            <code class="process__tag">
              <Icon name="code" :size="12" />
              step {{ steps[activeStep].step }}
            </code>
            <span class="process__live">live</span>
          </div>
          <h3 class="process__current">{{ steps[activeStep].title }}</h3>
          <p class="process__detail">{{ steps[activeStep].text }}</p>

          <div class="trace">
            <div
              v-for="(f, i) in ['Wallet', 'Stealth address', 'HPKE seal', 'Broadcast', 'Settled']"
              :key="f"
              class="trace__node"
              :class="{ 'trace__node--on': i <= activeStep + 1 }"
            >
              <span class="trace__dot" aria-hidden="true" />
              <code class="trace__label">{{ f }}</code>
              <span
                v-if="i < 4"
                class="trace__line"
                :class="{ 'trace__line--on': i < activeStep + 1 }"
                aria-hidden="true"
              />
            </div>
          </div>

          <ul class="process__checks">
            <li>
              <Icon name="check" :size="14" />
              Address derivation happens in your wallet — keys never leave your device
            </li>
            <li>
              <Icon name="check" :size="14" />
              A fresh one-time address per payment means nothing is linkable
            </li>
            <li>
              <Icon name="check" :size="14" />
              Solana settlement finalises in under a second
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.process__head {
  display: grid;
  gap: clamp(12px, 1.6vw, 18px);
  max-width: 64ch;
  margin-bottom: clamp(24px, 3.4vw, 42px);
}

.process__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.06fr) minmax(300px, 0.94fr);
  gap: clamp(20px, 3vw, 46px);
  align-items: start;
}

.process__list {
  border-top: 1px solid var(--edge-2);
}

.process__step {
  border-bottom: 1px solid var(--edge);
  border-left: 2px solid transparent;
  transition: border-color var(--tick) var(--ease);
}

.process__step--on {
  border-left-color: var(--red);
}

.process__move {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) 22px;
  gap: clamp(12px, 1.8vw, 24px);
  width: 100%;
  padding: clamp(14px, 1.8vw, 22px) 6px clamp(14px, 1.8vw, 22px) 12px;
  border: 0;
  background: transparent;
  color: var(--ink);
  text-align: left;
  cursor: pointer;
}

.process__num {
  color: var(--faint);
  font-family: var(--mono);
  font-size: clamp(1.5rem, 2.4vw, 2.1rem);
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: -0.04em;
  transition: color var(--tick) var(--ease);
}

.process__step--on .process__num {
  color: var(--red);
}

.process__body {
  display: grid;
  gap: 6px;
  min-width: 0;
  padding-top: 2px;
}

.process__name {
  color: var(--ink);
  font-family: var(--mono);
  font-size: clamp(0.94rem, 1.3vw, 1.12rem);
  font-weight: 700;
  line-height: 1.2;
}

.process__text {
  color: var(--dim);
  font-size: 0.87rem;
  line-height: 1.6;
}

.process__go {
  padding-top: 4px;
  color: var(--edge-3);
  transition:
    color var(--tick) var(--ease),
    transform var(--tick) var(--ease);
}

.process__step--on .process__go {
  color: var(--red-safe);
  transform: translateX(3px);
}

.process__readout {
  position: sticky;
  top: calc(var(--bar) + 22px);
  padding: clamp(18px, 2.4vw, 30px);
  border: 1px solid var(--edge-2);
  border-radius: var(--r-md);
  background:
    linear-gradient(180deg, rgba(20, 35, 46, 0.78), rgba(10, 18, 26, 0.96)),
    var(--deck);
}

.process__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 1px dashed var(--edge);
}

.process__tag {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--red-safe);
  font-family: var(--mono);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.process__live {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--mint);
  font-family: var(--mono);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.process__live::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.process__current {
  font-size: clamp(1.3rem, 2vw, 1.7rem);
  line-height: 1.06;
}

.process__detail {
  margin-top: 10px;
  color: var(--dim);
  font-size: 0.9rem;
  line-height: 1.64;
}

.trace {
  display: grid;
  margin-top: clamp(16px, 2vw, 24px);
  padding: 12px 14px;
  border: 1px solid var(--edge);
  border-radius: var(--r-sm);
  background: rgba(4, 7, 11, 0.6);
}

.trace__node {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-block: 5px;
}

.trace__dot {
  flex: none;
  width: 8px;
  height: 8px;
  border: 1px solid var(--edge-3);
  border-radius: 50%;
  background: var(--void);
  transition:
    border-color var(--tick) var(--ease),
    background var(--tick) var(--ease);
}

.trace__node--on .trace__dot {
  border-color: var(--red);
  background: var(--red);
  box-shadow: 0 0 0 3px rgba(255, 59, 48, 0.12);
}

.trace__label {
  color: var(--dim);
  font-family: var(--mono);
  font-size: 0.6rem;
  line-height: 1.3;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.trace__line {
  position: absolute;
  bottom: -5px;
  left: 3px;
  width: 1px;
  height: 10px;
  background: var(--edge);
}

.trace__line--on {
  background: var(--red);
}

.process__checks {
  display: grid;
  gap: 9px;
  margin-top: clamp(14px, 2vw, 20px);
}

.process__checks li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: var(--dim);
  font-size: 0.82rem;
  line-height: 1.52;
}

.process__checks svg {
  flex: none;
  margin-top: 3px;
  color: var(--ok);
}

@media (max-width: 980px) {
  .process__grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .process__readout {
    position: static;
  }
}
</style>
