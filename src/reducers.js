import apolloClient from 'walless/apolloClient';

import {RESET_NAVIGATION} from 'walless/actionTypes';
import servingLocation from 'walless/servingLocation.reducer';
import cart from 'walless/restaurant/cart.reducer';
import {navigationReducer as main} from 'walless/navigation/MainNavigation';
import {navigationReducer as restaurant} from 'walless/navigation/RestaurantNavigation';
import {combineReducers} from 'redux';
import translation from 'walless/translation.reducer';

const navigation = (state, action) =>
  combineReducers({
    main,
    restaurant
  })(action.type === RESET_NAVIGATION ? {} : state, action);

export default combineReducers({
  apollo: apolloClient.reducer(),
  servingLocation,
  translation,
  navigation,
  cart
});
