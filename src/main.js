import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './styles/main.css'

try {
  const preferences = JSON.parse(localStorage.getItem('movie-preferences')) || {}
  document.documentElement.classList.toggle('reduce-effects', preferences.motion === false)
  document.documentElement.classList.toggle('static-hero', preferences.heroEffects === false)
} catch {}

createApp(App).use(createPinia()).use(router).mount('#app')
