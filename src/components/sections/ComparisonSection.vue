<script setup>
import Icon from '@/components/Icon.vue'

const rows = [
  { label: 'Sender visible on-chain', legacy: true, ours: false },
  { label: 'Receiver visible on-chain', legacy: true, ours: false },
  { label: 'Amount visible on-chain', legacy: true, ours: false },
  { label: 'Payment history linkable', legacy: true, ours: false },
  { label: 'Requires KYC / account', legacy: true, ours: false },
  { label: 'Funds held by a third party', legacy: true, ours: false },
  { label: 'Settlement final in under 1 second', legacy: false, ours: true },
  { label: 'Cross-chain movement built in', legacy: false, ours: true },
  { label: 'Recipient-only readable payment data', legacy: false, ours: true },
  { label: 'Self-custodial by design', legacy: false, ours: true }
]

const pillars = [
  {
    icon: 'code',
    title: 'Documented cryptography',
    text: 'Stealth address derivation and HPKE payload sealing are published modules — anyone can read how a payment is hidden.'
  },
  {
    icon: 'shield',
    title: 'Privacy as a module',
    text: 'Payments sit inside a wider privacy stack (GhostSwap, DarkRelay, ID obfuscation) rather than being bolted onto a transparent wallet.'
  },
  {
    icon: 'eyeOff',
    title: 'No identity to leak',
    text: 'No accounts, no KYC queue, no identity data. There is nothing on the payment path worth subpoenaing.'
  }
]
</script>

<template>
  <section id="privacy" class="module ledger-board">
    <div class="module__inner">
      <div class="module__bar">
        <p class="kicker">Why it matters</p>
      </div>

      <div class="ledger-board__head">
        <h2 class="scene-title">
          A public ledger turns your life into
          <em>public record.</em>
        </h2>
        <p class="deck">
          On a transparent chain, your employer knows your rent, your competitors know your treasury,
          and anyone with a block explorer knows your net worth. Veilary keeps verifiability and
          removes the surveillance.
        </p>
      </div>

      <div class="ledger-board__grid">
        <div class="ledger-board__table">
          <dl class="compare">
            <div class="compare__head">
              <dt>Property</dt>
              <dd>Transparent chain</dd>
              <dd class="compare__own">Veilary</dd>
            </div>
            <div v-for="row in rows" :key="row.label" class="compare__row">
              <dt>{{ row.label }}</dt>
              <dd>
                <span class="mark" :class="row.legacy ? 'mark--no' : 'mark--yes'">
                  <Icon
                    :name="row.legacy ? 'close' : 'check'"
                    :size="15"
                    :class="row.legacy ? 'sign--no' : 'sign--yes'"
                  />
                </span>
              </dd>
              <dd class="compare__own">
                <span class="mark" :class="row.ours ? 'mark--own' : 'mark--no'">
                  <Icon
                    :name="row.ours ? 'check' : 'close'"
                    :size="15"
                    :class="row.ours ? 'sign--own' : 'sign--no'"
                  />
                </span>
              </dd>
            </div>
          </dl>
          <p class="ledger-board__note">Transparency for validity · privacy for identity</p>
        </div>

        <div class="tenets">
          <article v-for="p in pillars" :key="p.title" class="tenets__item">
            <span class="tenets__icon">
              <Icon :name="p.icon" :size="16" />
            </span>
            <h3 class="tenets__title">{{ p.title }}</h3>
            <p class="tenets__text">{{ p.text }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ledger-board__head {
  display: grid;
  gap: clamp(12px, 1.6vw, 18px);
  max-width: 66ch;
  margin-bottom: clamp(22px, 3.2vw, 40px);
}

.ledger-board__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.68fr) minmax(250px, 0.62fr);
  gap: clamp(24px, 3.6vw, 56px);
  align-items: start;
}

.ledger-board__table {
  min-width: 0;
}

.compare {
  display: grid;
  border-top: 1px solid var(--edge-2);
}

.compare__head,
.compare__row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 116px 116px;
  gap: 10px;
  align-items: center;
}

.compare__head {
  padding-block: 9px;
  border-bottom: 1px solid var(--edge-2);
}

.compare__head dt,
.compare__head dd {
  color: var(--faint);
  font-family: var(--mono);
  font-size: 0.58rem;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-align: center;
}

.compare__head dt {
  text-align: left;
}

.compare__row {
  padding-block: 10px;
  border-bottom: 1px solid var(--edge);
}

.compare__row:hover {
  background: rgba(77, 240, 208, 0.035);
}

.compare__row dt {
  color: var(--ink);
  font-size: 0.9rem;
  line-height: 1.45;
}

.compare__row dd {
  text-align: center;
}

.compare__own {
  background: rgba(255, 59, 48, 0.06);
}

.compare__head .compare__own {
  color: var(--red-safe);
}

.ledger-board__note {
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid var(--edge-2);
  color: var(--faint);
  font-family: var(--mono);
  font-size: 0.6rem;
  line-height: 1.5;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.sign--no {
  color: var(--faint);
}

.sign--yes {
  color: var(--ok);
}

.sign--own {
  color: #070b10;
}

.tenets {
  display: grid;
  gap: clamp(16px, 2.2vw, 26px);
}

.tenets__item {
  padding-top: 14px;
  border-top: 1px solid var(--edge-2);
}

.tenets__icon {
  display: inline-grid;
  place-items: center;
  width: 30px;
  height: 30px;
  margin-bottom: 10px;
  border: 1px solid var(--edge-2);
  border-radius: var(--r-xs);
  color: var(--red-safe);
}

.tenets__title {
  font-size: 1rem;
  line-height: 1.16;
}

.tenets__text {
  margin-top: 7px;
  color: var(--dim);
  font-size: 0.85rem;
  line-height: 1.6;
}

@media (max-width: 980px) {
  .ledger-board__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 640px) {
  .compare__head,
  .compare__row {
    grid-template-columns: minmax(0, 1fr) 64px 64px;
    gap: 4px;
  }

  .compare__head dt,
  .compare__head dd {
    font-size: 0.5rem;
  }

  .compare__row dt {
    font-size: 0.82rem;
  }

  .mark {
    width: 22px;
    height: 22px;
  }
}
</style>
