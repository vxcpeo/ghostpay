<script setup>
import { ref } from 'vue'
import Icon from '@/components/Icon.vue'
import { steps } from '@/data/site'

const activeStep = ref(0)
</script>

<template>
  <section id="how-it-works" class="scene drift">
    <div class="scene__inner">
      <div class="scene__head drift__head">
        <p class="tide-kicker">How it works</p>
        <h2 class="tide-title">
          Private money in <em>four moves</em>
        </h2>
        <p class="tide-deck">
          No sign-up, no verification queue, no shared pool to wait on. Connect a wallet and the
          protocol handles the cryptography.
        </p>
      </div>

      <div class="drift__stage">
        <ol class="drift__sequence">
          <li
            v-for="(s, i) in steps"
            :key="s.step"
            class="drift__step"
            :class="{ 'drift__step--on': activeStep === i }"
            @mouseenter="activeStep = i"
            @focusin="activeStep = i"
          >
            <button class="drift__move" type="button" @click="activeStep = i">
              <span class="drift__num">{{ s.step }}</span>
              <span class="drift__body">
                <span class="drift__name">{{ s.title }}</span>
                <span class="drift__text">{{ s.text }}</span>
              </span>
              <span class="drift__go" aria-hidden="true">
                <Icon name="arrow" :size="15" />
              </span>
            </button>
          </li>
        </ol>

        <div class="drift__readout">
          <div class="drift__meta">
            <span class="drift__tag">
              <Icon name="code" :size="12" />
              step {{ steps[activeStep].step }}
            </span>
            <span class="drift__live">live</span>
          </div>
          <h3 class="drift__current">{{ steps[activeStep].title }}</h3>
          <p class="drift__detail">{{ steps[activeStep].text }}</p>

          <div class="drift__route">
            <div
              v-for="(f, i) in ['Wallet', 'Stealth address', 'HPKE seal', 'Broadcast', 'Settled']"
              :key="f"
              class="drift__node"
              :class="{ 'drift__node--on': i <= activeStep + 1 }"
            >
              <span class="drift__dot" aria-hidden="true" />
              <span class="drift__label">{{ f }}</span>
              <span
                v-if="i < 4"
                class="drift__line"
                :class="{ 'drift__line--on': i < activeStep + 1 }"
                aria-hidden="true"
              />
            </div>
          </div>

          <ul class="drift__checks">
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
.drift__head {
  margin-bottom: clamp(30px, 4vw, 54px);
}

.drift__stage {
  display: grid;
  grid-template-columns: minmax(0, 1.04fr) minmax(320px, 0.96fr);
  gap: clamp(20px, 3vw, 44px);
  align-items: start;
}

.drift__sequence {
  border-top: 1px solid var(--line-strong);
}

.drift__step {
  border-bottom: 1px solid var(--line);
}

.drift__move {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) 22px;
  gap: clamp(14px, 2vw, 26px);
  width: 100%;
  padding: clamp(16px, 2vw, 24px) 4px;
  border: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.drift__num {
  color: #6f8ca3;
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.4vw, 3.1rem);
  font-weight: 600;
  line-height: 0.84;
  letter-spacing: -0.05em;
  transition: color var(--motion) var(--ease);
}

.drift__step--on .drift__num {
  color: var(--accent);
}

.drift__body {
  display: grid;
  gap: 7px;
  min-width: 0;
  padding-top: 2px;
}

.drift__name {
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 1.5vw, 1.3rem);
  font-weight: 600;
  line-height: 1.12;
  letter-spacing: -0.03em;
}

.drift__text {
  color: var(--muted);
  font-size: 0.88rem;
  line-height: 1.6;
}

.drift__go {
  padding-top: 6px;
  color: var(--line-strong);
  transition:
    color var(--motion) var(--ease),
    transform var(--motion) var(--ease);
}

.drift__step--on .drift__go {
  color: var(--accent-safe);
  transform: translateX(3px);
}

.drift__readout {
  position: sticky;
  top: clamp(24px, 4vw, 52px);
  padding: clamp(22px, 2.6vw, 38px);
  border-radius: var(--radius-lg);
  background:
    radial-gradient(120% 90% at 100% 0%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 60%),
    var(--surface-alt);
}

.drift__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 16px;
}

.drift__tag {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--accent-safe);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.drift__live {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--success);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.drift__live::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.drift__current {
  font-size: clamp(1.4rem, 2.2vw, 1.8rem);
  line-height: 1.06;
}

.drift__detail {
  margin-top: 12px;
  color: var(--muted);
  font-size: 0.92rem;
  line-height: 1.66;
}

.drift__route {
  display: grid;
  margin-top: clamp(18px, 2.2vw, 26px);
  padding: 14px 16px;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.8);
}

.drift__node {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-block: 5px;
}

.drift__dot {
  flex: none;
  width: 8px;
  height: 8px;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  background: #ffffff;
  transition:
    border-color var(--motion) var(--ease),
    background var(--motion) var(--ease);
}

.drift__node--on .drift__dot {
  border-color: var(--accent);
  background: var(--accent);
}

.drift__label {
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.6rem;
  line-height: 1.3;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.drift__line {
  position: absolute;
  bottom: -5px;
  left: 3px;
  width: 1px;
  height: 10px;
  background: var(--line);
}

.drift__line--on {
  background: var(--accent);
}

.drift__checks {
  display: grid;
  gap: 10px;
  margin-top: clamp(16px, 2vw, 22px);
}

.drift__checks li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: var(--muted);
  font-size: 0.83rem;
  line-height: 1.52;
}

.drift__checks svg {
  flex: none;
  margin-top: 3px;
  color: var(--success);
}

@media (max-width: 980px) {
  .drift__stage {
    grid-template-columns: minmax(0, 1fr);
  }

  .drift__readout {
    position: static;
  }
}
</style>
