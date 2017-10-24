// @flow
import config from 'walless-native/config';

import {SET_LANGUAGES} from 'walless/actionTypes';

const initialState = {
 language: 'en',
 languages: []
};

export default (state: Object = initialState, action: Object) =>
  action.type === SET_LANGUAGES ?
    Object.assign({}, state, action.payload)
  : state;

export const fetchLanguages = () => async (dispatch: Function) => {
  const languages = await (await fetch(
    `${config.api.url}/${config.api.i18n.endpoint}`
  )).json();
  dispatch({
    type: SET_LANGUAGES,
    payload: {languages}
  });
};
