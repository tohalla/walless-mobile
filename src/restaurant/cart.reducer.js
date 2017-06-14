import {SET_CART_ITEMS} from 'walless/actionTypes';

export default (state = {items: []}, action) =>
  action.type === SET_CART_ITEMS ?
    Object.assign({}, state, {items: action.payload})
  : state;

export const setCartItems = payload => ({
  type: SET_CART_ITEMS,
  payload
});

