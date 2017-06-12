import {AsyncStorage} from 'react-native';
import ApolloClient, {createNetworkInterface} from 'apollo-client';

import authenticationHandler from 'walless/util/auth';
import config from 'walless-native/config';

const networkInterface = createNetworkInterface({
  uri: `${config.api.protocol}://${config.api.url}:${config.api.port}/${config.api.graphQL.endpoint}`
});

networkInterface.use([{
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
}]);

const dataIdFromObject = result =>
  result.id && result.__typename ?
    result.__typename + result.id : null;

export default new ApolloClient({
  networkInterface,
  shouldBatch: true,
  dataIdFromObject,
  queryDeduplication: true
});
