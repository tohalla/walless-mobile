// @flow
import React from 'react';
import {AsyncStorage} from 'react-native';
import {addNavigationHelpers} from 'react-navigation';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {get} from 'lodash/fp';
import I18n from 'react-native-i18n';
import {StatusBar, View} from 'react-native';
import container from 'walless/styles/container';

import MainNavigation, {routes} from 'walless/navigation/MainNavigation';
import {getActiveAccount} from 'walless/graphql/account/account.queries';
import Authentication from 'walless/account/Authentication.component';
import authenticationHandler from 'walless/util/auth';
import LoadContent from 'walless/components/LoadContent.component';

const mapStateToProps = state => ({
  navigationState: get(['navigation', 'main'])(state)
});

class App extends React.Component {
  static navigationOptions: {
    statusBarStyle: 'light-content',
  };
  state = {loading: false};
  componentWillReceiveProps = async (newProps) => {
    if (
      !get(['getActiveAccount', 'account'])(newProps) &&
      !get(['getActiveAccount', 'data', 'loading'])(newProps)
    ) {
      const [[, refreshToken], [, clientId]] =
        await AsyncStorage.multiGet(['refresh-token', 'client-id']);
      if (refreshToken && clientId) {
        this.setState({loading: true});
        await authenticationHandler.authenticate();
        await newProps.getActiveAccount.data.refetch();
        this.setState({loading: false});
      }
    }
  }
  render() {
    const {
      getActiveAccount: {account} = {data: {}}
    } = this.props;
    return (
      <View style={container.container}>
        <StatusBar barStyle="light-content" />
        <LoadContent loadProps={this.props} loading={this.state.loading}>
          {
            account ? (
              <MainNavigation
                  navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.navigationState,
                    titles: Object.keys(routes).reduce((prev, key) =>
                        Object.assign(
                          {},
                          prev,
                          {[key]: routes[key].translationKey ?
                            I18n.t(routes[key].translationKey) : null
                          }
                        ), {}
                      )
                  })}
              />
            )
            : <Authentication />
        }
        </LoadContent>
      </View>
    );
  }
}

export default compose(
  connect(mapStateToProps),
  getActiveAccount
)(App);
