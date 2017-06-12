// @flow
import {AsyncStorage} from 'react-native';

import config from 'walless-native/config';

const requestToken = async (payload: Object) => {
  const response = await fetch(
    `${config.api.protocol}://${config.api.url}:${config.api.port}/${config.api.authentication.endpoint}/${payload.token ? 'renewToken' : ''}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'authorization': payload.token
      },
      body: payload.token ? null : JSON.stringify(payload)
    }
  );
  if (response.status === 200) {
    return (await response.json());
  }
  throw new Error(await response.json());
};

export default {
	authenticate: async (email: string, password: string) => {
		const token = (await requestToken({email, password})).token;
		if (typeof token === 'string') {
			return await AsyncStorage.setItem(
				'Authorization',
				token
			);
		}
  },
  renew: async (token: string) => {
  },
  logout: () => AsyncStorage.removeItem('Authorization')
};
