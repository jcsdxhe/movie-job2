import { writeFileSync } from 'node:fs'

writeFileSync(new URL('../dist-pages/.nojekyll', import.meta.url), '')
