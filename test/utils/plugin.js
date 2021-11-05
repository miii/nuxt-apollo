import { createHttpLink, InMemoryCache, ApolloClient } from '@apollo/client/core'

import { defineApolloClient } from '@@'

export default defineApolloClient(() => {
  const httpLink = createHttpLink({ uri: 'http://localhost:3001/graphql' })
  const cache = new InMemoryCache()
  const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
    ssrMode: process.server,
  })

  return apolloClient
})