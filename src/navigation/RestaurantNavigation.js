// @flow
import {StackNavigator} from 'react-navigation';
import {View} from 'react-native';

import Restaurant from '../restaurant/Restaurant.component';
import Menus from '../restaurant/Menus.component';
import MenuItems from '../restaurant/MenuItems.component';
import Scan from '../restaurant/Scan.component';

export const restaurantRoutes = {
  scan: {
    screen: Scan,
    id: 'scan'
  },
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
