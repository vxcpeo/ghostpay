<script setup>
import { ref } from 'vue'
import Icon from '@/components/Icon.vue'
import { navLinks, site } from '@/data/site'

const open = ref(false)

function go(href) {
  open.value = false
  const el = document.querySelector(href)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 18
  window.scrollTo({ top, behavior: 'smooth' })
}

function goRoute(path) {
  open.value = false
  window.location.hash = `#${path}`
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="harbor" @keydown.esc="open = false">
    <nav class="harbor__dock" aria-label="Primary">
      <a class="harbor__brand" href="#home" aria-label="Seclura home" @click.prevent="go('#home')">
        <span class="harbor__sigil">
          <Icon name="seclura" :size="21" :stroke="1.3" />
        </span>
        <span class="harbor__word">{{ site.name }}</span>
      </a>

      <a
        v-for="link in navLinks"
        :key="link.href"
        class="harbor__link"
        :href="link.href"
        @click.prevent="go(link.href)"
      >
        <span class="harbor__marker" aria-hidden="true" />
        <span class="harbor__label">{{ link.label }}</span>
      </a>

      <span class="harbor__split" aria-hidden="true" />

      <a class="harbor__paper" :href="site.url" target="_blank" rel="noopener">Whitepaper</a>

      <a
        class="harbor__legal"
        href="/privacy"
        aria-label="Privacy Policy"
        @click.prevent="goRoute('/privacy')"
      >
        <svg
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <rect x="3.2" y="7" width="9.6" height="6.3" rx="1.6" />
          <path d="M5.4 7V5.4a2.6 2.6 0 0 1 5.2 0V7" />
        </svg>
      </a>
      <a
        class="harbor__legal"
        href="/terms"
        aria-label="Terms of Use"
        @click.prevent="goRoute('/terms')"
      >
        <svg
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M4 2.6h5.2L12 5.4v8H4z" />
          <path d="M9 2.8v2.8h2.8M6 8.2h4M6 10.6h4" />
        </svg>
      </a>

      <button
        class="harbor__toggle"
        type="button"
        :aria-expanded="open"
        aria-controls="harbor-sheet"
        aria-label="Toggle navigation"
        @click="open = !open"
      >
        <Icon :name="open ? 'close' : 'menu'" :size="20" />
      </button>

      <button class="tide-button tide-button--fill harbor__cta" type="button" @click="go('#launch')">
        Launch App
      </button>
    </nav>

    <transition name="drop">
      <div v-show="open" id="harbor-sheet" class="harbor__sheet">
      <a
        v-for="link in navLinks"
        :key="link.href"
        class="harbor__sheet-link"
        :href="link.href"
        @click.prevent="go(link.href)"
      >
        <span>{{ link.label }}</span>
        <Icon name="arrow" :size="15" />
      </a>
      <button class="tide-button tide-button--fill" type="button" @click="go('#launch')">
        Launch App
      </button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.harbor {
  position: relative;
  z-index: 60;
}

.harbor__brand {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 9px;
  margin-right: 4px;
  padding: 4px 15px 4px 4px;
  border-right: 1px solid var(--line);
  color: var(--ink);
}

.harbor__sigil {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--fill);
  color: #ffffff;
}

.harbor__word {
  font-family: var(--font-display);
  font-size: 0.98rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.045em;
}

.harbor__dock {
  position: fixed;
  bottom: clamp(14px, 2.2vw, 28px);
  left: 50%;
  z-index: 62;
  display: flex;
  align-items: center;
  gap: 4px;
  max-width: calc(100vw - 24px);
  padding: 7px;
  border: 1px solid rgba(216, 231, 245, 0.9);
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 26px 64px rgba(20, 96, 173, 0.18);
  transform: translateX(-50%);
  backdrop-filter: blur(20px);
}

.harbor__link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 13px;
  border-radius: var(--radius-pill);
  color: var(--muted);
  font-size: 0.87rem;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
  transition:
    color var(--motion) var(--ease),
    background var(--motion) var(--ease);
}

.harbor__link:hover,
.harbor__link:focus-visible {
  background: var(--surface-alt);
  color: var(--ink);
}

.harbor__marker {
  flex: none;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.55;
  transition:
    opacity var(--motion) var(--ease),
    transform var(--motion) var(--ease);
}

.harbor__link:hover .harbor__marker,
.harbor__link:focus-visible .harbor__marker {
  opacity: 1;
  transform: scale(1.4);
}

.harbor__split {
  width: 1px;
  height: 24px;
  margin-inline: 6px;
  background: var(--line);
}

.harbor__paper {
  padding: 10px 12px;
  color: var(--accent-safe);
  font-family: var(--font-mono);
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: color var(--motion) var(--ease);
}

.harbor__paper:hover {
  color: var(--ink);
}

.harbor__legal {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  color: var(--muted);
  transition:
    background var(--motion) var(--ease),
    color var(--motion) var(--ease);
}

.harbor__legal:hover {
  background: var(--surface-alt);
  color: var(--accent-safe);
}

.harbor__toggle {
  display: none;
  place-items: center;
  width: 38px;
  height: 38px;
  padding: 0;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  background: var(--surface);
  color: var(--ink);
  cursor: pointer;
}

.harbor__cta {
  flex: none;
  margin-left: 4px;
  min-height: 40px;
  padding: 10px 21px;
  font-size: 0.86rem;
  white-space: nowrap;
  box-shadow: none;
}

.harbor__sheet {
  position: fixed;
  bottom: clamp(82px, 12vw, 94px);
  left: 50%;
  z-index: 61;
  display: grid;
  gap: 2px;
  width: min(calc(100vw - 24px), 430px);
  padding: 16px;
  border-radius: var(--radius-lg);
  background: #ffffff;
  box-shadow: var(--shadow-lift);
  transform: translateX(-50%);
}

.harbor__sheet-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 13px 8px;
  border-bottom: 1px solid var(--line);
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  transition: color var(--motion) var(--ease);
}

.harbor__sheet-link:hover {
  color: var(--accent-safe);
}

.harbor__sheet .tide-button {
  margin-top: 14px;
}

@media (max-width: 1180px) {
  .harbor__paper {
    display: none;
  }
}

@media (max-width: 980px) {
  .harbor__label {
    display: none;
  }

  .harbor__link {
    padding: 10px;
  }
}

@media (max-width: 820px) {
  .harbor__word {
    display: none;
  }

  .harbor__brand {
    padding-right: 10px;
  }
}

@media (max-width: 760px) {
  .harbor__link {
    display: none;
  }

  .harbor__toggle {
    display: grid;
  }

  .harbor__link,
  .harbor__cta {
    flex: none;
  }
}
</style>
