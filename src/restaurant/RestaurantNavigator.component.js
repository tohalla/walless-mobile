// @flow
import {StackNavigator} from 'react-navigation';
import {View} from 'react-native';

import Restaurant from '../restaurant/Restaurant.component';
import Menus from '../restaurant/Menus.component';

export const routes = {
	home: {screen: Restaurant},
	menus: {screen: Menus},
	campaings: {screen: View}
};

export default new StackNavigator(routes, {
	initialRouteName: 'home'
});
