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
  <header class="sysbar" @keydown.esc="open = false">
    <div class="sysbar__inner">
      <a class="sysbar__brand" href="#home" aria-label="Veilary home" @click.prevent="go('#home')">
        <span class="sysbar__mark">
          <Icon name="veilary" :size="17" :stroke="1.6" />
        </span>
        <code class="sysbar__name">{{ site.name }}</code>
      </a>

      <nav class="sysbar__rail" aria-label="Primary">
        <a
          v-for="link in navLinks"
          :key="link.href"
          class="sysbar__cmd"
          :href="link.href"
          @click.prevent="go(link.href)"
        >
          <code class="sysbar__cmd-label">{{ link.label }}</code>
        </a>
      </nav>

      <div class="sysbar__aux">
        <a class="sysbar__doc" :href="site.url" target="_blank" rel="noopener">Whitepaper</a>

        <a
          class="sysbar__glyph"
          href="/privacy"
          aria-label="Privacy Policy"
          @click.prevent="goRoute('/privacy')"
        >
          <svg
            viewBox="0 0 16 16"
            width="15"
            height="15"
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
          class="sysbar__glyph"
          href="/terms"
          aria-label="Terms of Use"
          @click.prevent="goRoute('/terms')"
        >
          <svg
            viewBox="0 0 16 16"
            width="15"
            height="15"
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

        <button class="cmd sysbar__launch" type="button" @click="go('#launch')">Launch App</button>

        <button
          class="sysbar__toggle"
          type="button"
          :aria-expanded="open"
          aria-controls="sysbar-palette"
          aria-label="Toggle navigation"
          @click="open = !open"
        >
          <Icon :name="open ? 'close' : 'menu'" :size="19" />
        </button>
      </div>
    </div>

    <transition name="drop">
      <div v-show="open" id="sysbar-palette" class="sysbar__palette">
        <a
          v-for="link in navLinks"
          :key="link.href"
          class="sysbar__palette-cmd"
          :href="link.href"
          @click.prevent="go(link.href)"
        >
          <code>{{ link.label }}</code>
          <Icon name="arrow" :size="15" />
        </a>
        <button class="cmd cmd--block" type="button" @click="go('#launch')">Launch App</button>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.sysbar__launch {
  min-height: 100%;
  border-radius: 0;
  font-size: 0.7rem;
}

.sysbar__palette .cmd {
  min-height: 46px;
}
</style>
