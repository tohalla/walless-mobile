// @flow
import React from 'react';
import {Image, ScrollView, Platform, View} from 'react-native';
import {DrawerNavigator, DrawerItems} from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import RestaurantNavigation, {initialRouteName as restaurantRoute} from 'walless/navigation/RestaurantNavigation';
import SettingsNavigation, {initialRouteName as settingsRoute} from 'walless/navigation/SettingsNavigation';
import OrderNavigation, {initialRouteName as orderRoute} from 'walless/navigation/OrderNavigation';
import {major} from 'walless/styles/spacing';

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
  [orderRoute]: {
    screen: OrderNavigation,
    translationKey: 'navigation.orders.myOrders'
  },
  [settingsRoute]: {
    screen: SettingsNavigation,
    translationKey: 'navigation.settings.settings'
  }
};

class ContentComponent extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.navigationContainer}>
        <View style={styles.logoContainer}>
          <Image
              resizeMode="contain"
              source={require('walless-native/img/walless.png')}
              style={styles.logo}
          />
        </View>
        <DrawerItems {...this.props} style={{marginTop: 0}} />
      </ScrollView>
    );
  }
}

export default new DrawerNavigator(routes, {
  initialRouteName,
  contentComponent: props => <ContentComponent {...props}/>,
  navigationOptions: ({navigation: {state}, screenProps: {titles}}) => ({
    title: titles[state.routeName]
  })
});

const styles = EStyleSheet.create({
  navigationContainer: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    flexDirection: 'column',
    alignItems: 'stretch',
    flex: 1
  },
  logoContainer: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 90,
    marginVertical: major
  },
  logo: {
    height: '100%'
  }
});
