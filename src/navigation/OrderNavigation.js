// @flow
import React from 'react';
import {Text} from 'react-native';
import {
  TabNavigator,
  TabBarBottom,
  StackNavigator,
  addNavigationHelpers
} from 'react-navigation';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import I18n from 'react-native-i18n';
import {get} from 'lodash/fp';

import MenuItem from 'walless/restaurant/MenuItem.component';
import colors from 'walless/styles/colors';
import header from 'walless/styles/header';
import Button from 'walless/components/Button.component';
import Orders from 'walless/account/Orders.component';
import Order from 'walless/account/Order.component';
import OpenDrawerButton from 'walless/navigation/OpenDrawerButton.component';
import text from 'walless/styles/text';
import {mapToProps} from 'walless/util/component';

const mapStateToProps = state => ({
  navigationState: get(['navigation', 'order'])(state),
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
    translationKey: 'navigation.orders.myOrders'
  },
  order: {
    screen: mapToProps(
      Order,
      props => get(['navigation', 'state', 'params'])(props)
    )
  },
  menuItem: {screen: MenuItem}
};

const LeftButton = connect(
  state => ({navigationState: get(['navigation', 'order'])(state)})
)(({navigationState: {index, routes}, navigation, titles}) => index === 0 ?
  <OpenDrawerButton />
: (
  <Button onPress={() => navigation.goBack()} >
    <Icon
        color={colors.headerForeground}
        name="chevron-left"
        size={20}
    />
    <Text style={header.text}>
      {titles[routes[index - 1].routeName]}
    </Text>
  </Button>
));

export const OrderNavigation = new StackNavigator(
  orderRoutes,
  {
    initialRouteName,
    navigationOptions: ({navigation, screenProps: {titles}}) => ({
      title: titles[navigation.state.routeName],
      headerLeft: <LeftButton navigation={navigation} titles={titles}/>,
      headerStyle: header.header,
      headerTitleStyle: [header.text, header.title],
      headerTintColor: colors.headerForeground
    })
  }
);

class Navigation extends React.Component {
  render() {
    return (
      <OrderNavigation
          navigation={addNavigationHelpers({
            state: this.props.navigationState,
            dispatch: this.props.dispatch,
            language: this.props.language
          })}
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

export default connect(mapStateToProps)(Navigation);

