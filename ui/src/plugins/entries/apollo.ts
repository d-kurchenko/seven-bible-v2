import { definePlugin } from 'src/wrappers/vue/plugin';
import {
  ApolloClient, createHttpLink, InMemoryCache,
} from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';

const httpLink = createHttpLink({
  uri: import.meta.env.RENDERER_LOCAL_API_GQL,
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

export const apolloPlugin = definePlugin({
  install(app) {
    app.provide(DefaultApolloClient, apolloClient);
  },
});
