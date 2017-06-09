// @flow
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {get, map} from 'lodash/fp';
import {NavigationActions} from 'react-navigation';
import I18n from 'react-native-i18n';

import {getRestaurant} from '../graphql/restaurant/restaurant.queries';
import button from '../styles/button';
import {restaurantRoutes} from './RestaurantNavigator.component';

const mapStateToProps = state => ({
  restaurant: get(['active', 'restaurant'])(state)
});

class Restaurant extends React.Component {
  static navigationOptions = {
    title: 'Restaurant'
  };
  componentDidMount() {
    if (!this.props.restaurant) {
      this.props.navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'scan'})
        ]
      }));
    }
  }
  render() {
    const {
      getRestaurant: {restaurant} = {
        restaurant: this.props.screenProps ? this.props.restaurant : {}
      },
      navigation
    } = this.props;
    return typeof restaurant === 'object' ? (
      <View>
        <View>
          <Text>{restaurant.name}</Text>
          <Text>{restaurant.description}</Text>
        </View>
        {
          map(route => (
            route.navigation ?
              <TouchableOpacity
                  key={route.id}
                  onPress={() => navigation.navigate({routeName: route.id})}
                  style={button.button}
              >
                <Text style={button.buttonText}>
                  {I18n.t(route.translationKey)}
                </Text>
              </TouchableOpacity> :
            null
          ))(restaurantRoutes)
        }
      </View>
    ) : null;
  }
}

export default compose(
  connect(mapStateToProps),
  getRestaurant
)(Restaurant);
