<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMovieStore } from '../stores/movie'

const demoMode = import.meta.env.VITE_DEMO_MODE === 'true'
const username = ref('test')
const password = ref('123456')
const error = ref('')
const loading = ref(false)
const store = useMovieStore()
const router = useRouter()
const route = useRoute()

async function finishLogin(user, pass) {
  error.value = ''
  loading.value = true
  try {
    await store.login(user, pass)
    router.replace(String(route.query.redirect || '/'))
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

function submit() {
  return finishLogin(username.value.trim(), password.value)
}

function enterDemo() {
  return finishLogin('test', '123456')
}
</script>

<template>
  <main class="login-page">
    <div class="orb orb-one"></div>
    <div class="orb orb-two"></div>

    <section class="login-intro">
      <div class="eyebrow">MOVIE RECOMMENDATION</div>
      <h1>在万千光影中<br><em>遇见你的下一部电影</em></h1>
      <p>基于用户评分与大数据分析，为每一次观影提供更懂你的选择。</p>
      <div class="feature-line">
        <span>◆ 个性推荐</span>
        <span>✦ 热门电影</span>
        <span>★ 实时评分</span>
      </div>
    </section>

    <section v-if="demoMode" class="login-card">
      <span class="login-logo">▶</span>
      <h2>课程作业演示</h2>
      <p>这是电影推荐系统的公开展示版，不收集账号、密码或个人信息。</p>
      <div v-if="error" class="form-error">{{ error }}</div>
      <button class="primary-button full" :disabled="loading" @click="enterDemo">
        {{ loading ? '正在进入…' : '一键进入演示' }}
        <span v-if="!loading">→</span>
      </button>
      <small>仅用于课程项目功能展示</small>
    </section>

    <form v-else class="login-card" @submit.prevent="submit">
      <span class="login-logo">▶</span>
      <h2>欢迎回来</h2>
      <p>登录后开启专属观影旅程</p>
      <label>
        用户名
        <input v-model="username" autocomplete="username" placeholder="请输入用户名" required>
      </label>
      <label>
        密码
        <input v-model="password" type="password" autocomplete="current-password" placeholder="请输入密码" required>
      </label>
      <div v-if="error" class="form-error">{{ error }}</div>
      <button class="primary-button full" :disabled="loading">
        {{ loading ? '正在登录…' : '登录' }}
        <span v-if="!loading">→</span>
      </button>
      <small>演示账号：test / 123456</small>
    </form>
  </main>
</template>
