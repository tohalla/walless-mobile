import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import apolloClient from './apolloClient';

const store = createStore(
  combineReducers({
    apollo: apolloClient.reducer(),
  }),
  {},
  compose(
    applyMiddleware(apolloClient.middleware(), thunk)
  )
);


export default store;
