// @flow
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import I18n from 'react-native-i18n';
import {withApollo, compose} from 'react-apollo';

import Button from 'walless/components/Button.component';
import colors from 'walless/styles/colors';
import container from 'walless/styles/container';
import {getActiveAccount} from 'walless/graphql/account/account.queries';
import authenticationHandler from 'walless/util/auth';

class Authentication extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Authentication'
  };
  state = {
    email: '',
    password: '',
    loading: false
  };
  componentWillMount() {
    this.setState({loading: false});
  }
  authenticate = async () => {
    const {email, password} = this.state;
    this.setState({loading: true});
    await authenticationHandler.authenticate(email, password);
    await this.props.client.resetStore();
  };
  render() {
    const {email, password, loading} = this.state;
    return loading ? (
      <View style={[container.screenContainer, container.centerContent]}>
        <ActivityIndicator color={colors.white} />
      </View>
    ) : (
      <View style={[container.screenContainer, container.centerContent]}>
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

export default withApollo(compose(
  getActiveAccount
)(Authentication));
