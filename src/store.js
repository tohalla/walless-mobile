import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import reducers from 'walless/reducers';
import {fetchLanguages} from 'walless/translation.reducer';

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

store.dispatch(fetchLanguages());

export default store;
