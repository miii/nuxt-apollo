# @miii/nuxt-apollo
> Use @vue/apollo-composable with Nuxt 2

## Motivation
The [official Apollo module](https://github.com/nuxt-community/apollo-module) from the Nuxt team is great but is currently limited to Vue Apollo v3 (Apollo v2) and includes authorization management and helpers whether you use it or not. The repo is also rather unmaintained at this point. This project aims to provide a lightweight integration between Nuxt and the new Vue Apollo v4 packages with SSR support.

## Features
- Automatic GraphQL cache syncronization between server and client.
- Composition API support out of the box.
- Configure Apollo without hassle as you would in any normal Vue application.

## Limitations
- No option API support at this moment
- Intentionally no "batteries included" functionality. No authorization, no cookie management.

## Get started
```sh
$ yarn add @miii/nuxt-apollo

# You probably want these packages as well
$ yarn add @nuxtjs/composition-api @vue/apollo-composable @apollo/client graphql-tag
```

```js
// nuxt.config.js
export default {
  modules: [
    '@miii/nuxt-apollo/module'
  ],
  plugins: [
    '~/plugins/apollo'
  ]
}
```

```js
// plugins/apollo.js
import { defineApolloClient } from '@miii/nuxt-apollo'
import { createHttpLink, InMemoryCache, ApolloClient } from '@apollo/client/core'

export default defineApolloClient((context, inject) => {
  // Access context/inject as you would in any other Nuxt plugin
  const { $config } = context

  // Define your apollo client
  const httpLink = createHttpLink({ uri: $config.graphqlEndpoint })
  const cache = new InMemoryCache()
  const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
    // Enable ssr mode to prevent Apollo from refetching queries unnecessarily
    ssrMode: process.server,
  })

  // Return the client and this module will take care of the rest
  return apolloClient
})
```

### Multiple clients
Use multple clients and access the plugin context.
```js
// plugins/apollo.js
import { defineApolloClient } from '@miii/nuxt-apollo'
import { createHttpLink, InMemoryCache, ApolloClient } from '@apollo/client/core'

export default defineApolloClient(() => {
  /* ... */

  // Return multiple clients
  return {
    default: client1,
    another: client2,
  }
})
```

## Usage in components
Example using `@vue/apollo-composable` and the new [\<script setup\>](https://v3.vuejs.org/api/sfc-script-setup.html) syntax:
```vue
<template>
  <div>{{ result }}</div>
</template>
<script setup>
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

// This query will be prefetched on server without triggering any client-side requests
const { result } = useQuery(gql`
  query getUsers {
    users {
      id
      firstname
      lastname
      email
    }
  }
`)
</script>
```