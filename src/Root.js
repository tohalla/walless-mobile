import React from 'react';
import I18n from 'react-native-i18n';
import {Provider} from 'react-redux';
import {ApolloProvider} from 'react-apollo';
import App from 'walless/App';
import EStyleSheet from 'react-native-extended-stylesheet';

import translations from 'walless/translations';
import apolloClient from 'walless/apolloClient';
import store from 'walless/store';

export default class Root extends React.Component {
  render = () =>
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </Provider>;
}

EStyleSheet.build({});

Object.assign(
  I18n,
  {fallbacks: true, translations}
);
