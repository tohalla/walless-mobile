// @flow
import {
  SET_CART_ITEMS,
  ADD_CART_ITEMS
} from 'walless/actionTypes';

export default (state = {items: []}, action) =>
  action.type === SET_CART_ITEMS ?
    Object.assign({}, state, {items: action.payload})
  : action.type === ADD_CART_ITEMS ?
    Object.assign({}, state, {items: state.items.concat(action.payload)})
  : state;

export const setCartItems = (payload: Array) => ({
  type: SET_CART_ITEMS,
  payload
});

export const addCartItems = (payload: Object | Array) => ({
  type: ADD_CART_ITEMS,
  payload
});

