import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import apolloClient from 'walless/apolloClient';
import active from 'walless/active.reducer';
import cart from 'walless/restaurant/cart.reducer';
import {navigationReducer as main} from 'walless/navigation/MainNavigation';
import {navigationReducer as restaurant} from 'walless/navigation/RestaurantNavigation';

const navigation = combineReducers({
  main,
  restaurant
});

const store = createStore(
  combineReducers({
    apollo: apolloClient.reducer(),
    active,
    navigation,
    cart
  }),
  {},
  compose(
    applyMiddleware(apolloClient.middleware(), thunk)
  )
);


export default store;
