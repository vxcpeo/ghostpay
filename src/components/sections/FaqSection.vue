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
  <section id="faq" class="module log">
    <div class="module__inner">
      <div class="module__bar">
        <p class="kicker">FAQ</p>
      </div>

      <div class="log__grid">
        <div class="log__index">
          <div class="log__head">
            <h2 class="scene-title">
              Questions, <em>answered plainly</em>
            </h2>
            <p class="deck">
              Still curious? The community and the docs go deeper than any landing page can.
            </p>
          </div>

          <div class="log__prompt">
            <p class="log__question">Can’t find what you’re looking for?</p>
            <div class="log__links">
              <a
                class="cmd cmd--ghost cmd--sm"
                href="https://ghostwareos.gitbook.io/docs/core-modules/ghostpay"
                target="_blank"
                rel="noopener"
              >
                <Icon name="book" :size="14" />
                Read the docs
              </a>
              <a
                class="cmd cmd--ghost cmd--sm"
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

        <div class="log__list">
          <div
            v-for="(item, i) in faqs"
            :key="item.q"
            class="log__item"
            :class="{ 'log__item--open': open === i }"
          >
            <button
              class="log__trigger"
              type="button"
              :aria-expanded="open === i"
              @click="toggle(i)"
            >
              <code class="log__num">{{ String(i + 1).padStart(2, '0') }}</code>
              <small class="log__ask">{{ item.q }}</small>
              <span class="log__mark">
                <Icon :name="open === i ? 'close' : 'plus'" :size="15" />
              </span>
            </button>
            <div class="log__answer" :class="{ 'log__answer--open': open === i }">
              <p>{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.log__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.54fr) minmax(0, 1.46fr);
  gap: clamp(24px, 4vw, 60px);
  align-items: start;
}

.log__index {
  position: sticky;
  top: calc(var(--bar) + 22px);
  display: grid;
  gap: clamp(22px, 3vw, 34px);
}

.log__head {
  display: grid;
  gap: clamp(12px, 1.6vw, 18px);
}

.log__prompt {
  padding: clamp(16px, 2vw, 22px);
  border: 1px solid var(--edge-2);
  border-radius: var(--r-sm);
  background: var(--deck);
}

.log__question {
  color: var(--ink);
  font-size: 0.94rem;
  line-height: 1.5;
}

.log__links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.log__list {
  border-top: 1px solid var(--edge-2);
}

.log__item {
  border-bottom: 1px solid var(--edge);
  border-left: 2px solid transparent;
  transition: border-color var(--tick) var(--ease);
}

.log__item--open {
  border-left-color: var(--red);
}

.log__trigger {
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr) 28px;
  gap: 12px;
  align-items: start;
  width: 100%;
  padding: 15px 4px 15px 10px;
  border: 0;
  background: transparent;
  color: var(--ink);
  text-align: left;
  cursor: pointer;
  transition: color var(--tick) var(--ease);
}

.log__trigger:hover {
  color: var(--red-safe);
}

.log__num {
  padding-top: 3px;
  color: var(--faint);
  font-family: var(--mono);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.log__ask {
  font-family: var(--mono);
  font-size: clamp(0.94rem, 1.3vw, 1.08rem);
  font-weight: 600;
  line-height: 1.38;
}

.log__mark {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  margin-top: 1px;
  border: 1px solid var(--edge-2);
  border-radius: var(--r-xs);
  color: var(--dim);
  transition:
    background var(--tick) var(--ease),
    border-color var(--tick) var(--ease),
    color var(--tick) var(--ease);
}

.log__item--open .log__num {
  color: var(--red-safe);
}

.log__item--open .log__mark {
  border-color: var(--red);
  background: var(--red);
  color: #070b10;
}

.log__answer {
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  transition: grid-template-rows var(--tick) var(--ease);
}

.log__answer--open {
  grid-template-rows: 1fr;
}

.log__answer p {
  min-height: 0;
  padding: 0 40px 0 60px;
  color: var(--dim);
  font-size: 0.9rem;
  line-height: 1.7;
  transition: padding var(--tick) var(--ease);
}

.log__answer--open p {
  padding-bottom: 16px;
}

@media (max-width: 980px) {
  .log__grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .log__index {
    position: static;
  }
}

@media (max-width: 640px) {
  .log__trigger {
    grid-template-columns: 28px minmax(0, 1fr) 26px;
    gap: 9px;
    padding: 13px 0 13px 8px;
  }

  .log__answer p {
    padding-left: 45px;
    padding-right: 26px;
  }
}
</style>
