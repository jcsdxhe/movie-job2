export async function askMovieAi(messages) {
  const response = await fetch('/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: messages.slice(-10).map(({ role, content }) => ({ role, content }))
    })
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || '千问服务请求失败，请稍后重试')
  return String(data.content || '').trim()
}
