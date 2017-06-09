// @flow
import React from 'react';
import {View, Text} from 'react-native';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {get, map} from 'lodash/fp';
import {NavigationActions} from 'react-navigation';
import I18n from 'react-native-i18n';

import {getRestaurant} from '../graphql/restaurant/restaurant.queries';
import Button from '../components/Button.component';
import container from '../styles/container';
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
      getRestaurant: {restaurant} = {},
      getActiveAccount: {account} = {},
      navigation
    } = this.props;
    console.log(restaurant);
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
                key={route.id}
                onPress={() => navigation.navigate({routeName: route.id})}
            >
                {I18n.t(route.translationKey)}
            </Button>
          ))(restaurantRoutes)
        }
      </View>
    ) : (
      <View style={container.screenContainer}>
        {account ?
          <Button light onPress={() => {}}>
            {'Scan QR code'}
          </Button> :
          <Button
              light
              onPress={() => this.props.navigation.navigate('authentication')}
          >
              {I18n.t('account.authenticate')}
          </Button>
        }
        <Button
            light
            onPress={() => this.props.navigation.navigate('browse')}
        >
            {'Browse restaurants'}
        </Button>
      </View>
    );
  }
}

export default compose(
  connect(mapStateToProps),
  getRestaurant
)(Restaurant);
