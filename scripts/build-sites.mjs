import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs'

mkdirSync('dist/server', { recursive: true })
mkdirSync('dist/.openai', { recursive: true })
copyFileSync('.openai/hosting.json', 'dist/.openai/hosting.json')

writeFileSync(
  'dist/server/index.js',
  `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request)
    if (response.status !== 404) return response

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return response
    }

    const url = new URL(request.url)
    url.pathname = '/index.html'
    return env.ASSETS.fetch(new Request(url, request))
  }
}
`
)
