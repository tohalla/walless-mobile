import React from 'react';

import {NavigationActions} from 'react-navigation';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {get} from 'lodash/fp';

import QRScreen from '../QRScreen.component';
import {
  setActiveServingLocation,
  setActiveRestaurant
} from '../active.reducer';
import {getRestaurant} from '../graphql/restaurant/restaurant.queries';
import {getServingLocation} from '../graphql/restaurant/servingLocation.queries';

class Scan extends React.Component {
  constructor(props) { // use until camera working and qr codes have been setup
    super(props);
    props.setActiveServingLocation(3);
  }
  componentWillReceiveProps(newProps) {
    const restaurant = get(['getServingLocation', 'servingLocation', 'restaurant'])(newProps);
    if (restaurant !== get(['getServingLocation', 'servingLocation', 'restaurant'])(this.props)) {
      this.props.setActiveRestaurant(restaurant);
    }
  }
  reset = () => this.props.navigation.dispatch(NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({routeName: 'home'})
    ]
  }));
  render = () => (
    <QRScreen
        onSuccess={() => this.props.setActiveServingLocation(3)}
    />
  );
};

export default compose(
  connect(null, {setActiveServingLocation, setActiveRestaurant}),
  getServingLocation,
  getRestaurant
)(Scan);
