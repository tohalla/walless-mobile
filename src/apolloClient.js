import ApolloClient from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {from} from 'apollo-link';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {AsyncStorage} from 'react-native';
import {util} from 'walless-graphql';
import {onError} from 'apollo-link-error';

import {fetchClientId, authenticate} from 'walless/util/auth';
import config from 'walless-native/config';

const httpLink = createHttpLink({
  uri: `${config.api.url}/${config.api.graphQL.endpoint}`
});

const authLink = setContext(async(request, {headers = {}, ...context}) => {
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
  return {
    ...context,
    headers: Object.assign(
      {['client-id']: headers.clientId || await fetchClientId()},
      headers,
      auth && {authorization: `Bearer ${auth}`}
    )
  };
});

const unauthorizedLink = onError(async({networkError}) => {
  if (networkError && networkError.statusCode === 401) {
    const [[, refreshToken], [, clientId]] =
      await AsyncStorage.multiGet(['refresh-token', 'client-id']);
    if (refreshToken && clientId) {
      await authenticate();
      apolloClient.resetStore();
    }
  }
});

const apolloClient = new ApolloClient({
  shouldBatch: true,
  dataIdFromObject: util.dataIdFromObject,
  queryDeduplication: true,
  link: from([authLink, unauthorizedLink, httpLink]),
  cache: new InMemoryCache({
    dataIdFromObject: util.dataIdFromObject
  })
});

export default apolloClient;
