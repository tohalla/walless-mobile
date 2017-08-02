import {combineReducers} from 'redux';

import MainNavigation from 'walless/navigation/MainNavigation';
import {RestaurantNavigation} from 'walless/navigation/RestaurantNavigation';
import {OrderNavigation} from 'walless/navigation/OrderNavigation';
import {SettingsNavigation} from 'walless/navigation/SettingsNavigation';
import {SET_RESTAURANT_NAVIGATION} from 'walless/actionTypes';

const avoidDuplicateRoutes = (router, state, action) =>
  state && state.routes && state.routes.length > 0 && state.routes[state.routes.length - 1].routeName === action.routeName ?
    state
  : router.getStateForAction(action, state);

export default combineReducers({
  main: (state, action) => MainNavigation.router.getStateForAction(action, state) || state,
  restaurant: (state, action) =>
    action.type === SET_RESTAURANT_NAVIGATION ?
      action.payload
    : avoidDuplicateRoutes(RestaurantNavigation.router, state, action) || state,
  order: (state, action) =>
    avoidDuplicateRoutes(OrderNavigation.router, state, action) || state,
  settings: (state, action) =>
    avoidDuplicateRoutes(SettingsNavigation.router, state, action) || state
});
