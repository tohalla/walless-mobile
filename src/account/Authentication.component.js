// @flow
import React from 'react';
import {
	View,
	Button,
	TextInput,
	StyleSheet
} from 'react-native';
import I18n from 'react-native-i18n';

import authenticationHandler from '../util/auth';

export default class Authentication extends React.Component {
	state = {
		email: '',
		password: ''
	};
	authenticate = () => {
		const {email, password} = this.state;
		authenticationHandler.authenticate(email, password);
	};
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
