import React from 'react';
import {NavigationActions} from 'react-navigation';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {get} from 'lodash/fp';
import {View} from 'react-native';

import {connectToServingLocation} from 'walless/servingLocation.reducer';
import {getRestaurant} from 'walless-graphql/restaurant/restaurant.queries';
import {getServingLocation} from 'walless-graphql/restaurant/servingLocation.queries';

const mapStateToProps = state => ({
  restaurant: get(['servingLocation', 'restaurant'])(state)
});

class Scan extends React.Component {
  static navigationOptions = {
    header: null
  };
  componentDidMount = async() => { // use until camera working and qr codes have been setup
    this.props.connectToServingLocation('eyJrZXkiOiIxZWUyOGMwMS0xMGIyLTRlMTgtOTgzMC1kNTc1NDAzN2Y4YWQiLCJzZXJ2aW5nTG9jYXRpb25JZCI6IDV9');
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
      NavigationActions.navigate({routeName: 'restaurantHome'})
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
  connect(mapStateToProps, {connectToServingLocation}),
  getServingLocation,
  getRestaurant
)(Scan);
