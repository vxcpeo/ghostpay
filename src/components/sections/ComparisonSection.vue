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
  <section id="privacy" class="scene expanse">
    <div class="scene__inner">
      <div class="scene__head expanse__head">
        <p class="tide-kicker">Why it matters</p>
        <h2 class="tide-title">
          A public ledger turns your life into
          <em>public record.</em>
        </h2>
        <p class="tide-deck">
          On a transparent chain, your employer knows your rent, your competitors know your treasury,
          and anyone with a block explorer knows your net worth. Seclura keeps verifiability and
          removes the surveillance.
        </p>
      </div>

      <div class="expanse__body">
        <div class="expanse__tablewrap">
          <table class="tide-table">
            <thead>
              <tr>
                <th scope="col">Property</th>
                <th scope="col">Transparent chain</th>
                <th scope="col" class="tide-table__own">Seclura</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in rows" :key="row.label">
                <th scope="row">{{ row.label }}</th>
                <td>
                  <span class="tide-mark" :class="row.legacy ? 'tide-mark--no' : 'tide-mark--yes'">
                    <Icon
                      :name="row.legacy ? 'close' : 'check'"
                      :size="16"
                      :class="row.legacy ? 'tide-sign--no' : 'tide-sign--yes'"
                    />
                  </span>
                </td>
                <td class="tide-table__own">
                  <span class="tide-mark" :class="row.ours ? 'tide-mark--own' : 'tide-mark--no'">
                    <Icon
                      :name="row.ours ? 'check' : 'close'"
                      :size="16"
                      :class="row.ours ? 'tide-sign--own' : 'tide-sign--no'"
                    />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <p class="expanse__note">Transparency for validity · privacy for identity</p>
        </div>

        <div class="expanse__tenets">
          <article v-for="p in pillars" :key="p.title" class="expanse__tenet">
            <span class="expanse__icon">
              <Icon :name="p.icon" :size="17" />
            </span>
            <h3 class="expanse__title">{{ p.title }}</h3>
            <p class="expanse__text">{{ p.text }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.expanse {
  background: linear-gradient(180deg, #ffffff 0%, var(--surface-soft) 46%, #ffffff 100%);
}

.expanse__head {
  margin-bottom: clamp(30px, 4vw, 54px);
}

.expanse__body {
  display: grid;
  grid-template-columns: minmax(0, 1.64fr) minmax(0, 0.72fr);
  gap: clamp(26px, 4vw, 64px);
  align-items: start;
}

.expanse__tablewrap {
  min-width: 0;
}

.tide-table {
  width: 100%;
  border-collapse: collapse;
  font-variant-numeric: tabular-nums;
}

.tide-table thead th {
  padding: 0 10px 14px;
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0.1em;
  text-align: left;
  text-transform: uppercase;
}

.tide-table thead th:not(:first-child) {
  text-align: center;
}

.tide-table thead th:first-child {
  padding-left: 2px;
}

.tide-table thead th:last-child {
  padding-right: 2px;
}

.tide-table tbody th {
  padding: 13px 10px 13px 2px;
  border-top: 1px solid var(--line);
  color: var(--ink);
  font-size: 0.92rem;
  font-weight: 400;
  line-height: 1.4;
  text-align: left;
}

.tide-table tbody td {
  padding: 10px;
  border-top: 1px solid var(--line);
  text-align: center;
}

.tide-table tbody td:last-child {
  padding-right: 2px;
}

.tide-table tbody tr:hover th,
.tide-table tbody tr:hover td {
  background: rgba(41, 141, 255, 0.05);
}

.tide-table__own {
  background: rgba(41, 141, 255, 0.07);
}

.tide-table thead .tide-table__own {
  color: var(--accent-safe);
}

.tide-mark {
  display: inline-grid;
  place-items: center;
  width: 27px;
  height: 27px;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: #ffffff;
}

.tide-mark--own {
  border-color: var(--fill);
  background: var(--fill);
}

.tide-sign--no {
  color: var(--line-strong);
}

.tide-sign--yes {
  color: var(--success);
}

.tide-sign--own {
  color: #ffffff;
}

.expanse__note {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid var(--line-strong);
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.6rem;
  line-height: 1.5;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.expanse__tenets {
  display: grid;
  gap: clamp(18px, 2.4vw, 28px);
}

.expanse__tenet {
  padding-top: 16px;
  border-top: 1px solid var(--line-strong);
}

.expanse__icon {
  display: inline-grid;
  place-items: center;
  width: 34px;
  height: 34px;
  margin-bottom: 12px;
  border-radius: 50%;
  background: var(--accent-wash);
  color: var(--accent-safe);
}

.expanse__title {
  font-size: 1.08rem;
  line-height: 1.14;
}

.expanse__text {
  margin-top: 8px;
  color: var(--muted);
  font-size: 0.86rem;
  line-height: 1.6;
}

@media (max-width: 980px) {
  .expanse__body {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 640px) {
  .tide-table thead th {
    padding: 0 5px 11px;
    font-size: 0.54rem;
  }

  .tide-table tbody th {
    padding: 11px 6px 11px 0;
    font-size: 0.84rem;
  }

  .tide-table tbody td {
    padding: 9px 3px;
  }

  .tide-mark {
    width: 23px;
    height: 23px;
  }
}
</style>
