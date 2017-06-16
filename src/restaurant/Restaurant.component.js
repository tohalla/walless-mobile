// @flow
import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {get, map} from 'lodash/fp';
import I18n from 'react-native-i18n';
import {
  setActiveServingLocation
} from 'walless/active.reducer';

import {resetNavigation} from 'walless/navigation/navigation';
import container from 'walless/styles/container';
import colors from 'walless/styles/colors';
import {getRestaurant} from 'walless-graphql/restaurant/restaurant.queries';
import Button from 'walless/components/Button.component';
import {restaurantRoutes} from 'walless/navigation/RestaurantNavigation';

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
    title: 'Restaurant'
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
              restaurantRoutes[route].navigation &&
              <Button
                  key={route}
                  onPress={() => navigation.navigate(route)}
              >
                {I18n.t(restaurantRoutes[route].translationKey)}
              </Button>
            ))(Object.keys(restaurantRoutes))
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
