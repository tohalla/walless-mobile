// @flow
import React from 'react';
import {
	Navigator
} from 'react-native';

import Authentication from './account/Authentication.component';

export default class MainNavigator extends React.Component {
	renderScene = (route, navigator) =>
		route.id === 'authentication' ? <Authentication navigator={navigator}/>
		: null
	render() {
		return (
			<Navigator
					initialRoute={{id: 'authentication'}}
					renderScene={this.renderScene}
					configureScreen={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
			/>
		);
	}
}

