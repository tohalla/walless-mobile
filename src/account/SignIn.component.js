// @flow
import React from 'react';
import {View, ScrollView} from 'react-native';
import I18n from 'react-native-i18n';
import {withApollo, compose} from 'react-apollo';
import {set} from 'lodash/fp';

import AvoidKeyboard from 'walless/components/AvoidKeyboard.component';
import LoadContent from 'walless/components/LoadContent.component';
import Button from 'walless/components/Button.component';
import Input from 'walless/components/Input.component';
import button from 'walless/styles/button';
import text from 'walless/styles/text';
import container from 'walless/styles/container';
import {getActiveAccount} from 'walless/graphql/account/account.queries';
import {authenticate} from 'walless/util/auth';

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
  authenticate = async() => {
    const {account: {email, password}} = this.state;
    const {client, onSuccess = () => {}} = this.props;
    this.setState({loading: true});
    await authenticate(email, password);
    await client.resetStore();
    onSuccess();
  };
  render() {
    const {onCancel} = this.props;
    const {account: {email, password}, loading} = this.state;
    return (
      <LoadContent loadProps={this.props} loading={loading}>
        <AvoidKeyboard style={container.colored}>
          <ScrollView
              alwaysBounceVertical={false}
              contentContainerStyle={[container.container, container.colored, container.centerContent]}
              keyboardShouldPersistTaps="never"
              style={[container.container]}
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
                    style={button.padded}
                    textStyle={text.light}
                >
                  {I18n.t('cancel')}
                </Button>
              ) : null}
              <Button
                  onPress={this.authenticate}
                  style={button.padded}
                  textStyle={text.light}
              >
                {I18n.t('account.authenticate')}
              </Button>
            </View>
          </ScrollView>
        </AvoidKeyboard>
      </LoadContent>
    );
  }
}

export default withApollo(compose(
  getActiveAccount
)(SignIn));
