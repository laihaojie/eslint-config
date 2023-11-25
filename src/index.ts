import antfu, { Awaitable, FlatConfigItem, OptionsConfig, UserConfigItem } from "@antfu/eslint-config";

export default function jie (options?: OptionsConfig & FlatConfigItem, ...userConfigs: Awaitable<UserConfigItem | UserConfigItem[]>[]) {


  const customOptions : OptionsConfig & FlatConfigItem= {
    rules: {}
  }


  return antfu(deepMerge(customOptions, options), ...userConfigs)
}


function deepMerge(target: any, source: any) {
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        deepMerge(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }
  return target
}

function isObject(item: any) {
  return item && typeof item === 'object' && !Array.isArray(item)
}

console.log(1)