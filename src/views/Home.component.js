import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'react-apollo';
import {get} from 'lodash/fp';

import RestaurantNavigator from '../restaurant/RestaurantNavigator.component';
import {getRestaurant} from '../graphql/restaurant/restaurant.queries';
import {getServingLocation} from '../graphql/restaurant/servingLocation.queries';
import {getActiveAccount} from '../graphql/account/account.queries';

const mapStateToProps = state => ({
  restaurant: get(['active', 'restaurant'])(state)
});

class Home extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home'
  };
  render() {
    const {
      getRestaurant: {restaurant} = {}
    } = this.props;
    return<RestaurantNavigator props={{restaurant}} />;
  }
}

export default compose(
  connect(mapStateToProps),
  getServingLocation,
  getRestaurant,
  getActiveAccount
)(Home);
