// @flow
import React from 'react';
import {StackNavigator, addNavigationHelpers} from 'react-navigation';
import {Text} from 'react-native';
import {get} from 'lodash/fp';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {compose} from 'react-apollo';
import I18n from 'react-native-i18n';

import {addCartItems} from 'walless/restaurant/cart.reducer';
import {getRestaurant} from 'walless-graphql/restaurant/restaurant.queries';
import Button from 'walless/components/Button.component';
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
import LoadContent from 'walless/components/LoadContent.component';
import OpenDrawerButton from 'walless/navigation/OpenDrawerButton.component';

export const initialRouteName = 'restaurantSelection';

class MenuItemsWithActions extends React.Component {
  static navigationOptions = MenuItem.navigationOptions;
  handleAddToCart = menuItem => this.props.addCartItems(menuItem);
  render() {
    return (
      <MenuItems
          menuItemActions={[
            {
              label: I18n.t('restaurant.order.orderItem'),
              onPress: this.handleAddToCart
            }
          ]}
          {...this.props}
      />
    );
  }
}

export const restaurantRoutes = {
  restaurant: {
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
  [initialRouteName]: {screen: Selection},
  restaurantMenus: {
    screen: Menus,
    navigation: true,
    translationKey: 'restaurant.menu.menus'
  },
  restaurantMenuItems: {
    screen: connect(null, {addCartItems})(MenuItemsWithActions),
    navigation: true,
    translationKey: 'restaurant.menuItem.menuItems'
  },
  menuItem: {
    screen: MenuItem
  }
};

const LeftButton = connect(
  state => ({navigationState: get(['navigation', 'restaurant'])(state)})
)(({
  navigationState: {index, routes},
  navigation,
  titles,
  ...props
}) => index === 0 ?
  <OpenDrawerButton {...props} />
: (
  <Button onPress={() => navigation.goBack()} {...props}>
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

export const RestaurantNavigation = new StackNavigator(
  restaurantRoutes,
  {
    initialRouteName,
    transitionConfig: () => ({transitionSpec: {duration: 0}}),
    navigationOptions: ({navigation, screenProps: {titles}}) => ({
      title: titles[navigation.state.routeName] || undefined,
      headerLeft: <LeftButton navigation={navigation} style={header.button} titles={titles} />,
      headerRight: <CartButton navigation={navigation} style={header.button} />,
      headerStyle: header.header,
      headerTitleStyle: [header.text, header.title],
      headerTintColor: colors.headerForeground
    })
  }
);

const mapStateToProps = state => ({
  navigationState: get(['navigation', 'restaurant'])(state),
  restaurant: get(['servingLocation', 'restaurant'])(state),
  language: state.translation.language
});

class Navigation extends React.Component {
  render() {
    return (
      <LoadContent loadProps={this.props}>
        <RestaurantNavigation
            navigation={addNavigationHelpers({
              state: this.props.navigationState,
              dispatch: this.props.dispatch,
              language: this.props.language
            })}
            screenProps={{
              titles: Object.assign(
                Object.keys(restaurantRoutes).reduce((prev, key) =>
                  Object.assign(
                    {},
                    prev,
                    {[key]: restaurantRoutes[key].translationKey ?
                      I18n.t(restaurantRoutes[key].translationKey) : null
                    }
                  ), {}
                ),
                {home: get(['restaurant', 'i18n', this.props.language, 'name'])(this.props)}
              )
            }}
        />
      </LoadContent>
    );
  }
}

export default compose(
  connect(mapStateToProps),
  getRestaurant
)(Navigation);

