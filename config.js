import Config from 'react-native-config';

const api = `${Config.API_PROTOCOL}://${Config.API_URL}${Config.API_PORT === 80 ? '' : `:${Config.API_PORT}`}`;

module.exports = {
  api: {
    url: api,
    i18n: {
      endpoint: 'translation'
    },
    graphQL: {
      endpoint: 'graphql'
    },
    authentication: {
      endpoint: 'auth'
    },
    upload: {
      endpoint: 'upload'
    }
  },
  websocket: {
    url: `${Config.WS_PROTOCOL}://${Config.API_URL}${Config.API_PORT === 80 ? '' : `:${Config.API_PORT}`}`,
    endpoint: undefined
  }
};
