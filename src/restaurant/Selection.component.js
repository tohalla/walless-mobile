// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {get, isEqual} from 'lodash/fp';
import I18n from 'react-native-i18n';
import {restaurant, account} from 'walless-graphql';

import {setRestaurantNavigation} from 'walless/navigation/navigation.actions';
import Button from 'walless/components/Button.component';
import container from 'walless/styles/container';
import text from 'walless/styles/text';
import LoadContent from 'walless/components/LoadContent.component';

const mapStateToProps = state => ({
  restaurant: get(['servingLocation', 'restaurant'])(state)
});

class Selection extends React.Component {
  static propTypes = {
    restaurant: PropTypes.object,
    account: PropTypes.object,
    navigation: PropTypes.shape({navigate: PropTypes.func.isRequired}),
    setRestaurantNavigation: PropTypes.func.isRequired
  };
  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'transparent',
      position: 'absolute',
      shadowColor: 'transparent',
      borderBottomWidth: 0,
      top: 0,
      left: 0,
      right: 0
    },
    headerRight: null
  };
  constructor(props) {
    super(props);
    if (this.props.restaurant) {
      this.toRestaurant();
    }
  }
  componentWillReceiveProps(newProps) {
    if (!isEqual(newProps.restaurant)(this.props.restaurant)) {
      this.toRestaurant();
    }
  }
  toRestaurant = () => {
    this.props.setRestaurantNavigation({
      index: 0,
      routes: [{
        key: 'restaurant',
        routeName: 'restaurant'
      }]
    });
  };
  render() {
    const {
      account,
      navigation
    } = this.props;
    return (
      <LoadContent loadProps={this.props}>
        <View
          style={[
              container.container,
              container.colored,
              container.centerContent
            ]}
        >
          {account ?
            <Button
              onPress={() => navigation.navigate('restaurantScan')}
              padded
              textStyle={text.light}
            >
              {'Scan QR code'}
            </Button> :
            <Button
              onPress={() => navigation.navigate('authentication')}
              padded
              textStyle={text.light}
            >
              {I18n.t('account.authenticate')}
            </Button>
          }
        </View>
      </LoadContent>
    );
  }
}

export default compose(
  connect(mapStateToProps, {setRestaurantNavigation}),
  restaurant.getRestaurant,
  account.getActiveAccount
)(Selection);
