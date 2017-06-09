// @flow
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet
} from 'react-native';
import I18n from 'react-native-i18n';
import {compose} from 'react-apollo';
import {hasIn} from 'lodash/fp';

import Button from '../components/Button.component';
import colors from '../styles/colors';
import container from '../styles/container';
import {getActiveAccount} from '../graphql/account/account.queries';
import authenticationHandler from '../util/auth';

class Authentication extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Authentication'
  };
  state = {
    email: '',
    password: ''
  };
  componentWillReceiveProps(newProps) {
    const {getActiveAccount: {account} = {}} = newProps;
    if (account) {
      newProps.navigation.navigate('home');
    }
  }
  authenticate = async () => {
    const {email, password} = this.state;
    await authenticationHandler.authenticate(email, password);
    if (hasIn(['getActiveAccount', 'data', 'refetch'])(this.props)) {
      this.props.getActiveAccount.data.refetch();
    }
  };
  render() {
    const {email, password} = this.state;
    return (
      <View style={container.screenContainer}>
        <TextInput
            autoCorrect={false}
            keyboardType="email-address"
            name="email"
            onChangeText={email => this.setState({email})}
            placeholder={I18n.t('account.email')}
            style={styles.input}
            value={email}
        />
        <TextInput
            autoCorrect={false}
            name="password"
            onChangeText={password => this.setState({password})}
            placeholder={I18n.t('account.password')}
            secureTextEntry
            style={styles.input}
            value={password}
        />
        <Button
            light
            onPress={this.authenticate}
        >
          {I18n.t('account.authenticate')}
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    backgroundColor: colors.carrara
  }
});

export default compose(
  getActiveAccount
)(Authentication);
