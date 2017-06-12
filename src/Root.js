// @flow
import React from 'react';
import I18n from 'react-native-i18n';
import {ActivityIndicator, View} from 'react-native';
import {addNavigationHelpers} from 'react-navigation';
import {ApolloProvider} from 'react-apollo';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {get} from 'lodash/fp';

import MainNavigation from './navigation/MainNavigation';
import translations from './translations';
import colors from './styles/colors';
import container from './styles/container';
import apolloClient from './apolloClient';
import store from './store';
import {getActiveAccount} from './graphql/account/account.queries';
import Authentication from './account/Authentication.component';

const mapStateToProps = state => ({
  navigationState: get(['navigation', 'main'])(state)
});

const App = compose(
  connect(mapStateToProps),
  getActiveAccount
)(
  class App extends React.Component {
    render() {
      const {
        getActiveAccount: {account, data: {loading}} = {data: {}}
      } = this.props;
      if (loading) {
        return (
          <View style={[container.screenContainer, container.centerContent]}>
            <ActivityIndicator color={colors.white} />
          </View>
        );
      }
      return account ? (
        <MainNavigation
            navigation={addNavigationHelpers({
              dispatch: this.props.dispatch,
              state: this.props.navigationState
            })}
        />
      ) : <Authentication />;
    }
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
