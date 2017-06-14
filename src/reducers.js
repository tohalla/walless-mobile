import active from 'walless/active.reducer';
import cart from 'walless/restaurant/cart.reducer';
import {navigationReducer as main} from 'walless/navigation/MainNavigation';
import {navigationReducer as restaurant} from 'walless/navigation/RestaurantNavigation';
import {combineReducers} from 'redux';

import apolloClient from 'walless/apolloClient';

const navigation = combineReducers({
  main,
  restaurant
});

export default combineReducers({
  apollo: apolloClient.reducer(),
  active,
  navigation,
  cart
});
