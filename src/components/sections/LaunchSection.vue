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
  <section id="launch" class="module gate">
    <div class="module__inner">
      <div class="module__bar">
        <p class="kicker">Private beta</p>
      </div>

      <div class="gate__grid">
        <div class="gate__copy">
          <h2 class="gate__title">
            Go invisible in
            <em>under a minute</em>
          </h2>
          <p class="gate__deck">
            The Veilary app is open to everyone — connect a wallet and start sending privately. Leave
            your email if you want the mobile build, merchant SDK and payroll console the day they
            ship.
          </p>

          <div class="gate__acts">
            <a class="cmd" :href="site.url" target="_blank" rel="noopener">
              <Icon name="wallet" :size="16" />
              Launch Veilary
            </a>
            <a
              class="cmd cmd--ghost"
              href="https://ghostwareos.gitbook.io/docs/core-modules/ghostpay"
              target="_blank"
              rel="noopener"
            >
              <Icon name="book" :size="16" />
              Read the docs
            </a>
          </div>

          <ul class="gate__ticks">
            <li><Icon name="check" :size="13" /> No sign-up, no KYC</li>
            <li><Icon name="check" :size="13" /> Non-custodial from day one</li>
            <li><Icon name="check" :size="13" /> Stealth addresses on every payment</li>
          </ul>
        </div>

        <div class="gate__shell">
          <template v-if="state !== 'done'">
            <h3 class="gate__form-title">Early access list</h3>
            <p class="gate__form-sub">Product drops, audits and privacy-stack news. No spam, ever.</p>
            <form class="gate__form" novalidate @submit.prevent="submit">
              <label class="gate__label" for="email">email</label>
              <input
                id="email"
                v-model="email"
                class="gate__field"
                type="email"
                inputmode="email"
                autocomplete="email"
                placeholder="you@protonmail.com"
                :aria-invalid="state === 'error'"
                @input="reset"
              />
              <p v-if="state === 'error'" class="gate__error">Enter a valid email address.</p>
              <button class="cmd cmd--block gate__submit" type="submit">
                <Icon name="send" :size="15" />
                Join the list
              </button>
              <p class="gate__fine">
                We store nothing but your address, and you can ask us to delete it at any time.
              </p>
            </form>
          </template>

          <div v-else class="gate__receipt">
            <span class="gate__receipt-mark">
              <Icon name="check" :size="22" />
            </span>
            <h3 class="gate__form-title">You’re on the list</h3>
            <p class="gate__form-sub">
              Thanks — you’ll hear from us when the next Veilary module goes live.
            </p>
            <button class="cmd cmd--ghost cmd--sm" type="button" @click="reset">
              Add another address
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gate__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.02fr) minmax(320px, 0.82fr);
  gap: clamp(26px, 4.6vw, 68px);
  align-items: center;
}

.gate__copy {
  display: grid;
  gap: clamp(13px, 1.7vw, 19px);
}

.gate__title {
  max-width: 17ch;
  font-size: clamp(2.1rem, 4.4vw, 3.9rem);
  line-height: 0.96;
  letter-spacing: -0.04em;
}

.gate__title em {
  display: block;
  color: var(--red);
  font-style: normal;
}

.gate__deck {
  max-width: 52ch;
  color: var(--dim);
  font-size: 0.98rem;
  line-height: 1.7;
}

.gate__acts {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 4px;
}

.gate__ticks {
  display: grid;
  gap: 8px;
  margin-top: 4px;
}

.gate__ticks li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: var(--dim);
  font-size: 0.84rem;
  line-height: 1.5;
}

.gate__ticks svg {
  flex: none;
  margin-top: 3px;
  color: var(--ok);
}

.gate__shell {
  position: relative;
  padding: clamp(18px, 2.4vw, 30px);
  border: 1px solid var(--edge-2);
  border-radius: var(--r-md);
  background:
    linear-gradient(180deg, rgba(20, 35, 46, 0.82), rgba(10, 18, 26, 0.97)),
    var(--deck);
  box-shadow: 0 0 70px rgba(255, 59, 48, 0.08);
}

.gate__shell::before {
  content: "";
  position: absolute;
  top: -1px;
  right: -1px;
  width: 46px;
  height: 2px;
  background: var(--red);
}

.gate__form-title {
  font-size: clamp(1.1rem, 1.5vw, 1.3rem);
  line-height: 1.12;
}

.gate__form-sub {
  margin-top: 7px;
  color: var(--dim);
  font-size: 0.84rem;
  line-height: 1.58;
}

.gate__form {
  display: flex;
  flex-direction: column;
  margin-top: 16px;
}

.gate__label {
  color: var(--red-safe);
  font-family: var(--mono);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.gate__field {
  width: 100%;
  margin-top: 6px;
  padding: 11px 12px;
  border: 1px solid var(--edge-2);
  border-radius: var(--r-sm);
  background: rgba(4, 7, 11, 0.72);
  color: var(--ink);
  font-family: var(--mono);
  font-size: 0.86rem;
  transition:
    border-color var(--tick) var(--ease),
    background var(--tick) var(--ease);
}

.gate__field::placeholder {
  color: var(--faint);
}

.gate__field:focus {
  border-color: var(--mint);
  background: rgba(4, 7, 11, 0.95);
  outline: none;
}

.gate__error {
  margin-top: 7px;
  color: var(--bad);
  font-size: 0.8rem;
}

.gate__submit {
  margin-top: 14px;
}

.gate__fine {
  margin-top: 10px;
  color: var(--faint);
  font-size: 0.72rem;
  line-height: 1.58;
}

.gate__receipt {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.gate__receipt-mark {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  margin-bottom: 14px;
  border: 1px solid rgba(92, 225, 160, 0.35);
  border-radius: var(--r-sm);
  color: var(--ok);
}

.gate__receipt .cmd {
  margin-top: 16px;
}

@media (max-width: 980px) {
  .gate__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 640px) {
  .gate__acts .cmd {
    flex: 1 1 100%;
  }
}
</style>
