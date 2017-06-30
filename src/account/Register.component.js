// @flow
import React from 'react';
import {View} from 'react-native';
import I18n from 'react-native-i18n';
import LoadContent from 'walless/components/LoadContent.component';
import {set} from 'lodash/fp';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {isEmail} from 'walless/util/validation';
import Input from 'walless/components/Input.component';
import colors from 'walless/styles/colors';
import text from 'walless/styles/text';
import container from 'walless/styles/container';
import Stepped from 'walless/components/Stepped.component';
import {createAccount} from 'walless/util/auth';

export default class Register extends React.Component {
  state = {
    account: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      dateOfBirth: new Date()
    },
    status: '',
    step: 0
  };
  handleRegister = async() => {
    const {onSuccess = () => {}} = this.props;
    const {ok} = await createAccount(this.state.account);
    console.log(ok);
    if (ok) {
      this.setState({status: I18n.t('account.validationEmailSent')});
      onSuccess(this.state.account);
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
      account: {email, firstName, lastName, password, dateOfBirth},
      loading,
      step
    } = this.state;
    return (
      <LoadContent loadProps={this.props} loading={loading}>
        <View style={[container.container, container.colored]}>
          <Stepped
              color={colors.foregroundLight}
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
                          autoFocus
                          label={I18n.t('account.firstName')}
                          light
                          maxLength={64}
                          name="firstName"
                          onChangeText={this.handleInputChange(['account', 'firstName'])}
                          onSubmitEditing={() => this.lastNameInput.focus()}
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
                          ref={c => this.lastNameInput = c}
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
                        autoFocus
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
                        autoFocus
                        label={I18n.t('account.password')}
                        light
                        name="password"
                        onChangeText={this.handleInputChange(['account', 'password'])}
                        secureTextEntry
                        value={password}
                    />
                  )
                }, {
                  component: (
                    <Input
                        Input={DatePicker}
                        autoCapitalize="none"
                        autoCorrect={false}
                        cancelBtnText={I18n.t('cancel')}
                        confirmBtnText={I18n.t('confirm')}
                        customStyles={{
                          dateTouch: {
                            width: '100%'
                          },
                          dateTouchBody: {
                            flexDirection: 'row-reverse',
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center'
                          },
                          dateInput: {
                            flex: 1,
                            borderWidth: 0,
                            alignItems: 'flex-start'
                          },
                          dateText: [{marginLeft: 15}, text.medium, text.light],
                          dateIcon: {
                            margin: 0
                          }
                        }}
                        date={dateOfBirth}
                        iconComponent={(
                          <Icon
                              color={colors.foregroundLight}
                              name="event"
                              size={20}
                          />
                        )}
                        label={I18n.t('account.dateOfBirth')}
                        light
                        maxDate={new Date()}
                        mode="date"
                        name="dateOfBirth"
                        onDateChange={this.handleInputChange(['account', 'dateOfBirth'])}
                        style={{width: '100%'}}
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
