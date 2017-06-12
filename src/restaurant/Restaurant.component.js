// @flow
import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {get, map} from 'lodash/fp';
import I18n from 'react-native-i18n';
import {
  setActiveServingLocation
} from '../active.reducer';

import {resetNavigation} from '../navigation/navigation';
import container from '../styles/container';
import colors from '../styles/colors';
import CartButton from './cart/CartButton.Component';
import {getRestaurant} from '../graphql/restaurant/restaurant.queries';
import Button from '../components/Button.component';
import {restaurantRoutes} from '../navigation/RestaurantNavigation';

const mapStateToProps = state => ({
  restaurant: get(['active', 'restaurant'])(state),
  servingLocation: get(['active', 'servingLocation'])(state)
});

const checkRestaurant = props => {
  const {
    getRestaurant: {restaurant, data: {loading}} = {data: {}},
    navigation
  } = props;
  if (!restaurant && !loading) {
    resetNavigation(navigation, 'selection');
  }
};

class Restaurant extends React.Component {
  static navigationOptions = {
    title: 'Restaurant',
    headerRight: <CartButton />
  };
  componentWillMount = () => checkRestaurant(this.props);
  componentWillReceiveProps = newProps => checkRestaurant(newProps);
  render() {
    const {
      getRestaurant: {restaurant, data: {loading}} = {data: {}},
      navigation,
      setActiveServingLocation
    } = this.props;
    if (loading) {
      return (
        <View style={[container.screenContainer, container.centerContent]}>
          <ActivityIndicator color={colors.white} />
        </View>
      );
    }
    return restaurant ? (
      <View>
        <View>
          <Text>{restaurant.name}</Text>
          <Text>{restaurant.description}</Text>
        </View>
        <View style={container.centerContent}>
          {
            map(route => (
              route.navigation &&
              <Button
                  key={route.name}
                  onPress={() => navigation.navigate(route.name)}
              >
                {I18n.t(route.translationKey)}
              </Button>
            ))(restaurantRoutes)
          }
          <Button onPress={() => setActiveServingLocation(null)}>
            {'ulos pöydästä'}
          </Button>
        </View>
      </View>
    ) : null;
  }
}

export default compose(
  connect(mapStateToProps, {setActiveServingLocation}),
  getRestaurant
)(Restaurant);
