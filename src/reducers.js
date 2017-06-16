import apolloClient from 'walless/apolloClient';

import active from 'walless/active.reducer';
import cart from 'walless/restaurant/cart.reducer';
import {navigationReducer as main} from 'walless/navigation/MainNavigation';
import {navigationReducer as restaurant} from 'walless/navigation/RestaurantNavigation';
import {combineReducers} from 'redux';
import translation from 'walless/translation.reducer';

const navigation = combineReducers({
  main,
  restaurant
});

export default combineReducers({
  apollo: apolloClient.reducer(),
  active,
  translation,
  navigation,
  cart
});
