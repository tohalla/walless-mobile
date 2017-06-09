// @flow
import React from 'react';
import {View, Text} from 'react-native';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {get, map} from 'lodash/fp';
import I18n from 'react-native-i18n';

import {getRestaurant} from '../graphql/restaurant/restaurant.queries';
import Button from '../components/Button.component';
import {restaurantRoutes} from '../navigation/RestaurantNavigation';

const mapStateToProps = state => ({
  restaurant: get(['active', 'restaurant'])(state)
});

class Restaurant extends React.Component {
  static navigationOptions = {
    title: 'Restaurant'
  };
  componentWillMount() {
    if (!get(['getRestaurant', 'restaurant'])(this.props)) {
      this.props.navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'selection'})
        ]
      }));
    }
  }
  render() {
    const {
      getRestaurant: {restaurant} = {},
      navigation
    } = this.props;
    return restaurant ? (
      <View>
        <View>
          <Text>{restaurant.name}</Text>
          <Text>{restaurant.description}</Text>
        </View>
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
      </View>
    ) : null;
  }
}

export default compose(
  connect(mapStateToProps),
  getRestaurant
)(Restaurant);
