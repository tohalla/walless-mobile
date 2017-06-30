import apolloClient from 'walless/apolloClient';
import {NavigationActions} from 'react-navigation';

import servingLocation from 'walless/servingLocation.reducer';
import cart from 'walless/restaurant/cart.reducer';
import SettingsNavigation from 'walless/navigation/SettingsNavigation';
import RestaurantNavigation from 'walless/navigation/RestaurantNavigation';
import {combineReducers} from 'redux';
import translation from 'walless/translation.reducer';

const avoidDuplicateRoute = (router, action, state) =>
  action.type === NavigationActions.NAVIGATE &&
  state.routes.length > 0 &&
  action.routeName === state.routes[state.routes.length - 1].routeName ? state
  : router.getStateForAction(action, state);

export const navigationReducer =
  combineReducers({
    settings: (state, action) => avoidDuplicateRoute(SettingsNavigation.router, action, state),
    restaurant: (state, action) => avoidDuplicateRoute(RestaurantNavigation.router, action, state)
  });

export default combineReducers({
  apollo: apolloClient.reducer(),
  servingLocation,
  translation,
  navigation: navigationReducer,
  cart
});
