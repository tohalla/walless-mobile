// @flow
import React from 'react';
import {
  View,
  TextInput,
  ScrollView
} from 'react-native';
import I18n from 'react-native-i18n';
import LoadContent from 'walless/components/LoadContent.component';
import {set} from 'lodash/fp';

import Button from 'walless/components/Button.component';
import input from 'walless/styles/input';
import button from 'walless/styles/button';
import text from 'walless/styles/text';
import container from 'walless/styles/container';
import {createAccount} from 'walless/util/auth';

export default class Register extends React.Component {
  state = {
    account: {
      firstName: '',
      lastName: '',
      email: ''
    },
    status: ''
  };
  register = async() => {
    const {onSuccess = () => {}} = this.props;
    if (this.isValid()) {
      const {ok} = await createAccount(this.state.account);
      if (ok) {
        this.setState({status: I18n.t('account.validationEmailSent')});
        onSuccess();
      }
    }
  };
  handleInputChange = path => value => {
    this.setState(set(path)(value)(this.state));
  };
  isValid = () => {
    const {firstName, lastName, email} = this.state;
    return (
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        .test(email) &&
      firstName &&
      lastName
    );
  };
  render() {
    const {onCancel} = this.props;
    const {account: {email, firstName, lastName}, loading} = this.state;
    return (
      <LoadContent loadProps={this.props} loading={loading}>
        <ScrollView
            alwaysBounceVertical={false}
            contentContainerStyle={[container.container, container.colored, container.centerContent]}
            keyboardShouldPersistTaps="never"
            style={[container.container]}
        >
          <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              maxLength={254}
              name="email"
              onChangeText={this.handleInputChange(['account', 'email'])}
              placeholder={I18n.t('account.email')}
              style={input.input}
              value={email}
          />
          <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              maxLength={64}
              name="firstName"
              onChangeText={this.handleInputChange(['account', 'firstName'])}
              placeholder={I18n.t('account.firstName')}
              style={input.input}
              value={firstName}
          />
          <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              maxLength={64}
              name="lastName"
              onChangeText={this.handleInputChange(['account', 'lastName'])}
              placeholder={I18n.t('account.lastName')}
              style={input.input}
              value={lastName}
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
                disabled={!this.isValid()}
                onPress={this.register}
                style={button.padded}
                textStyle={text.light}
            >
              {I18n.t('account.register')}
            </Button>
          </View>
        </ScrollView>
      </LoadContent>
    );
  }
}
