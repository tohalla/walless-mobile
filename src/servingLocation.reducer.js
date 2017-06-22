import {AsyncStorage} from 'react-native';

import config from 'walless-native/config';
import {SET_SERVING_LOCATION} from 'walless/actionTypes';

export default (state = {}, action) =>
	action.type === SET_SERVING_LOCATION ?
		Object.assign({}, state, action.payload)
	: state;

const setServingLocation = payload => ({
	type: SET_SERVING_LOCATION,
	payload
});

export const connectToServingLocation = code => async(dispatch) =>
  dispatch(setServingLocation(await (await fetch(
    `${config.api.protocol}://${config.api.url}:${config.api.port}/serving-location`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'authorization': `Bearer ${await AsyncStorage.getItem('authorization')}`
      },
      body: JSON.stringify({code})
    }
  )).json()));

export const disconnectFromServingLocation = servingLocation => async(dispatch) => {
  await fetch(
    `${config.api.protocol}://${config.api.url}:${config.api.port}/serving-location`,
    {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'authorization': `Bearer ${await AsyncStorage.getItem('authorization')}`
      }
    }
  );
  return dispatch(setServingLocation({servingLocation: null, restaurant: null}));
};
