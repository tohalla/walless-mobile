// @flow
import {StackNavigator} from 'react-navigation';
import {View} from 'react-native';
import {NavigationActions} from 'react-navigation';

import {NAVIGATE} from 'walless/navigation/navigation.actions';
import Restaurant from 'walless/restaurant/Restaurant.component';
import Cart from 'walless/restaurant/cart/Cart.component';
import Selection from 'walless/restaurant/Selection.component';
import Menus from 'walless/restaurant/Menus.component';
import MenuItems from 'walless/restaurant/MenuItems.component';
import Scan from 'walless/restaurant/Scan.component';

export const restaurantRoutes = {
  scan: {
    screen: Scan,
    name: 'scan'
  },
  home: {
    screen: Restaurant,
    name: 'home'
  },
  cart: {
    screen: Cart,
    name: 'cart'
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
) => action.type === NAVIGATE ?
  getStateForAction(NavigationActions.navigate({routeName: action.payload}), state)
: getStateForAction(action, state) || state;
