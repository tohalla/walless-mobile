import {AsyncStorage} from 'react-native';
import ApolloClient, {createNetworkInterface} from 'apollo-client';

import {fetchClientId, authenticate} from 'walless/util/auth';
import config from 'walless-native/config';
import {dataIdFromObject} from 'walless-graphql/util';

const networkInterface = createNetworkInterface({
  uri: `${config.api.protocol}://${config.api.url}:${config.api.port}/${config.api.graphQL.endpoint}`
});

const apolloClient = new ApolloClient({
  networkInterface,
  shouldBatch: true,
  dataIdFromObject,
  queryDeduplication: true
});

networkInterface.
  use([{
    async applyMiddleware(req, next) {
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
      if (!req.options.headers) {
        req.options.headers = {};
      }
      req.options.headers['Client-Id'] = clientId || await fetchClientId();
      if (auth) {
        req.options.headers.Authorization = `Bearer ${auth}`;
      }
      next();
    }
  }])
  .useAfter([{
    async applyAfterware({response}, next) {
      if (response.status === 401) {
        const [[, refreshToken], [, clientId]] =
          await AsyncStorage.multiGet(['refresh-token', 'client-id']);
        if (refreshToken && clientId) {
          await authenticate();
          apolloClient.resetStore();
        }
      }
      next();
    }
  }]);


export default apolloClient;
