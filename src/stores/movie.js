import { defineStore } from 'pinia'
import { getMovies, login as loginApi } from '../api/movie'

const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback } }
export const useMovieStore = defineStore('movie', {
  state: () => ({ user: read('movie-user', null), movies: [], favorites: read('movie-favorites', []), loading: false, error: '' }),
  getters: { favoriteIds: s => new Set(s.favorites.map(m => Number(m.movieid))) },
  actions: {
    async login(username, password) { this.user = await loginApi(username, password); localStorage.setItem('movie-user', JSON.stringify(this.user)) },
    logout() { this.user = null; localStorage.removeItem('movie-user') },
    async loadMovies(force = false) {
      if (this.movies.length && !force) return
      this.loading = true; this.error = ''
      try {
        this.movies = await getMovies()
        // 收藏保存在浏览器中，但海报等电影资料应始终以数据库最新内容为准。
        this.favorites = this.favorites.map(saved => this.movies.find(movie => Number(movie.movieid) === Number(saved.movieid)) || saved)
        localStorage.setItem('movie-favorites', JSON.stringify(this.favorites))
      } catch (e) { this.error = e.message; throw e } finally { this.loading = false }
    },
    toggleFavorite(movie) { const id = Number(movie.movieid); const index = this.favorites.findIndex(m => Number(m.movieid) === id); if (index >= 0) this.favorites.splice(index, 1); else this.favorites.unshift(movie); localStorage.setItem('movie-favorites', JSON.stringify(this.favorites)) },
    clearFavorites() { this.favorites = []; localStorage.removeItem('movie-favorites') }
  }
})
