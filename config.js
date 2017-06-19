module.exports = {
	i18n: {
		url: 'http://172.20.10.2:8080/translation/'
	},
  api: {
    url: process.env.NODE_ENV === 'production' ? '172.20.10.2' : '172.20.10.2',
    port: process.env.NODE_ENV === 'production' ? 8080 : 8080,
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
  }
};
