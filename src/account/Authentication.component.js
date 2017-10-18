// @flow
import React from 'react';
import {View} from 'react-native';
import I18n from 'react-native-i18n';
import {connect} from 'react-redux';
import {withApollo, compose} from 'react-apollo';
import {RESET_NAVIGATION} from 'walless/actionTypes';
import {account} from 'walless-graphql';
import {isEqual} from 'lodash/fp';

import {authenticate} from 'walless/util/auth';
import Button from 'walless/components/Button.component';
import text from 'walless/styles/text';
import SignIn from 'walless/account/SignIn.component';
import Register from 'walless/account/Register.component';
import container from 'walless/styles/container';
import LoadContent from 'walless/components/LoadContent.component';

class Authentication extends React.Component {
  state = {
    action: ''
  };
  componentWillReceiveProps(newProps) {
    const {client, resetNavigation, account, getActiveAccount} = newProps;
    if (
      getActiveAccount.loading &&
      !isEqual(this.props.account)(account)
    ) {
      client.resetStore();
      resetNavigation();
      this.setState({action: ''});
    };
  }
  setAction = action => () => {
    this.setState({action});
  }
  handleRegistrationCompleted = async(account) => {
    await authenticate(account.email, account.password);
    this.props.getActiveAccount.refetch();
  };
  render() {
    const {action} = this.state;
    return (
      <LoadContent loadProps={this.props}>
        {
          action === 'authenticate' ? <SignIn onCancel={this.setAction('')} />
          : action === 'register' ? (
            <Register
                onSuccess={this.handleRegistrationCompleted}
                setAction={this.setAction}
            />
          )
          : (
            <View style={[container.container, container.colored, container.centerContent]}>
              <Button
                  onPress={this.setAction('authenticate')}
                  padded
                  textStyle={text.light}
              >
                {I18n.t('account.authenticate')}
              </Button>
              <Button
                  onPress={this.setAction('register')}
                  padded
                  textStyle={text.light}
              >
                {I18n.t('account.register')}
              </Button>
            </View>
          )
      }
      </LoadContent>
    );
  }
}

export default withApollo(compose(
  connect(null, {resetNavigation: () => ({type: RESET_NAVIGATION})}),
  account.getActiveAccount
)(Authentication));
