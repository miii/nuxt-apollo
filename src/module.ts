import { getStates } from '@vue/apollo-ssr'
import type { Module } from '@nuxt/types'

import { createDebugger } from './debug';
import { name } from '../package.json'

export interface NuxtApolloOptions {}

const debug = createDebugger('module');

const nuxtModule: Module<NuxtApolloOptions> = function () {
  // @vue/apollo-composable is using nullish coalescing, which is not compatible with Webpack 4.
  // See https://github.com/vuejs/vue-apollo/issues/1217
  this.options.build.transpile = this.options.build.transpile || []
  this.options.build.transpile.push('@vue/apollo-composable')

  // Force use transpiled version of @vue/apollo-composable
  this.options.alias = this.options.alias || {}
  this.options.alias['@vue/apollo-composable'] = '@vue/apollo-composable/dist'

  // Force transpilation of this library (to use correct capi context)
  this.options.build.transpile.push(name);

  this.nuxt.hook('vue-renderer:ssr:context', (ssrContext: any) => {
    const { $apollo, nuxt } = ssrContext
    
    if ($apollo) {
      debug('Extracting cache to nuxt state')
      nuxt.apollo = getStates($apollo)
    } else {
      debug('$apollo was not found on ssrContext, make sure defineApolloClient() is used')
    }
  })
}

export default nuxtModule
export const meta = require('../package.json')