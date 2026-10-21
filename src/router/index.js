import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Seclura — Private Payments, Invisible by Design' }
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('@/views/LegalView.vue'),
    props: { kind: 'privacy' },
    meta: { title: 'Privacy Policy — Seclura' }
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import('@/views/LegalView.vue'),
    props: { kind: 'terms' },
    meta: { title: 'Terms of Use — Seclura' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Signal lost — Seclura' }
  }
]

const HEADER_OFFSET = 92

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  /**
   * With hash history the URL looks like `#/` or `#/privacy`, so a plain in-page anchor
   * (`href="#features"`) would be read by the router as a *path* change. Every in-page link
   * therefore goes through the explicit `#/` + `to.hash` form ("/#features"), and this handler
   * resolves it — retrying briefly, because a route component may not be mounted yet when
   * scrollBehavior first runs.
   */
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    // In-page anchors are handled in-place by LedgerMasthead/HeroSection; nothing for the router.
    if (to.path === from.path && !to.hash) return { top: 0 }
    if (!to.hash) return { top: 0 }

    const el = document.querySelector(to.hash)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
      return { top, behavior: 'smooth' }
    }

    // Cross-page anchor: wait for the destination to render, then scroll.
    return new Promise((resolve) => {
      let tries = 0
      const tick = () => {
        const target = document.querySelector(to.hash)
        if (target) {
          resolve({
            top: target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
            behavior: 'smooth'
          })
        } else if (++tries < 12) {
          window.requestAnimationFrame(tick)
        } else {
          resolve({ top: 0 })
        }
      }
      window.requestAnimationFrame(tick)
    })
  }
})

router.afterEach((to) => {
  if (to.meta?.title) document.title = to.meta.title
})

export default router
