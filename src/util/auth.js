// @flow
import {AsyncStorage} from 'react-native';
import {getDeviceName} from 'react-native-device-info';

import config from 'walless-native/config';

const requestToken = async (payload: Object) => {
  const [[, refreshToken], [, clientId]] =
    await AsyncStorage.multiGet(['refresh-token', 'client-id']);
  const response = await (refreshToken ?
    fetch(
      `${config.api.protocol}://${config.api.url}:${config.api.port}/${config.api.authentication.endpoint}/client`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'client-id': clientId,
          'refresh-token': refreshToken
        }
      }
    ) :
    fetch(
      `${config.api.protocol}://${config.api.url}:${config.api.port}/${config.api.authentication.endpoint}/${payload.token ? 'renewToken' : ''}`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'client-id': clientId
        },
        body: JSON.stringify(payload)
      }
    )
  );
  if (response.status === 200) {
    return await response.json();
  }
  throw new Error(await response.json());
};

const fetchClientId = async () => {
  const storedClientId = await AsyncStorage.getItem('client-id');
  if (storedClientId) {
    return storedClientId;
  }
  const response = await fetch(
    `${config.api.protocol}://${config.api.url}:${config.api.port}/${config.api.authentication.endpoint}/client`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'device': getDeviceName()
      }
    }
  );
  const {clientId} = await response.json();
  await AsyncStorage.setItem(
    'client-id',
    clientId
  );
  return clientId;
};

const authenticate = async (email: string, password: string) => {
  const response = await requestToken({email, password});
  const {token, refreshToken, expiresAt} = response;
  return await AsyncStorage.multiSet([
    ['expiration', expiresAt.toString()]
  ].concat(
      typeof token === 'string' ? [['authorization', token]]: [],
      typeof refreshToken === 'string' ? [['refresh-token', refreshToken]] : []
    )
  );
};

const logout = async ({}) => {
  await fetch(
    `${config.api.protocol}://${config.api.url}:${config.api.port}/${config.api.authentication.endpoint}/client`,
    {
      method: 'DELETE',
      headers: {
        'client-id': await AsyncStorage.getItem('client-id')
      }
    }
  );
  await AsyncStorage.multiRemove(['authorization', 'client-id', 'refresh-token']);
};

export default {
  fetchClientId,
	authenticate,
  logout
};
