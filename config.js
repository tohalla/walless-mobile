const url = process.env.NODE_ENV === 'production' ? '172.20.10.2' : '172.20.10.2';
const port = process.env.NODE_ENV === 'production' ? 8080 : 8080;

module.exports = {
  i18n: {
    url: 'http://172.20.10.2:8080/translation/'
  },
  api: {
    url,
    port,
    protocol: process.env.NODE_ENV === 'production' ? 'https' : 'http',
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
    url,
    port,
    protocol: process.env.NODE_ENV === 'production' ? 'wss' : 'ws',
    endpoint: undefined
  }
};
