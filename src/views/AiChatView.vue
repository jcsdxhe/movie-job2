<script setup>
import { nextTick, ref } from 'vue'
import PageShell from '../components/PageShell.vue'
import { askMovieAi } from '../api/ai'

const input = ref('')
const loading = ref(false)
const error = ref('')
const chatBox = ref()
const publicDemo = import.meta.env.VITE_DEMO_MODE === 'true'
const messages = ref([
  { role: 'assistant', content: '你好，我是光影 AI 助手。你可以问我电影推荐、剧情知识、观影选择，或者本系统的使用方法。' }
])
const suggestions = ['推荐一部适合周末看的科幻片', '《流浪地球》讲了什么？', '心情低落时适合看什么电影？', '这个推荐系统有哪些功能？']

async function scrollBottom() { await nextTick(); if (chatBox.value) chatBox.value.scrollTop = chatBox.value.scrollHeight }

async function send(text = input.value) {
  const question = String(text || '').trim()
  if (!question || loading.value) return
  input.value = ''
  error.value = ''
  messages.value.push({ role: 'user', content: question })
  await scrollBottom()
  if (publicDemo) {
    messages.value.push({ role: 'assistant', content: '当前是 GitHub Pages 公开静态演示版，无法安全保存千问 API Key。请运行本地版体验 qwen-turbo 真实问答。' })
    await scrollBottom()
    return
  }
  loading.value = true
  try {
    const answer = await askMovieAi(messages.value)
    messages.value.push({ role: 'assistant', content: answer || '暂时没有生成回答，请换个问题试试。' })
  } catch (e) {
    error.value = e?.message || 'AI 服务请求失败，请稍后重试。'
  } finally {
    loading.value = false
    await scrollBottom()
  }
}

function onKeydown(event) {
  if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); send() }
}

function resetChat() {
  messages.value = [{ role: 'assistant', content: '新对话已开始。想看什么类型的电影？' }]
  error.value = ''
}
</script>

<template>
  <PageShell>
    <section class="ai-chat-page">
      <aside class="ai-chat-aside">
        <div class="ai-orb">AI</div>
        <span class="eyebrow">QWEN AI · QWEN-TURBO</span>
        <h1>光影 AI 问答</h1>
        <p>接入通义千问 qwen-turbo，支持连续追问与电影知识问答。</p>
        <div class="ai-capabilities"><span>✓ 电影推荐</span><span>✓ 剧情问答</span><span>✓ 观影建议</span><span>✓ 系统帮助</span></div>
        <small>API Key 仅保存在本机后端配置中，不会写入 Vue 代码或上传到公开仓库。</small>
      </aside>

      <div class="chat-panel">
        <header><div><span class="assistant-avatar">✦</span><div><b>光影助手</b><small><i></i> {{ publicDemo ? '公开展示模式' : 'qwen-turbo 已接入' }}</small></div></div><button class="link-button" @click="resetChat">清空对话</button></header>
        <div ref="chatBox" class="chat-messages">
          <div v-for="(message, index) in messages" :key="index" :class="['chat-row', message.role]">
            <span class="chat-avatar">{{ message.role === 'assistant' ? '✦' : '我' }}</span>
            <div class="chat-bubble">{{ message.content }}</div>
          </div>
          <div v-if="loading" class="chat-row assistant"><span class="chat-avatar">✦</span><div class="chat-bubble typing"><i></i><i></i><i></i></div></div>
        </div>
        <div class="suggestions"><button v-for="item in suggestions" :key="item" @click="send(item)">{{ item }}</button></div>
        <div v-if="error" class="chat-error">{{ error }} <button @click="send(messages.filter(m => m.role === 'user').at(-1)?.content)">重试</button></div>
        <div class="chat-input"><textarea v-model="input" rows="2" placeholder="输入你的电影问题，Enter 发送，Shift + Enter 换行" @keydown="onKeydown"></textarea><button :disabled="loading || !input.trim()" @click="send()">发送 <span>↑</span></button></div>
        <p class="ai-disclaimer">AI 回答仅供参考，电影信息请以官方资料为准。</p>
      </div>
    </section>
  </PageShell>
</template>
