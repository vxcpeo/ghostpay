import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/abyss.css'

const app = createApp(App)

app.use(router).mount('#app')

// The app is running, so the CSS no-JS fallback must stand down.
document.documentElement.classList.remove('no-js')
