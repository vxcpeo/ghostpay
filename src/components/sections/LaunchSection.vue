<script setup>
import { computed, ref } from 'vue'
import Icon from '@/components/Icon.vue'
import { site } from '@/data/site'

const email = ref('')
const state = ref('idle')

const valid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim()))

function submit() {
  if (!valid.value) {
    state.value = 'error'
    return
  }
  state.value = 'done'
  email.value = ''
}

function reset() {
  state.value = 'idle'
}
</script>

<template>
  <section id="launch" class="scene scene--deep inlet">
    <div class="scene__inner">
      <div class="inlet__grid">
        <div class="inlet__copy">
          <p class="tide-kicker">Private beta</p>
          <h2 class="inlet__title">
            Go invisible in
            <em>under a minute</em>
          </h2>
          <p class="inlet__deck">
            The Seclura app is open to everyone — connect a wallet and start sending privately. Leave
            your email if you want the mobile build, merchant SDK and payroll console the day they
            ship.
          </p>

          <div class="inlet__acts">
            <a class="tide-button tide-button--light" :href="site.url" target="_blank" rel="noopener">
              <Icon name="wallet" :size="16" />
              Launch Seclura
            </a>
            <a
              class="tide-button tide-button--outline"
              href="https://ghostwareos.gitbook.io/docs/core-modules/ghostpay"
              target="_blank"
              rel="noopener"
            >
              <Icon name="book" :size="16" />
              Read the docs
            </a>
          </div>

          <ul class="inlet__ticks">
            <li><Icon name="check" :size="13" /> No sign-up, no KYC</li>
            <li><Icon name="check" :size="13" /> Non-custodial from day one</li>
            <li><Icon name="check" :size="13" /> Stealth addresses on every payment</li>
          </ul>
        </div>

        <div class="inlet__card">
          <template v-if="state !== 'done'">
            <h3 class="inlet__form-title">Early access list</h3>
            <p class="inlet__form-sub">Product drops, audits and privacy-stack news. No spam, ever.</p>
            <form class="inlet__form" novalidate @submit.prevent="submit">
              <label class="inlet__label" for="email">email</label>
              <input
                id="email"
                v-model="email"
                class="inlet__field"
                type="email"
                inputmode="email"
                autocomplete="email"
                placeholder="you@protonmail.com"
                :aria-invalid="state === 'error'"
                @input="reset"
              />
              <p v-if="state === 'error'" class="inlet__error">Enter a valid email address.</p>
              <button class="tide-button tide-button--fill inlet__submit" type="submit">
                <Icon name="send" :size="15" />
                Join the list
              </button>
              <p class="inlet__fine">
                We store nothing but your address, and you can ask us to delete it at any time.
              </p>
            </form>
          </template>

          <div v-else class="inlet__receipt">
            <span class="inlet__receipt-mark">
              <Icon name="check" :size="22" />
            </span>
            <h3 class="inlet__form-title">You’re on the list</h3>
            <p class="inlet__form-sub">
              Thanks — you’ll hear from us when the next Seclura module goes live.
            </p>
            <button class="tide-button tide-button--line tide-button--small" type="button" @click="reset">
              Add another address
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.inlet {
  overflow: hidden;
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
}

.inlet::before {
  content: "";
  position: absolute;
  top: -32%;
  right: -12%;
  width: min(58vw, 720px);
  aspect-ratio: 1;
  border: 1px solid rgba(124, 192, 255, 0.24);
  border-radius: 50%;
  pointer-events: none;
}

.inlet::after {
  content: "";
  position: absolute;
  top: -18%;
  right: -2%;
  width: min(40vw, 500px);
  aspect-ratio: 1;
  border: 1px solid rgba(124, 192, 255, 0.16);
  border-radius: 50%;
  pointer-events: none;
}

.inlet__grid {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.04fr) minmax(320px, 0.82fr);
  gap: clamp(28px, 5vw, 76px);
  align-items: center;
}

.inlet__copy {
  display: grid;
  gap: clamp(14px, 1.8vw, 20px);
}

.inlet__title {
  max-width: 17ch;
  color: var(--shade-ink);
  font-size: clamp(2.4rem, 4.8vw, 4.3rem);
  line-height: 0.94;
  letter-spacing: -0.05em;
}

.inlet__title em {
  display: block;
  color: var(--shade-link);
  font-style: normal;
}

.inlet__deck {
  max-width: 50ch;
  color: var(--shade-muted);
  font-size: 1rem;
  line-height: 1.7;
}

.inlet__acts {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 6px;
}

.inlet__ticks {
  display: grid;
  gap: 9px;
  margin-top: 6px;
}

.inlet__ticks li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: var(--shade-muted);
  font-size: 0.84rem;
  line-height: 1.5;
}

.inlet__ticks svg {
  flex: none;
  margin-top: 3px;
  color: var(--shade-link);
}

.inlet__card {
  padding: clamp(20px, 2.6vw, 34px);
  border-radius: var(--radius-lg);
  background: #ffffff;
  color: var(--ink);
  box-shadow: var(--shadow-lift);
}

.inlet__form-title {
  font-size: clamp(1.15rem, 1.5vw, 1.32rem);
  line-height: 1.1;
}

.inlet__form-sub {
  margin-top: 8px;
  color: var(--muted);
  font-size: 0.85rem;
  line-height: 1.58;
}

.inlet__form {
  display: flex;
  flex-direction: column;
  margin-top: 18px;
}

.inlet__label {
  color: var(--accent-safe);
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.inlet__field {
  width: 100%;
  margin-top: 7px;
  padding: 12px 14px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-sm);
  background: var(--surface-soft);
  font-family: var(--font-mono);
  font-size: 0.88rem;
  transition:
    border-color var(--motion) var(--ease),
    background var(--motion) var(--ease);
}

.inlet__field::placeholder {
  color: var(--muted);
}

.inlet__field:focus {
  border-color: var(--accent);
  background: #ffffff;
}

.inlet__error {
  margin-top: 8px;
  color: var(--danger);
  font-size: 0.8rem;
}

.inlet__submit {
  margin-top: 16px;
}

.inlet__fine {
  margin-top: 11px;
  color: var(--muted);
  font-size: 0.72rem;
  line-height: 1.58;
}

.inlet__receipt {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.inlet__receipt-mark {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  border-radius: 50%;
  background: var(--success-wash);
  color: var(--success);
}

.inlet__receipt .tide-button {
  margin-top: 18px;
}

@media (max-width: 980px) {
  .inlet__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 640px) {
  .inlet__acts .tide-button {
    flex: 1 1 100%;
  }
}
</style>
