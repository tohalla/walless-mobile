// @flow
import React from 'react';
import {View} from 'react-native';
import I18n from 'react-native-i18n';
import LoadContent from 'walless/components/LoadContent.component';
import {set} from 'lodash/fp';

import {isEmail} from 'walless/util/validation';
import Input from 'walless/components/Input.component';
import colors from 'walless/styles/colors';
import container from 'walless/styles/container';
import Stepped from 'walless/components/Stepped.component';
import {createAccount} from 'walless/util/auth';

export default class Register extends React.Component {
  state = {
    account: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    status: '',
    step: 0
  };
  handleRegister = async() => {
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
  handleContinuePress = () => this.setState({step: this.state.step + 1});
  handleBackPress = () => this.setState({step: this.state.step - 1});
  render() {
    const {onCancel} = this.props;
    const {
      account: {email, firstName, lastName, password},
      loading,
      step
    } = this.state;
    return (
      <LoadContent loadProps={this.props} loading={loading}>
        <View style={[container.container, container.colored]}>
          <Stepped
              color={colors.carrara}
              containerProps={{
                alwaysBounceVertical: false,
                contentContainerStyle: [container.container, container.colored, container.centerContent],
                keyboardShouldPersistTaps: 'never'
              }}
              onBackPress={this.handleBackPress}
              onCancelPress={onCancel}
              onContinuePress={this.handleContinuePress}
              onSubmitPress={this.handleRegister}
              step={step}
              steps={[
                {
                  component: (
                    <View style={{width: '100%'}}>
                      <Input
                          autoCapitalize="words"
                          autoCorrect={false}
                          label={I18n.t('account.firstName')}
                          light
                          maxLength={64}
                          name="firstName"
                          onChangeText={this.handleInputChange(['account', 'firstName'])}
                          value={firstName}
                      />
                      <Input
                          autoCapitalize="words"
                          autoCorrect={false}
                          label={I18n.t('account.lastName')}
                          light
                          maxLength={64}
                          name="lastName"
                          onChangeText={this.handleInputChange(['account', 'lastName'])}
                          value={lastName}
                      />
                    </View>
                  ),
                  allowContinue: firstName && lastName
                }, {
                  component: (
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        label={I18n.t('account.email')}
                        light
                        maxLength={254}
                        name="email"
                        onChangeText={this.handleInputChange(['account', 'email'])}
                        value={email}
                    />
                  ),
                  allowContinue: isEmail(email)
                }, {
                  component: (
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        label={I18n.t('account.password')}
                        light
                        name="password"
                        onChangeText={this.handleInputChange(['account', 'password'])}
                        secureTextEntry
                        value={password}
                    />
                  )
                }
              ]}
              submitLabel={I18n.t('account.register')}
          />
        </View>
      </LoadContent>
    );
  }
}
