import servingLocation from 'walless/restaurant/servingLocation.reducer';
import notifications from 'walless/notification/notifications.reducer';
import cart from 'walless/restaurant/cart.reducer';
import {combineReducers} from 'redux';
import translation from 'walless/translation.reducer';
import navigation from 'walless/navigation/navigation.reducer';

export default combineReducers({
  servingLocation,
  translation,
  notifications,
  navigation,
  cart
});
