import apolloClient from 'walless/apolloClient';

import servingLocation from 'walless/restaurant/servingLocation.reducer';
import notification from 'walless/notification/notification.reducer';
import cart from 'walless/restaurant/cart.reducer';
import MainNavigation from 'walless/navigation/MainNavigation';
import {combineReducers} from 'redux';
import translation from 'walless/translation.reducer';

export const navigationReducer = (state, action) =>
  MainNavigation.router.getStateForAction(action, state) || state;

export default combineReducers({
  apollo: apolloClient.reducer(),
  servingLocation,
  translation,
  notification,
  navigation: navigationReducer,
  cart
});
