import axios from 'axios'
import { demoMovies } from '../data/demoMovies'

const demoMode = import.meta.env.VITE_DEMO_MODE === 'true'

const http = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL || '/api', timeout: 10000 })
http.interceptors.response.use(r => r.data, error => Promise.reject(new Error(error.response?.data?.message || error.response?.data || (error.code === 'ECONNABORTED' ? '请求超时，请检查后端服务' : '无法连接服务器，请确认后端已启动'))))

const unwrap = (data) => data?.data ?? data?.result ?? data?.rows ?? data
const listOf = data => { const value = unwrap(data); return Array.isArray(value) ? value : (value?.list || value?.records || []) }
export const normalizeMovie = (raw = {}) => ({
  movieid: Number(raw.movieid ?? raw.movieId ?? raw.id),
  moviename: raw.moviename ?? raw.movieName ?? raw.name ?? raw.title ?? '未命名电影',
  picture: raw.picture ?? raw.poster ?? raw.image ?? '',
  averating: Number(raw.averating ?? raw.avgRating ?? raw.rating ?? 0),
  numrating: Number(raw.numrating ?? raw.numRating ?? raw.hot ?? 0),
  description: raw.description ?? raw.introduction ?? '暂无剧情简介',
  typelist: raw.typelist ?? raw.typeList ?? raw.genres ?? '',
  director: raw.director ?? '暂无信息', leadactors: raw.leadactors ?? raw.leadActors ?? '暂无信息',
  releasetime: raw.releasetime ?? raw.releaseTime ?? ''
})

export async function login(username, password) {
  if (demoMode) {
    if (username !== 'test' || password !== '123456') throw new Error('用户名或密码错误')
    return { userid: 1, username }
  }
  const data = await http.get('/login', { params: { username, password } }); const value = unwrap(data)
  if (value === false || value == null || data?.success === false || data?.code === 500) throw new Error(data?.message || '用户名或密码错误')
  const user = typeof value === 'object' ? value : {}
  return { userid: Number(user.userid ?? user.userId ?? user.id ?? data?.userid ?? 1), username: user.username ?? username }
}
export async function getMovies() { return demoMode ? demoMovies.map(normalizeMovie) : listOf(await http.get('/movie/list')).map(normalizeMovie) }
export async function reportClick(userid, movieid) { return demoMode ? 'ok' : http.get('/movie/click', { params: { userid, movieid } }) }
export async function submitRating(userid, movieid, rating) {
  if (demoMode) return 'ok'
  const form = new URLSearchParams({ userid, movieid, rating, timestamp: String(Math.floor(Date.now() / 1000)) })
  return http.post('/rating/add', form, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
}
export async function getRecommendations(userid) { return demoMode ? demoMovies.slice(0,8).map(normalizeMovie) : listOf(await http.get('/rec/list', { params: { userid } })).map(normalizeMovie).sort((a,b) => b.averating - a.averating) }
