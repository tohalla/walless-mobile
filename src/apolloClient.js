import ApolloClient, {createNetworkInterface} from 'apollo-client';
import config from '../config';

const networkInterface = createNetworkInterface({
  uri: `${config.api.protocol}://${config.api.url}:${config.api.port}/${config.api.graphQL.endpoint}`
});

const dataIdFromObject = result =>
  result.id && result.__typename ?
    result.__typename + result.id : null;

export default new ApolloClient({
  networkInterface,
  shouldBatch: true,
  dataIdFromObject,
  queryDeduplication: true
});
