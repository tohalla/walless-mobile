// @flow
import config from 'walless-native/config';

const SET_LANGUAGES = 'SET_LANGUAGES';

const initialState = {
 language: 'en'
};

export default (state: Object = initialState, action: Object) =>
  action.type === SET_LANGUAGES ?
    Object.assign({}, state, action.payload)
  : state;

export const fetchLanguages = async(dispatch: Function) => {
  const languages = await (await fetch(config.i18n.url)).json();
  dispatch({
    type: SET_LANGUAGES,
    payload: {languages}
  });
};
