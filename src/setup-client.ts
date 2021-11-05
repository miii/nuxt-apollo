import { ApolloClient } from '@apollo/client/core'
import { ApolloClients } from '@vue/apollo-composable'
import { defineNuxtPlugin, onGlobalSetup, provide } from '@nuxtjs/composition-api'
import type { Context, Plugin } from '@nuxt/types'
import 'cross-fetch/polyfill'

import { createDebugger } from './debug'
import { Inject } from '@nuxt/types/app'
import { setApolloClients } from './state'

const debug = createDebugger('setup-client');

interface ApolloClientRecord {
  default: ApolloClient<any>
  [key: string]: ApolloClient<any>
}
type SetupApolloClientCallback = (context: Context, inject: Inject) => (ApolloClient<any> | ApolloClientRecord)

/**
 * Setup apollo client with nuxt-apollo
 * @param callback Callback function
 * @returns 
 */
export const defineApolloClient = (callback: SetupApolloClientCallback): Plugin => {
  return defineNuxtPlugin(async (context, inject) => {
    // Run plugin and get clients
    let apolloClients = await Promise.resolve(callback.call(this, context, inject) as ApolloClientRecord)

    // Default client must be defined
    if (!Object.hasOwnProperty.call(apolloClients, 'default'))
      apolloClients = { default: apolloClients as any }

    debug('Using apollo clients:', Object.keys(apolloClients).join(', '))

    // Save locally and provide with helpers as an alternative
    // to useApolloClient() from @vue/composition-api
    setApolloClients(apolloClients)
    
    if (process.server) {
      debug('Inject apollo clients into SSR context')
      // @ts-ignore
      context.ssrContext.$apollo = apolloClients
    }

    if (process.client) {
      debug('Restore apollo cache from nuxt state')
      // @ts-ignore
      Object.entries(window.__NUXT__?.apollo || {})
        .forEach(([client, cache]) => apolloClients[client].cache.restore(cache))
    }

    // Inject clients to @vue/apollo-composable
    onGlobalSetup(() => {
      debug('Providing apollo clients to @vue/apollo-composable using onGlobalSetup()')
      provide(ApolloClients, apolloClients)
    })
  })
}