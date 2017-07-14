// @flow
import React from 'react';
import {TabNavigator, TabBarBottom} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from 'walless/styles/colors';
import text from 'walless/styles/text';

export const initialRouteName = 'ordersRecent';

export const ordersRoutes = {
  [initialRouteName]: {
    screen: () => null,
    translationKey: 'navigation.orders.recent',
    icon: 'access-time'
  },
  'ordersReceipts': {
    screen: () => null,
    translationKey: 'navigation.orders.receipts',
    icon: 'receipt'
  }
};

const OrdersNavigation = new TabNavigator(
  ordersRoutes,
  {
    initialRouteName,
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    lazy: true,
    tabBarOptions: {
      activeTintColor: colors.foregroundDark,
      inactiveTintColor: colors.lightGray,
      inactiveBackgroundColor: colors.backgroundLight,
      activeBackgroundColor: colors.white,
      labelStyle: text.small
    },
    navigationOptions: ({navigation: {state}, screenProps: {titles}}) => ({
      title: titles[state.routeName],
      tabBarIcon: ({tintColor}) => (
        <Icon
            color={tintColor}
            name={ordersRoutes[state.routeName].icon}
            size={20}
        />
      )
    })
  }
);

export default OrdersNavigation;
