import type { FlatConfigComposer } from 'eslint-flat-config-utils'
import type { Awaitable, OptionsConfig, TypedFlatConfigItem } from '@antfu/eslint-config'
import antfu from '@antfu/eslint-config'
import type { Linter } from 'eslint'

export default function jie(options?: OptionsConfig & Omit<TypedFlatConfigItem, 'files'>, ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[]) {
  const customOptions: OptionsConfig & TypedFlatConfigItem = {
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
