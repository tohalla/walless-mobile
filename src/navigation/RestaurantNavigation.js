// @flow
import React from 'react';
import {StackNavigator, addNavigationHelpers} from 'react-navigation';
import {Text} from 'react-native';
import {get} from 'lodash/fp';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {compose} from 'react-apollo';
import I18n from 'react-native-i18n';

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

export const initialRouteName = 'restaurantSelection';

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
    screen: MenuItems,
    navigation: true,
    translationKey: 'restaurant.menuItem.menuItems'
  },
  restaurantMenuItem: {screen: MenuItem}
};

const BackButton = connect(
  state => ({navigationState: get(['navigation', 'restaurant'])(state)})
)(({navigationState: {index, routes}, navigation, titles}) => index === 0 ? null : (
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

export const RestaurantNavigation = new StackNavigator(
  restaurantRoutes,
  {
    initialRouteName,
    navigationOptions: ({navigation, screenProps: {titles}}) => ({
      title: titles[navigation.state.routeName],
      headerLeft: <BackButton navigation={navigation} titles={titles}/>,
      headerRight: <CartButton navigation={navigation} />,
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
              dispatch: this.props.dispatch
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
                {home: get(['restaurant', 'information', this.props.language, 'name'])(this.props)}
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

