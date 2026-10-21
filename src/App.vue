<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import TideDock from '@/components/TideDock.vue'
import TideFooter from '@/components/TideFooter.vue'
import Icon from '@/components/Icon.vue'

const showTop = ref(false)

function onScroll() {
  showTop.value = window.scrollY > 900
}

function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <div class="tide">
    <div class="tide__aurora" aria-hidden="true" />

    <main id="main" class="tide__main">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <TideFooter />
    <TideDock />

    <div class="tide__dots" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>

    <transition name="fade">
      <button v-show="showTop" class="tidetop" type="button" aria-label="Back to top" @click="toTop">
        <Icon name="arrow" :size="18" class="tidetop__glyph" />
      </button>
    </transition>
  </div>
</template>
