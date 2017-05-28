import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import apolloClient from './apolloClient';
import restaurant from './restaurant/restaurant';

const store = createStore(
  combineReducers({
    apollo: apolloClient.reducer(),
    restaurant
  }),
  {},
  compose(
    applyMiddleware(apolloClient.middleware(), thunk)
  )
);


export default store;
