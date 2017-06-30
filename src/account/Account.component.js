import React from 'react';
import {View} from 'react-native';
import I18n from 'react-native-i18n';
import {connect} from 'react-redux';
import {withApollo, compose} from 'react-apollo';

import {RESET_NAVIGATION} from 'walless/actionTypes';
import NavigationButton from 'walless/components/NavigationButton.component';
import {logout} from 'walless/util/auth';
import container from 'walless/styles/container';
import {getActiveAccount} from 'walless/graphql/account/account.queries';

class Account extends React.Component {
  handleLogout = async() => {
    await logout();
    this.props.client.resetStore();
    this.props.resetNavigation();
  };
  render() {
    return (
      <View style={[container.container]}>
        <NavigationButton onPress={this.handleLogout}>
          {I18n.t('account.signOut')}
        </NavigationButton>
      </View>
    );
  }
}

export default withApollo(compose(
  connect(null, {resetNavigation: () => ({type: RESET_NAVIGATION})}),
  getActiveAccount
)(Account));
