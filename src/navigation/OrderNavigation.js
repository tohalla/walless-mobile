// @flow
import React from 'react';
import {TabNavigator, TabBarBottom, StackNavigator} from 'react-navigation';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import I18n from 'react-native-i18n';

import colors from 'walless/styles/colors';
import header from 'walless/styles/header';
import Orders from 'walless/account/Orders.component';
import Order from 'walless/account/Order.component';
import text from 'walless/styles/text';

const mapStateToProps = state => ({
  language: state.translation.language
});

export const ordersRoutes = {
  ordersRecent: {
    screen: Orders,
    translationKey: 'navigation.orders.recent',
    icon: 'access-time'
  },
  ordersReceipts: {
    screen: () => null,
    translationKey: 'navigation.orders.receipts',
    icon: 'receipt'
  }
};

const OrdersNavigator = new TabNavigator(
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

const OrdersNavigation = connect(mapStateToProps)(
  class OrdersNavigation extends React.Component {
    render() {
      return (
        <OrdersNavigator
            screenProps={{
              rootNavigation: this.props.navigation,
              titles: Object.keys(ordersRoutes).reduce((prev, key) =>
                Object.assign(
                  {},
                  prev,
                  {[key]: ordersRoutes[key].translationKey ?
                    I18n.t(ordersRoutes[key].translationKey) : null
                  }
                ),
                {}
              )
            }}
        />
      );
    }
  }
);

export const initialRouteName = 'orders';

export const orderRoutes = {
  [initialRouteName]: {
    screen: OrdersNavigation,
    translationKey: 'navigation.orders.orders'
  },
  order: {
    screen: Order
  }
};

const OrderNavigator = new StackNavigator(
  orderRoutes,
  {
    initialRouteName,
    navigationOptions: ({navigation, screenProps: {titles}}) => ({
      title: titles[navigation.state.routeName],
      headerStyle: header.header,
      headerTitleStyle: [header.text, header.title],
      headerTintColor: colors.headerForeground,
      headerBackTitleStyle: header.text
    })
  }
);

class OrderNavigation extends React.Component {
  render() {
    return (
      <OrderNavigator
          screenProps={{
            titles: Object.keys(orderRoutes).reduce((prev, key) =>
              Object.assign(
                {},
                prev,
                {[key]: orderRoutes[key].translationKey ?
                  I18n.t(orderRoutes[key].translationKey) : null
                }
              ),
              {}
            )
          }}
      />
    );
  }
}

export default connect(mapStateToProps)(OrderNavigation);

