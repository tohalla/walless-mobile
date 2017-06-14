import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import apolloClient from 'walless/apolloClient';
import reducers from 'walless/reducers';

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(apolloClient.middleware(), thunk)
  )
);


export default store;
