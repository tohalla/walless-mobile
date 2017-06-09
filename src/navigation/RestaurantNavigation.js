// @flow
import {StackNavigator} from 'react-navigation';
import {View} from 'react-native';

import Restaurant from '../restaurant/Restaurant.component';
import Selection from '../restaurant/Selection.component';
import Menus from '../restaurant/Menus.component';
import MenuItems from '../restaurant/MenuItems.component';
import Scan from '../restaurant/Scan.component';

export const restaurantRoutes = {
  scan: {
    screen: Scan,
    name: 'scan'
  },
  home: {
    screen: Restaurant,
    name: 'home'
  },
  selection: {
    screen: Selection,
    name: 'selection'
  },
  menus: {
    screen: Menus,
    navigation: true,
    translationKey: 'restaurant.menus',
    name: 'menus'
  },
  menuItems: {
    screen: MenuItems,
    navigation: true,
    name: 'menuItems',
    translationKey: 'restaurant.menuItems'
  },
  campaings: {screen: View, name: 'campaings'}
};

const RestaurantNavigation = new StackNavigator(
  restaurantRoutes,
  {initialRouteName: 'home'}
);

export default RestaurantNavigation;

const {router: {getStateForAction, getActionForPathAndParams}} = RestaurantNavigation;

export const navigationReducer = (
  state = getStateForAction(getActionForPathAndParams('home')),
  action
) => getStateForAction(action, state) || state;
