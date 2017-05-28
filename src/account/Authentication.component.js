// @flow
import React from 'react';
import {
	View,
	Button,
	TextInput,
	StyleSheet
} from 'react-native';
import I18n from 'react-native-i18n';
import {compose} from 'react-apollo';
import {hasIn} from 'lodash/fp';

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
	authenticate = async () => {
		const {email, password} = this.state;
		await authenticationHandler.authenticate(email, password);
		if (hasIn(['getActiveAccount', 'data', 'refetch'])(this.props)) {
			this.props.getActiveAccount.data.refetch();
		}
	};
	componentWillReceiveProps(newProps) {
		const {getActiveAccount: {account} = {}} = newProps;
		if (account) {
			newProps.navigation.navigate('home');
		}
	}
	render() {
		const {email, password} = this.state;
		return (
			<View
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
						width: '100%',
						height: '100%'
					}}
			>
				<View
						style={{width: '80%'}}
				>
					<TextInput
							autoCorrect={false}
							keyboardType="email-address"
							placeholder={I18n.t('account.email')}
							style={styles.textInput}
							name="email"
							onChangeText={email => this.setState({email})}
							value={email}
					/>
					<TextInput
							autoCorrect={false}
							placeholder={I18n.t('account.password')}
							secureTextEntry
							style={styles.textInput}
							name="password"
							onChangeText={password => this.setState({password})}
							value={password}
					/>
					<Button
							accessibilityLabel=""
							onPress={this.authenticate}
							title={I18n.t('account.authenticate')}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	textInput: {
		height: 40
	}
});

export default compose(
  getActiveAccount
)(Authentication);
