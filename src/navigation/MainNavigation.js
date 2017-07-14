// @flow
import {DrawerNavigator} from 'react-navigation';

import {initialRouteName as restaurantRoute} from 'walless/navigation/RestaurantNavigation';
import {initialRouteName as settingsRoute} from 'walless/navigation/SettingsNavigation';
import {initialRouteName as ordersRoute} from 'walless/navigation/OrdersNavigation';
import RestaurantNavigation from 'walless/navigation/RestaurantNavigation.component';
import SettingsNavigation from 'walless/navigation/SettingsNavigation.component';
import OrdersNavigation from 'walless/navigation/OrdersNavigation.component';

export const initialRouteName = 'home';

export const routes = {
  [initialRouteName]: {
    screen: () => null,
    translationKey: 'navigation.home'
  },
  [restaurantRoute]: {
    screen: RestaurantNavigation,
    translationKey: 'navigation.restaurant'
  },
  [ordersRoute]: {
    screen: OrdersNavigation,
    translationKey: 'navigation.orders.orders'
  },
  [settingsRoute]: {
    screen: SettingsNavigation,
    translationKey: 'navigation.settings.settings'
  }
};

const MainNavigation = new DrawerNavigator(routes, {
  initialRouteName,
  navigationOptions: ({navigation: {state}, screenProps: {titles}}) => ({
    title: titles[state.routeName]
  })
});

export default MainNavigation;

