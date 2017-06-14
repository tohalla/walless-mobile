import {AsyncStorage} from 'react-native';
import ApolloClient, {createNetworkInterface} from 'apollo-client';

import authenticationHandler from 'walless/util/auth';
import config from 'walless-native/config';

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
      const [[, token], [, clientId]] =
        await AsyncStorage.multiGet(['authorization', 'client-id']);
      if (!req.options.headers) {
        req.options.headers = {};
      }
      req.options.headers['Client-Id'] = clientId || await authenticationHandler.fetchClientId();
      if (token) {
        req.options.headers.Authorization = `Bearer ${token}`;
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
          await authenticationHandler.authenticate();
          apolloClient.resetStore();
        }
      }
      next();
    }
  }]);

const dataIdFromObject = result =>
  result.id && result.__typename ?
    result.__typename + result.id : null;

export default apolloClient;
