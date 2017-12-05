import {findIndex, isEqual, pullAt} from 'lodash/fp';

import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION
} from 'walless/actionTypes';

export default (state = [], action) =>
  action.type === ADD_NOTIFICATION ?
    state.concat(action.payload)
  : action.type === DELETE_NOTIFICATION ?
    pullAt(findIndex(i => isEqual(i)(action.payload))(state))(state)
  : state;

export const addNotification = payload => ({
  type: ADD_NOTIFICATION,
  payload: Object.assign({}, payload, {createdAt: new Date()})
});

export const deleteNotification = payload => ({type: DELETE_NOTIFICATION, payload});

