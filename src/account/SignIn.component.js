// @flow
import React from 'react';
import {View} from 'react-native';
import I18n from 'react-native-i18n';
import {withApollo, compose} from 'react-apollo';
import {connect} from 'react-redux';
import {set} from 'lodash/fp';
import {account} from 'walless-graphql';

import AvoidKeyboard from 'walless/components/AvoidKeyboard.component';
import LoadContent from 'walless/components/LoadContent.component';
import Button from 'walless/components/Button.component';
import Input from 'walless/components/Input.component';
import text from 'walless/styles/text';
import container from 'walless/styles/container';
import {authenticate} from 'walless/util/auth';
import {addNotification} from 'walless/notification/notification.reducer';

class SignIn extends React.Component {
  state = {
    account: {
      email: '',
      password: ''
    },
    loading: false
  };
  componentWillMount() {
    this.setState({loading: false});
  }
  handleInputChange = path => value => {
    this.setState(set(path)(value)(this.state));
  };
  authenticate = async () => {
    const {account: {email, password}} = this.state;
    const {client, onSuccess = () => {}, addNotification} = this.props;
    this.setState({loading: true});
    if ((await authenticate(email, password)).ok) {
      await client.resetStore();
      onSuccess();
    } else {
      addNotification({
        type: 'alert',
        message: I18n.t('error.invalidAuthenticationInformation')
      });
      this.setState({loading: false});
    }
  };
  render() {
    const {onCancel} = this.props;
    const {account: {email, password}, loading} = this.state;
    return (
      <LoadContent loadProps={this.props} loading={loading}>
        <AvoidKeyboard
            contentContainerStyle={[container.container, container.colored, container.centerContent]}
            style={container.colored}
        >
          <Input
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus
              keyboardType="email-address"
              label={I18n.t('account.email')}
              light
              maxLength={254}
              name="email"
              onChangeText={this.handleInputChange(['account', 'email'])}
              onSubmitEditing={() => this.passwordInput.focus()}
              value={email}
          />
          <Input
              autoCapitalize="none"
              autoCorrect={false}
              label={I18n.t('account.password')}
              light
              name="password"
              onChangeText={this.handleInputChange(['account', 'password'])}
              ref={c => this.passwordInput = c}
              secureTextEntry
              value={password}
          />
          <View style={[container.row, container.spread]}>
            {typeof onCancel === 'function' ? (
              <Button
                  onPress={onCancel}
                  padded
                  textStyle={text.light}
              >
                {I18n.t('cancel')}
              </Button>
            ) : null}
            <Button
                disabled={!(email && password)}
                onPress={this.authenticate}
                padded
                textStyle={text.light}
            >
              {I18n.t('account.authenticate')}
            </Button>
          </View>
        </AvoidKeyboard>
      </LoadContent>
    );
  }
}

export default withApollo(compose(
  connect(null, {addNotification}),
  account.getActiveAccount
)(SignIn));
