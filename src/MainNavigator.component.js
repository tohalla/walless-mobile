// @flow
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

import Authentication from './account/Authentication.component';
import colors from './styles/colors';

export default class MainNavigator extends React.Component {
	renderScene = (route, navigator) => (
		<View style={styles.background}>
			{
				route.id === 'authentication' ? <Authentication navigator={navigator}/>
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
									<Text style={styles.menuButton}>{'menubutton'}</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => {}}>
									<Text style={styles.menuButton}>{'menubutton'}</Text>
								</TouchableOpacity>
							</ScrollView>
						)}
				>
					<View style={styles.background}>
						{
						}
					</View>
				</SideMenu>
			}
		</View>
	);
	render() {
		return (
			<Navigator
					initialRoute={{id: 'authentication'}}
					renderScene={this.renderScene}
					configureScreen={(route, routeStack) => Navigator.SceneConfigs.PushFromRight}
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
