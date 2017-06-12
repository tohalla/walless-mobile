// @flow
import React from 'react';
import I18n from 'react-native-i18n';
import {ActivityIndicator, View} from 'react-native';
import {addNavigationHelpers} from 'react-navigation';
import {ApolloProvider} from 'react-apollo';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {get} from 'lodash/fp';

import MainNavigation from 'walless/navigation/MainNavigation';
import translations from 'walless/translations';
import colors from 'walless/styles/colors';
import container from 'walless/styles/container';
import apolloClient from 'walless/apolloClient';
import store from 'walless/store';
import {getActiveAccount} from 'walless/graphql/account/account.queries';
import Authentication from 'walless/account/Authentication.component';

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
