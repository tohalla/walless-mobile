import apolloClient from 'walless/apolloClient';

import servingLocation from 'walless/restaurant/servingLocation.reducer';
import notification from 'walless/notification/notification.reducer';
import cart from 'walless/restaurant/cart.reducer';
import {combineReducers} from 'redux';
import translation from 'walless/translation.reducer';
import navigation from 'walless/navigation/navigation.reducer';

export default combineReducers({
  apollo: apolloClient.reducer(),
  servingLocation,
  translation,
  notification,
  navigation,
  cart
});
