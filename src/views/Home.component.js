import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'react-apollo';
import {get} from 'lodash/fp';
import {View, Text, TouchableOpacity} from 'react-native';
import I18n from 'react-native-i18n';

import button from '../styles/button';
import container from '../styles/container';
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
      getRestaurant: {restaurant} = {},
      getActiveAccount: {account} = {}
    } = this.props;
    return restaurant && account ?
      <RestaurantNavigator props={{restaurant}} /> :
      <View style={container.screenContainer}>
        {account ?
          <TouchableOpacity
              onPress={() => {}}
              style={button.button}
          >
            <Text style={[button.buttonText, button.buttonTextLight]}>
              {'Scan QR code'}
            </Text>
          </TouchableOpacity> :
          <TouchableOpacity
              onPress={() => this.props.navigation.navigate('authentication')}
              style={button.button}
          >
            <Text style={[button.buttonText, button.buttonTextLight]}>
              {I18n.t('account.authenticate')}
            </Text>
          </TouchableOpacity>
        }
        <TouchableOpacity
            onPress={() => this.props.navigation.navigate('browse')}
            style={button.button}
        >
          <Text style={[button.buttonText, button.buttonTextLight]}>
            {'Browse restaurants'}
          </Text>
        </TouchableOpacity>
      </View>;
  }
}

export default compose(
  connect(mapStateToProps),
  getServingLocation,
  getRestaurant,
  getActiveAccount
)(Home);
