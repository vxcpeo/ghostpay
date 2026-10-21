<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import SysBar from '@/components/SysBar.vue'
import Colophon from '@/components/Colophon.vue'
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
  <div class="term">
    <div class="term__field" aria-hidden="true" />

    <SysBar />

    <main id="main" class="term__main">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <Colophon />

    <transition name="fade">
      <button v-show="showTop" class="term__jump" type="button" aria-label="Back to top" @click="toTop">
        <Icon name="arrow" :size="17" />
      </button>
    </transition>
  </div>
</template>
