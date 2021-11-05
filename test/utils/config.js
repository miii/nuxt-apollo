import { resolve, basename } from 'path'
import merge from 'deepmerge'

/**
 * 
 * @param {string} currentDir 
 * @param {any=} pluginConfig
 * @param {((baseConfig: import('@nuxt/types').NuxtConfig) => import('@nuxt/types').NuxtConfig)=} customConfig 
 * @returns 
 */
export const createNuxtConfig = (currentDir, pluginConfig = {}, customConfig = () => ({})) => {
  /** @type {import('@nuxt/types').NuxtConfig} */
  const config = {
    rootDir: resolve(currentDir, '../..'),
    srcDir: resolve(currentDir, 'src'),
    dev: false,
    alias: {
      '@miii/nuxt-apollo': resolve(currentDir, 'src'),
    },
    render: {
      resourceHints: false,
    },
    head: {
      title: basename(currentDir),
    },
    buildModules: [
      '@nuxtjs/composition-api/module',
    ],
    modules: [
      ['@@', pluginConfig],
    ],
  }

  return merge(config, customConfig(config))
}