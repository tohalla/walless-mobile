// @flow
import React from 'react';
import I18n from 'react-native-i18n';
import {addNavigationHelpers} from 'react-navigation';
import {ApolloProvider} from 'react-apollo';
import {connect} from 'react-redux';
import {get} from 'lodash/fp';

import MainNavigation from './navigation/MainNavigation';
import translations from './translations';
import apolloClient from './apolloClient';
import store from './store';

const mapStateToProps = state => ({
  navigation: get(['navigation', 'mainNavigation'])(state)
});

const App = connect(mapStateToProps)(
  class App extends React.Component {
    render = () => (
      <MainNavigation
          navigation={addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.navigation
          })}
      />
    );
  }
);

export default class Root extends React.Component {
  render = () => (
    <ApolloProvider client={apolloClient} store={store}>
      <App />
    </ApolloProvider>
  )
}

Object.assign(
  I18n,
  {fallbacks: true, translations}
);
