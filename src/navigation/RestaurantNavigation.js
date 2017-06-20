// @flow
import React from 'react';
import {StackNavigator} from 'react-navigation';
import {View} from 'react-native';
import {NavigationActions} from 'react-navigation';

import Restaurant from 'walless/restaurant/Restaurant.component';
import Cart from 'walless/restaurant/cart/Cart.component';
import Selection from 'walless/restaurant/Selection.component';
import Menus from 'walless/restaurant/Menus.component';
import MenuItems from 'walless/restaurant/MenuItems.component';
import MenuItem from 'walless/restaurant/MenuItem.component';
import Scan from 'walless/restaurant/Scan.component';
import CartButton from 'walless/restaurant/cart/CartButton.Component';
import colors from 'walless/styles/colors';
import header from 'walless/styles/header';

export const initialRouteName = 'restaurantHome';

export const restaurantRoutes = {
  scan: {screen: Scan},
  [initialRouteName]: {
    screen: Restaurant,
    translationKey: 'restaurant.restaurant'
  },
  cart: {
    screen: Cart,
    translationKey: 'restaurant.cart.cart'
  },
  selection: {screen: Selection},
  menus: {
    screen: Menus,
    navigation: true,
    translationKey: 'restaurant.menus.menus'
  },
  menuItems: {
    screen: MenuItems,
    navigation: true,
    translationKey: 'restaurant.menuItems.menuItems'
  },
  menuItem: {screen: MenuItem},
  campaings: {screen: View}
};

const RestaurantNavigation = new StackNavigator(
  restaurantRoutes,
  {
    initialRouteName,
    navigationOptions: ({navigation: {titles, state}}) => ({
      title: titles[state.routeName],
      headerRight: <CartButton />,
      headerStyle: header.header,
      headerTitleStyle: [header.text, header.title],
      headerTintColor: colors.headerForeground,
      headerBackTitleStyle: header.text
    })
  }
);

export default RestaurantNavigation;

const {router: {getStateForAction, getActionForPathAndParams}} = RestaurantNavigation;

export const navigationReducer = (
  state = getStateForAction(getActionForPathAndParams('restaurantHome')),
  action
) =>
  action.type === NavigationActions.NAVIGATE &&
  action.routeName === state.routes[state.routes.length - 1].routeName ?
    state
  : getStateForAction(action, state);
