// @flow
import React from 'react';
import {
	AppRegistry,
	View,
	TextInput
} from 'react-native';

export default class Authentication extends React.Component {
	render() {
		return (
			<View>
				<TextInput
						placeholder="test"
				/>
			</View>
		);
	}
}

AppRegistry.registerComponent('Authentication', () => Authentication);
