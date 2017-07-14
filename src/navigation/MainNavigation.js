// @flow
import React from 'react';
import {View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {DrawerNavigator, DrawerItems, NavigationActions} from 'react-navigation';

import {initialRouteName as restaurantRoute} from 'walless/navigation/RestaurantNavigation';
import {initialRouteName as settingsRoute} from 'walless/navigation/SettingsNavigation';
import {initialRouteName as ordersRoute} from 'walless/navigation/OrdersNavigation';
import RestaurantNavigation from 'walless/navigation/RestaurantNavigation.component';
import SettingsNavigation from 'walless/navigation/SettingsNavigation.component';

export const initialRouteName = 'home';

export const routes = {
  [initialRouteName]: {
    screen: View,
    translationKey: 'navigation.home'
  },
  [restaurantRoute]: {
    screen: RestaurantNavigation,
    translationKey: 'navigation.restaurant'
  },
  [ordersRoute]: {
    screen: View,
    translationKey: 'navigation.orders'
  },
  [settingsRoute]: {
    screen: SettingsNavigation,
    translationKey: 'navigation.settings.settings'
  }
};

const ContentComponent = connect()(props => (
  <ScrollView>
    <DrawerItems
        {...props}
        getLabel={({route}) => props.screenProps.titles[route.routeName]}
        onItemPress={({route, focused}) => {
          props.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate(route)
            ]
          }));
          props.onItemPress({route, focused});
        }}
    />
  </ScrollView>
));

const MainNavigation = new DrawerNavigator(routes, {
  initialRouteName,
  contentComponent: props => <ContentComponent {...props}/>
});

export default MainNavigation;

