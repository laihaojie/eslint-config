import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
  ],
  format: ['cjs', 'esm'],
  shims: true,
  dts: true,
  splitting: true,
  clean: true,
  plugins: [],
  skipNodeModulesBundle: true,
  target: 'esnext',
})
