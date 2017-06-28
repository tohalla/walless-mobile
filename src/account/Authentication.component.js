// @flow
import React from 'react';
import {View} from 'react-native';
import I18n from 'react-native-i18n';

import Button from 'walless/components/Button.component';
import text from 'walless/styles/text';
import button from 'walless/styles/button';
import SignIn from 'walless/account/SignIn.component';
import Register from 'walless/account/Register.component';
import container from 'walless/styles/container';

export default class Authentication extends React.Component {
  state = {
    action: ''
  };
  setAction = action => () => {
    this.setState({action});
  }
  render() {
    const {action} = this.state;
    return action === 'authenticate' ? (
      <SignIn onCancel={this.setAction('')} />
    ) : action === 'register' ? (
      <Register onCancel={this.setAction('')} />
    ) : (
      <View style={[container.container, container.colored, container.centerContent]}>
        <Button
            onPress={this.setAction('authenticate')}
            style={button.padded}
            textStyle={text.light}
        >
          {I18n.t('account.authenticate')}
        </Button>
        <Button
            onPress={this.setAction('register')}
            style={button.padded}
            textStyle={text.light}
        >
          {I18n.t('account.register')}
        </Button>
      </View>
    );
  }
}
