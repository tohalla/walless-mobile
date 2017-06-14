// @flow
import React from 'react';
import {ActivityIndicator, View, AsyncStorage} from 'react-native';
import {addNavigationHelpers} from 'react-navigation';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {get} from 'lodash/fp';

import MainNavigation from 'walless/navigation/MainNavigation';
import colors from 'walless/styles/colors';
import container from 'walless/styles/container';
import {getActiveAccount} from 'walless/graphql/account/account.queries';
import Authentication from 'walless/account/Authentication.component';
import authenticationHandler from 'walless/util/auth';

const mapStateToProps = state => ({
  navigationState: get(['navigation', 'main'])(state)
});

class App extends React.Component {
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
      getActiveAccount: {account, data: {loading}} = {data: {}}
    } = this.props;
    if (loading || this.state.loading) {
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

export default compose(
  connect(mapStateToProps),
  getActiveAccount
)(App);
