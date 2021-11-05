import { ApolloClients } from '@vue/apollo-composable';
import { defineNuxtPlugin, onGlobalSetup, provide } from '@nuxtjs/composition-api';
import 'cross-fetch/polyfill';

const createDebugger = (namespace) => {
  try {
    const debug = require("debug");
    return debug(`nuxt-apollo:${namespace}`);
  } catch (e) {
    return () => void 0;
  }
};

let apolloClients;
const getApolloClient = (client = "default") => apolloClients[client];
const setApolloClients = (clients) => {
  apolloClients = clients;
};

const debug = createDebugger("setup-client");
const defineApolloClient = (callback) => {
  return defineNuxtPlugin(async (context, inject) => {
    var _a;
    let apolloClients = await Promise.resolve(callback(context, inject));
    if (!Object.hasOwnProperty.call(apolloClients, "default"))
      apolloClients = { default: apolloClients };
    debug("Using apollo clients:", Object.keys(apolloClients).join(", "));
    setApolloClients(apolloClients);
    if (process.server) {
      debug("Inject apollo clients into SSR context");
      context.ssrContext.$apollo = apolloClients;
    }
    if (process.client) {
      debug("Restore apollo cache from nuxt state");
      Object.entries(((_a = window.__NUXT__) == null ? void 0 : _a.apollo) || {}).forEach(([client, cache]) => apolloClients[client].cache.restore(cache));
    }
    onGlobalSetup(() => {
      debug("Providing apollo clients to @vue/apollo-composable using onGlobalSetup()");
      provide(ApolloClients, apolloClients);
    });
  });
};

export { defineApolloClient, getApolloClient };
