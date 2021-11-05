import { ApolloClient } from '@apollo/client/core';
import { Plugin, Context } from '@nuxt/types';
import { Inject } from '@nuxt/types/app';

interface ApolloClientRecord {
    default: ApolloClient<any>;
    [key: string]: ApolloClient<any>;
}
declare type SetupApolloClientCallback = (context: Context, inject: Inject) => (ApolloClient<any> | ApolloClientRecord);
/**
 * Setup apollo client with nuxt-apollo
 * @param callback Callback function
 * @returns
 */
declare const defineApolloClient: (callback: SetupApolloClientCallback) => Plugin;

declare const getApolloClient: (client?: string) => ApolloClient<any>;

export { defineApolloClient, getApolloClient };
