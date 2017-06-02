import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import apolloClient from './apolloClient';
import active from './active.reducer';

const store = createStore(
  combineReducers({
    apollo: apolloClient.reducer(),
    active
  }),
  {},
  compose(
    applyMiddleware(apolloClient.middleware(), thunk)
  )
);


export default store;
