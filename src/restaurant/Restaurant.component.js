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
  servingLocation: get(['active', 'servingLocation'])(state),
  language: state.translation.language
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
  componentWillMount = () => checkRestaurant(this.props);
  componentWillReceiveProps = newProps => checkRestaurant(newProps);
  render() {
    const {
      getRestaurant: {
        restaurant: {
          information: {
            [this.props.language]: {
              name, description
            } = {}
          }
        },
        data: {loading}
      } = {data: {}, restaurant: {information: {}}},
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
    return (
      <View style={[container.container, container.light]}>
        <View>
          <Text>{name}</Text>
          <Text>{description}</Text>
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
    );
  }
}

export default compose(
  connect(mapStateToProps, {setActiveServingLocation}),
  getRestaurant
)(Restaurant);
