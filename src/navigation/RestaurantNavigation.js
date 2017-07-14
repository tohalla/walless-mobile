// @flow
import React from 'react';
import {StackNavigator} from 'react-navigation';

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

export const initialRouteName = 'restaurant';

export const restaurantRoutes = {
  [initialRouteName]: {
    screen: Restaurant,
    translationKey: 'restaurant.restaurant'
  },
  restaurantScan: {
    screen: Scan,
    translationKey: 'restaurant.scanQR'
  },
  restaurantCart: {
    screen: Cart,
    translationKey: 'restaurant.cart.cart'
  },
  restaurantSelection: {screen: Selection},
  restaurantMenus: {
    screen: Menus,
    navigation: true,
    translationKey: 'restaurant.menu.menus'
  },
  restaurantMenuItems: {
    screen: MenuItems,
    navigation: true,
    translationKey: 'restaurant.menuItem.menuItems'
  },
  restaurantMenuItem: {screen: MenuItem}
};

const RestaurantNavigation = new StackNavigator(
  restaurantRoutes,
  {
    initialRouteName,
    navigationOptions: ({navigation, screenProps: {titles}}) => ({
      title: titles[navigation.state.routeName],
      headerRight: <CartButton navigation={navigation} />,
      headerStyle: header.header,
      headerTitleStyle: [header.text, header.title],
      headerTintColor: colors.headerForeground,
      headerBackTitleStyle: header.text
    })
  }
);

export default RestaurantNavigation;
