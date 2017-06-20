import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import apolloClient from 'walless/apolloClient';
import reducers from 'walless/reducers';
import {fetchLanguages} from 'walless/translation.reducer';

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(apolloClient.middleware(), thunk)
  )
);

store.dispatch(fetchLanguages());

export default store;
