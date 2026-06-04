import { defineConfig } from 'tsdown'
// import { StaleGuardRecorder } from 'tsdown-stale-guard'

export default defineConfig({
  entry: [
    'src/index.ts',
  ],
  dts: true,
  shims: true,
  format: ['cjs', 'esm'],
  exports: true,
  deps: {
    skipNodeModulesBundle: true,
  },
  plugins: [
    // StaleGuardRecorder(),
  ],
})
