import type { Awaitable, OptionsConfig, TypedFlatConfigItem } from '@antfu/eslint-config'
import type { Linter } from 'eslint'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'
// 用命名导出 `antfu` 而非默认导出：避免 tsdown 生成的 CJS 产物
// 在 `require('@antfu/eslint-config')`（纯 ESM）时把整个命名空间对象赋给 `.default`，
// 从而导致 `(0 , _antfu_eslint_config.default) is not a function`。
import { antfu } from '@antfu/eslint-config'

export default function jie(options?: OptionsConfig & Omit<TypedFlatConfigItem, 'files'>, ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[]) {
  const customOptions: OptionsConfig & TypedFlatConfigItem = {
    ignores: [
      'src/api/auto/',
      'src/api/meta/',
      'src/api/types/',
      'mock/',
    ],
    rules: {
      'antfu/if-newline': 'off',
      'vue/html-self-closing': 'off',
      'vue/singleline-html-element-content-newline': 'off',
    },
  }

  return antfu(deepMerge(customOptions, options ?? {}), ...userConfigs)
}

function deepMerge(target: any, source: any) {
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key])
          Object.assign(target, { [key]: {} })
        deepMerge(target[key], source[key])
      }
      else if (Array.isArray(source[key])) {
        if (!target[key])
          Object.assign(target, { [key]: [] })
        target[key] = target[key].concat(source[key])
      }
      else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }
  return target
}

function isObject(item: any) {
  return item && typeof item === 'object' && !Array.isArray(item)
}
