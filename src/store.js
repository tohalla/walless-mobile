import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import apolloClient from './apolloClient';
import active from './active.reducer';
import cart from './restaurant/cart.reducer';
import {navigationReducer as main} from './navigation/MainNavigation';
import {navigationReducer as restaurant} from './navigation/RestaurantNavigation';

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
