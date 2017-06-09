// @flow
import React from 'react';
import {StackNavigator} from 'react-navigation';
import {NavigationActions} from 'react-navigation';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {get} from 'lodash/fp';
import {View} from 'react-native';

import Restaurant from '../restaurant/Restaurant.component';
import Menus from '../restaurant/Menus.component';
import MenuItems from '../restaurant/MenuItems.component';
import QRScreen from '../QRScreen.component';
import {
  setActiveServingLocation,
  setActiveRestaurant
} from '../active.reducer';
import {getRestaurant} from '../graphql/restaurant/restaurant.queries';
import {getServingLocation} from '../graphql/restaurant/servingLocation.queries';

const initialRouteName = 'home';

const Scan = compose(
  connect(null, {setActiveServingLocation, setActiveRestaurant}),
  getServingLocation,
  getRestaurant
)(class Scan extends React.Component {
  reset = () => this.props.navigation.dispatch(NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({routeName: initialRouteName})
    ]
  }));
  componentWillReceiveProps(newProps) {
    const restaurant = get(['getServingLocation', 'servingLocation', 'restaurant'])(newProps);
    if (restaurant !== get(['getServingLocation', 'servingLocation', 'restaurant'])(this.props)) {
      this.props.setActiveRestaurant(restaurant);
    }
  }
  render = () => (
    <QRScreen
        onSuccess={() => this.props.setActiveServingLocation(3)}
    />
  );
});


export const restaurantRoutes = {
  scan: {
    screen: Scan,
    id: 'scan'
  },
  home: {
    screen: Restaurant,
    id: 'home'
  },
  menus: {
    screen: Menus,
    navigation: true,
    translationKey: 'restaurant.menus',
    id: 'menus'
  },
  menuItems: {
    screen: MenuItems,
    navigation: true,
    id: 'menuItems',
    translationKey: 'restaurant.menuItems'
  },
  campaings: {screen: View, id: 'campaings'}
};

export default new StackNavigator(restaurantRoutes, {initialRouteName});
