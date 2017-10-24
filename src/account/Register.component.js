// @flow
import React from 'react';
import {View} from 'react-native';
import I18n from 'react-native-i18n';
import gql from 'graphql-tag';
import LoadContent from 'walless/components/LoadContent.component';
import {set, get} from 'lodash/fp';
import {connect} from 'react-redux';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import client from 'walless/apolloClient';
import {isEmail} from 'walless/util/validation';
import Input from 'walless/components/Input.component';
import Password from 'walless/account/Password.component';
import colors from 'walless/styles/colors';
import text from 'walless/styles/text';
import container from 'walless/styles/container';
import Stepped from 'walless/components/Stepped.component';
import {createAccount} from 'walless/util/auth';
import {addNotification} from 'walless/notification/notification.reducer';

class Register extends React.Component {
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
  handleRegister = async () => {
    const {onSuccess = () => {}} = this.props;
    const {ok} = await createAccount(this.state.account);
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
    const {setAction, addNotification} = this.props;
    const {
      account: {email, firstName, lastName, password, dateOfBirth},
      loading,
      step
    } = this.state;
    return (
      <LoadContent loadProps={this.props} loading={loading}>
        <Stepped
            color={colors.foregroundLight}
            contentContainerStyle={[
              container.container,
              container.colored,
              {alignItems: 'stretch', justifyContent: 'center'}
            ]}
            onBackPress={this.handleBackPress}
            onCancelPress={setAction('')}
            onContinuePress={this.handleContinuePress}
            onSubmitPress={this.handleRegister}
            step={step}
            steps={[
              {
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
                allowContinue: isEmail(email),
                validate: async () => {
                  const exists = get(['data', 'accountByEmail', 'email'])(
                    await client.query({
                      query: gql`
                        query accountByEmail($email: String!){
                          accountByEmail(email: $email) {
                            email
                          }
                        }`,
                      variables: {email}
                    })
                  );
                  return typeof exists === 'undefined';
                },
                onError: () => addNotification({
                  type: 'alert',
                  message: I18n.t('error.emailRegisteredToAccount', {email}),
                  actions: [{
                    label: I18n.t('account.authenticate'),
                    onPress: setAction('authenticate'),
                    deleteOnPress: true
                  }]
                })
              },
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
                allowContinue: /^[a-zA-Z]+$/.test(firstName) && /^[a-zA-Z]+$/.test(lastName)
              },
              {
                component: (
                  <Password
                      autoFocus
                      light
                      password={{
                        onChangeText: this.handleInputChange(['account', 'password']),
                        value: password
                      }}
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
      </LoadContent>
    );
  }
}

export default connect(null, {addNotification})(Register);
