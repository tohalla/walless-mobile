import React from 'react';
import {View} from 'react-native';
import {withApollo, compose} from 'react-apollo';

import Button from 'walless/components/Button.component';
import authenticationHandler from 'walless/util/auth';
import {getActiveAccount} from 'walless/graphql/account/account.queries';

class Account extends React.Component {
  handleLogout = async () => {
    await authenticationHandler.logout();
    this.props.client.resetStore();
  };
  render() {
    return (
      <View>
        <Button onPress={this.handleLogout}>
          {'sign out'}
        </Button>
      </View>
    );
  }
}

export default withApollo(compose(
  getActiveAccount
)(Account));
