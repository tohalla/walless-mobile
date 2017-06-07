// @flow
import {StackNavigator} from 'react-navigation';
import {View} from 'react-native';

import Restaurant from '../restaurant/Restaurant.component';
import Menus from '../restaurant/Menus.component';
import MenuItems from '../restaurant/MenuItems.component';

export const restaurantRoutes = {
	home: {
		screen: Restaurant,
		id: 'home'
	},
	menus: {
		screen: Menus,
		navigation: true,
		translationKey: 'restaurant.menus',
		id: 'menus'
	},
	menuItems: {
		screen: MenuItems,
		navigation: true,
		id: 'menuItems',
		translationKey: 'restaurant.menuItems'
	},
	campaings: {screen: View, id: 'campaings'}
};

export default new StackNavigator(restaurantRoutes, {
	initialRouteName: 'home'
});
