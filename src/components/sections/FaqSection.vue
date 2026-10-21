<script setup>
import { ref } from 'vue'
import Icon from '@/components/Icon.vue'
import { faqs } from '@/data/site'

const open = ref(0)

function toggle(i) {
  open.value = open.value === i ? -1 : i
}
</script>

<template>
  <section id="faq" class="scene shallows">
    <div class="scene__inner">
      <div class="shallows__grid">
        <div class="shallows__aside">
          <div class="scene__head shallows__head">
            <p class="tide-kicker">FAQ</p>
            <h2 class="tide-title">
              Questions, <em>answered plainly</em>
            </h2>
            <p class="tide-deck">
              Still curious? The community and the docs go deeper than any landing page can.
            </p>
          </div>

          <div class="shallows__prompt">
            <p class="shallows__question">Can’t find what you’re looking for?</p>
            <div class="shallows__links">
              <a
                class="tide-button tide-button--line tide-button--small"
                href="https://ghostwareos.gitbook.io/docs/core-modules/ghostpay"
                target="_blank"
                rel="noopener"
              >
                <Icon name="book" :size="14" />
                Read the docs
              </a>
              <a
                class="tide-button tide-button--line tide-button--small"
                href="https://ghostwareos.gitbook.io/docs/vision-and-principles"
                target="_blank"
                rel="noopener"
              >
                <Icon name="book" :size="14" />
                Read the vision doc
              </a>
            </div>
          </div>
        </div>

        <div class="shallows__list">
          <div
            v-for="(item, i) in faqs"
            :key="item.q"
            class="shallows__qa"
            :class="{ 'shallows__qa--open': open === i }"
          >
            <button
              class="shallows__trigger"
              type="button"
              :aria-expanded="open === i"
              @click="toggle(i)"
            >
              <span class="shallows__index">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="shallows__ask">{{ item.q }}</span>
              <span class="shallows__mark">
                <Icon :name="open === i ? 'close' : 'plus'" :size="15" />
              </span>
            </button>
            <div class="shallows__answer" :class="{ 'shallows__answer--open': open === i }">
              <p>{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.shallows__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.56fr) minmax(0, 1.44fr);
  gap: clamp(26px, 4vw, 64px);
  align-items: start;
}

.shallows__aside {
  position: sticky;
  top: clamp(24px, 4vw, 52px);
  display: grid;
  gap: clamp(24px, 3vw, 36px);
}

.shallows__prompt {
  padding: clamp(18px, 2.2vw, 26px);
  border-radius: var(--radius-lg);
  background: var(--surface-alt);
}

.shallows__question {
  color: var(--ink);
  font-size: 0.95rem;
  line-height: 1.5;
}

.shallows__links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}

.shallows__list {
  border-top: 1px solid var(--line-strong);
}

.shallows__qa {
  border-bottom: 1px solid var(--line);
}

.shallows__trigger {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) 30px;
  gap: 12px;
  align-items: start;
  width: 100%;
  padding: 17px 2px;
  border: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: color var(--motion) var(--ease);
}

.shallows__trigger:hover {
  color: var(--accent-safe);
}

.shallows__index {
  padding-top: 4px;
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.shallows__ask {
  font-family: var(--font-display);
  font-size: clamp(1.02rem, 1.4vw, 1.16rem);
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.025em;
}

.shallows__mark {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  margin-top: 2px;
  border-radius: 50%;
  background: var(--surface-soft);
  color: var(--muted);
  transition:
    background var(--motion) var(--ease),
    color var(--motion) var(--ease);
}

.shallows__qa--open .shallows__index {
  color: var(--accent-safe);
}

.shallows__qa--open .shallows__mark {
  background: var(--fill);
  color: #ffffff;
}

.shallows__answer {
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  transition: grid-template-rows var(--motion) var(--ease);
}

.shallows__answer--open {
  grid-template-rows: 1fr;
}

.shallows__answer p {
  min-height: 0;
  padding: 0 42px 0 52px;
  color: var(--muted);
  font-size: 0.92rem;
  line-height: 1.7;
  transition: padding var(--motion) var(--ease);
}

.shallows__answer--open p {
  padding-bottom: 18px;
}

@media (max-width: 980px) {
  .shallows__grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .shallows__aside {
    position: static;
  }
}

@media (max-width: 640px) {
  .shallows__trigger {
    grid-template-columns: 28px minmax(0, 1fr) 26px;
    gap: 9px;
    padding: 14px 0;
  }

  .shallows__answer p {
    padding-left: 37px;
    padding-right: 28px;
  }
}
</style>
