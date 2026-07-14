import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'
import FavoritesView from '../views/FavoritesView.vue'
import RecommendView from '../views/RecommendView.vue'
import SettingsView from '../views/SettingsView.vue'

const router = createRouter({ history: createWebHistory(), scrollBehavior: () => ({ top: 0 }), routes: [
  { path: '/login', component: LoginView, meta: { guest: true } },
  { path: '/', component: HomeView },
  { path: '/movie/:id', component: DetailView },
  { path: '/favorites', component: FavoritesView },
  { path: '/recommend', component: RecommendView },
  { path: '/settings', component: SettingsView },
  { path: '/:pathMatch(.*)*', redirect: '/' }
] })

router.beforeEach((to) => {
  const loggedIn = Boolean(localStorage.getItem('movie-user'))
  if (!to.meta.guest && !loggedIn) return { path: '/login', query: { redirect: to.fullPath } }
  if (to.meta.guest && loggedIn) return '/'
})
export default router
