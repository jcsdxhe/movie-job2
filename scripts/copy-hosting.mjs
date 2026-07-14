import { mkdirSync, copyFileSync } from 'node:fs'
mkdirSync('dist/.openai', { recursive: true })
copyFileSync('.openai/hosting.json', 'dist/.openai/hosting.json')
