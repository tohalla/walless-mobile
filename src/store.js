import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import apolloClient from './apolloClient';
import active from './active.reducer';
import {mainNavigationReducer} from './navigation/MainNavigator';

const navigation = combineReducers({
  mainNavigation: mainNavigationReducer
});

const store = createStore(
  combineReducers({
    apollo: apolloClient.reducer(),
    active,
    navigation
  }),
  {},
  compose(
    applyMiddleware(apolloClient.middleware(), thunk)
  )
);


export default store;
