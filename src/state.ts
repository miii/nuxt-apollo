import { ApolloClient } from '@apollo/client/core'

let apolloClients: Record<string, ApolloClient<any>>
export const getApolloClient = (client = 'default') => apolloClients[client]
export const setApolloClients = (clients: typeof apolloClients) => { apolloClients = clients }