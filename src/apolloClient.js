import ApolloClient from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {ApolloLink} from 'apollo-link';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {AsyncStorage} from 'react-native';
import {util} from 'walless-graphql';
import {onError} from 'apollo-link-error';

import {fetchClientId, authenticate} from 'walless/util/auth';
import config from 'walless-native/config';

const httpLink = createHttpLink({
  uri: `${config.api.protocol}://${config.api.url}${config.api.port === 80 ?
    '' : `:${config.api.port}`
  }/${config.api.graphQL.endpoint}`
});

const link = new ApolloLink(async(operation, forward) => {
  const [[, token], [, clientId], [, expiration], [, refreshToken]] =
    await AsyncStorage.multiGet([
      'authorization',
      'client-id',
      'expiration',
      'refresh-token'
    ]);
  let auth = token;
  if (Number(expiration) < Date.now() / 1000 || !expiration) {
    await AsyncStorage.multiRemove(['expiration', 'authorization']);
    if (refreshToken && clientId) {
      await authenticate();
      auth = await AsyncStorage.getItem('authorization');
    }
  }
  operation.setContext(async({headers = {}}) => {
    headers['Client-Id'] = clientId || await fetchClientId();
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${Cookie.get('Authorization')}`,
      }
    };
  });
  if (auth) {
    req.options.headers.Authorization = `Bearer ${auth}`;
  }
  return forward();
}).concat(onError(async({networkError}) => {
  if (networkError.statusCode === 401) {
    const [[, refreshToken], [, clientId]] =
      await AsyncStorage.multiGet(['refresh-token', 'client-id']);
    if (refreshToken && clientId) {
      await authenticate();
      apolloClient.resetStore();
    }
  }
}), httpLink);

const apolloClient = new ApolloClient({
  shouldBatch: true,
  dataIdFromObject: util.dataIdFromObject,
  queryDeduplication: true,
  link,
  cache: new InMemoryCache({
    dataIdFromObject: util.dataIdFromObject
  })
});

export default apolloClient;
