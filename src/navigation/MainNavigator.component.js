//// @flow
import React from 'react';
import {
	Navigator,
	StyleSheet,
	View,
	ScrollView,
	TouchableOpacity,
	Text
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import {compose} from 'react-apollo';

import routes from './routes';
import {getActiveAccount} from '../graphql/account/account.queries';
import Authentication from '../account/Authentication.component';
import colors from '../styles/colors';
import Home from '../views/Home.component';

class MainNavigator extends React.Component {
	renderScene = (route, navigator) => (
		<View style={styles.background}>
			{
				route.hideSideBar ? this.getComponent(route, navigator)
				: <SideMenu
						menu={(
							<ScrollView
									style={{
								    flex: 1,
								    width: window.width,
								    height: window.height,
								    padding: 10,
										backgroundColor: colors.sideMenu.background
									}}
							>
								<TouchableOpacity onPress={() => {}}>
									<Text style={styles.menuButton}>{'Home'}</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => {}}>
									<Text style={styles.menuButton}>{'Restaurants'}</Text>
								</TouchableOpacity>
							</ScrollView>
						)}
				>
					<View style={styles.background}>
						{this.getComponent(route, navigator)}
					</View>
				</SideMenu>
			}
		</View>
	);
	getComponent = (route, navigator) =>
		React.cloneElement(
			route.id === 'authentication' ? <Authentication />
			: route.id === 'home' ? <Home />
			: <View />,
			{navigator}
		);
	render() {
		return (
			<Navigator
					initialRoute={routes.authentication}
					renderScene={this.renderScene}
					configureScreen={(route, routeStack) => Navigator.SceneConfigs.PushFromLeft}
			/>
		);
	}
}
const styles = StyleSheet.create({
	background: {
    flex: 1,
		backgroundColor: colors.background,
    width: window.width,
    height: window.height
	},
	menuButton: {
		fontSize: 18,
		padding: 4,
		color: colors.sideMenu.foreground,
		width: '100%'
	}
});

export default compose(
  getActiveAccount
)(MainNavigator);
