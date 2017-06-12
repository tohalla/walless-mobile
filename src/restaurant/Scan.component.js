import React from 'react';

import {NavigationActions} from 'react-navigation';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {get} from 'lodash/fp';

import QRScreen from 'walless/QRScreen.component';
import {
  setActiveServingLocation,
  setActiveRestaurant
} from 'walless/active.reducer';
import {getRestaurant} from 'walless-graphql/restaurant/restaurant.queries';
import {getServingLocation} from 'walless-graphql/restaurant/servingLocation.queries';

const mapStateToProps = state => ({
  servingLocation: get(['active', 'servingLocation'])(state)
});

class Scan extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) { // use until camera working and qr codes have been setup
    super(props);
    props.setActiveServingLocation(3);
  }
  componentWillReceiveProps(newProps) {
    const restaurant = get(['getServingLocation', 'servingLocation', 'restaurant'])(newProps);
    if (restaurant !== get(['getServingLocation', 'servingLocation', 'restaurant'])(this.props)) {
      this.props.setActiveRestaurant(restaurant);
      this.reset();
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
  connect(mapStateToProps, {setActiveServingLocation, setActiveRestaurant}),
  getServingLocation,
  getRestaurant
)(Scan);
