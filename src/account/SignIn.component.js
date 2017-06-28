// @flow
import React from 'react';
import {
  View,
  TextInput,
  ScrollView
} from 'react-native';
import I18n from 'react-native-i18n';
import {withApollo, compose} from 'react-apollo';
import LoadContent from 'walless/components/LoadContent.component';

import Button from 'walless/components/Button.component';
import input from 'walless/styles/input';
import button from 'walless/styles/button';
import text from 'walless/styles/text';
import container from 'walless/styles/container';
import {getActiveAccount} from 'walless/graphql/account/account.queries';
import {authenticate} from 'walless/util/auth';

class SignIn extends React.Component {
  state = {
    email: '',
    password: '',
    loading: false
  };
  componentWillMount() {
    this.setState({loading: false});
  }
  authenticate = async() => {
    const {email, password} = this.state;
    const {client, onSuccess = () => {}} = this.props;
    this.setState({loading: true});
    await authenticate(email, password);
    await client.resetStore();
    onSuccess();
  };
  render() {
    const {onCancel} = this.props;
    const {email, password, loading} = this.state;
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
              onChangeText={email => this.setState({email})}
              placeholder={I18n.t('account.email')}
              style={input.input}
              value={email}
          />
          <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              name="password"
              onChangeText={password => this.setState({password})}
              placeholder={I18n.t('account.password')}
              secureTextEntry
              style={input.input}
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
      </LoadContent>
    );
  }
}

export default withApollo(compose(
  getActiveAccount
)(SignIn));
