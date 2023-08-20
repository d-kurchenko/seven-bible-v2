import { definePlugin } from 'src/shared/helpers/plugin';
import {
  ApolloClient, createHttpLink, InMemoryCache, from,
} from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';
// import { RetryLink } from '@apollo/client/link/retry';
import { onError } from '@apollo/client/link/error';
import { createOperation } from '@apollo/client/link/utils';
import { RefreshTokensDocument } from 'src/shared/gql/generated/graphql';
import { appConfig } from 'app/shared/config';

const httpLink = createHttpLink({
  uri: appConfig.localApiGql,
  credentials: 'include',
});
// const retryLink = new RetryLink();

export const errorLink = onError(({
  forward,
  operation,
  graphQLErrors,
}) => {
  if (graphQLErrors) {
    for (const error of graphQLErrors) {
      if (error.message === 'Unauthorized') {
        const refreshOperation = createOperation(Object, {
          operationName: 'RefreshTokens',
          query: RefreshTokensDocument,
        });

        return forward(refreshOperation).concat(forward(operation));
      }
    }
  }
});

const link = from([
  // retryLink,
  errorLink,
  httpLink,
]);

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link,
  cache,
});

export const apolloPlugin = definePlugin({
  install(app) {
    app.provide(DefaultApolloClient, apolloClient);
  },
});
