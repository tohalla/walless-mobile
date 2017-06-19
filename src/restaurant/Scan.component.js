import React from 'react';

import {NavigationActions} from 'react-navigation';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {get} from 'lodash/fp';
import {View} from 'react-native';
import LoadContent from 'walless/components/LoadContent.component';

import QRScreen from 'walless/QRScreen.component';
import {
  setActiveServingLocation,
  setActiveRestaurant
} from 'walless/active.reducer';
import {getRestaurant} from 'walless-graphql/restaurant/restaurant.queries';
import {getServingLocation} from 'walless-graphql/restaurant/servingLocation.queries';

const mapStateToProps = state => ({
  servingLocation: get(['active', 'servingLocation'])(state),
  restaurant: get(['active', 'restaurant'])(state)
});

class Scan extends React.Component {
  static navigationOptions = {
    header: null
  };
  componentDidMount() { // use until camera working and qr codes have been setup
    this.props.setActiveServingLocation(5);
  }
  componentWillReceiveProps(newProps) {
    const restaurant = get(['getServingLocation', 'servingLocation', 'restaurant'])(newProps);
    if (
      restaurant !== get(['getServingLocation', 'servingLocation', 'restaurant'])(this.props) &&
      !get(['getServingLocation', 'data', 'loading'])(newProps)
    ) {
      this.props.setActiveRestaurant(restaurant);
    }
    if (!get(['getRestaurant', 'data', 'loading'])(newProps) && newProps.restaurant) {
      this.reset();
    }
  }
  reset = () => this.props.navigation.dispatch(NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({routeName: 'home'})
    ]
  }));
  render = () => <View />
  // render = () => (
  //   <LoadContent loadProps={this.props}>
  //     <QRScreen
  //         onSuccess={() => {}}
  //     />
  //   </LoadContent>
  //  );
};

export default compose(
  connect(mapStateToProps, {setActiveServingLocation, setActiveRestaurant}),
  getServingLocation,
  getRestaurant
)(Scan);
