import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const distDir = resolve(__dirname, '..', 'dist')

const require = createRequire(import.meta.url)
const cjs = require(resolve(distDir, 'index.cjs'))
if (typeof cjs !== 'function') {
  console.error('FAIL: CJS entry is not a function, got:', typeof cjs)
  process.exit(1)
}
const cjsResult = cjs({ typescript: true })
if (!cjsResult) {
  console.error('FAIL: CJS call returned falsy')
  process.exit(1)
}

const { default: esm } = await import(pathToFileURL(resolve(distDir, 'index.mjs')).href)
if (typeof esm !== 'function') {
  console.error('FAIL: ESM default is not a function, got:', typeof esm)
  process.exit(1)
}
const esmResult = esm({ typescript: true })
if (!esmResult) {
  console.error('FAIL: ESM call returned falsy')
  process.exit(1)
}

console.log('OK: both CJS and ESM entries are callable')
