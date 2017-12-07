// @flow
import {AsyncStorage} from 'react-native';
import {getDeviceName} from 'react-native-device-info';
import {pick} from 'lodash/fp';

import config from 'walless-native/config';

const requestToken = async(payload: Object) => {
  const refreshToken = await AsyncStorage.getItem('refresh-token');
  return await (refreshToken ?
    fetch(
      `${config.api.url}/${config.api.authentication.endpoint}/client`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'client-id': await fetchClientId(),
          'refresh-token': refreshToken
        }
      }
    ) :
    fetch(
      `${config.api.url}/${config.api.authentication.endpoint}/`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'client-id': await fetchClientId()
        },
        body: JSON.stringify(payload)
      }
    )
  );
};

const fetchClientId = async() => {
  const storedClientId = await AsyncStorage.getItem('client-id');
  if (storedClientId) {
    return storedClientId;
  }
  const response = await fetch(
    `${config.api.url}/${config.api.authentication.endpoint}/client`,
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

const logout = async() => {
  await fetch(
    `${config.api.url}/${config.api.authentication.endpoint}/client`,
    {
      method: 'DELETE',
      headers: {
        'client-id': await fetchClientId()
      }
    }
  );
  return AsyncStorage.multiRemove([
    'authorization',
    'client-id',
    'ws-token',
    'refresh-token'
  ])
};

const authenticate = async(email: string, password: string) => {
  if (email && password) await logout();
  const response = await requestToken({
    email: email && email.trim(),
    password
  });
  if (response.ok) {
    const {token, wsToken, refreshToken, expiresAt} = await response.json();
    await AsyncStorage.multiSet([['expiration', expiresAt.toString()]]
      .concat(
        typeof token === 'string' ? [['authorization', token]]: [],
        typeof wsToken === 'string' ? [['ws-token', wsToken]]: [],
        typeof refreshToken === 'string' ? [['refresh-token', refreshToken]] : []
      )
    );
  }
  return pick(['status', 'ok'])(response);
};

const createAccount = account => fetch(
  `${config.api.url}/${config.api.authentication.endpoint}/account`,
  {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(account)
  }
);

const changePassword = async(payload) => fetch(
  `${config.api.url}/${config.api.authentication.endpoint}/password`,
  {
    method: 'POST',
    headers: {
      'authorization': await AsyncStorage.getItem('authorization'),
      'content-type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(payload)
  }
);

export {
  createAccount,
  fetchClientId,
  authenticate,
  changePassword,
  logout
};
