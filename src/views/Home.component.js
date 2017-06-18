import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'react-apollo';
import {addNavigationHelpers} from 'react-navigation';
import {get} from 'lodash/fp';
import I18n from 'react-native-i18n';

import {getRestaurant} from 'walless-graphql/restaurant/restaurant.queries';
import RestaurantNavigator, {restaurantRoutes} from 'walless/navigation/RestaurantNavigation';

const mapStateToProps = state => ({
  navigationState: get(['navigation', 'restaurant'])(state),
  restaurant: get(['active', 'restaurant'])(state),
  language: state.translation.language
});

class Home extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home'
  };
  render() {
    const {
      getRestaurant: {
        restaurant: {
          information: {
            [this.props.language]: {
              name
            } = {}
          }
        },
        data: {loading}
      } = {data: {}, restaurant: {information: {}}}
    } = this.props;
    return loading ? null : (
    <RestaurantNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.navigationState,
          language: this.props.language,
          titles: Object.assign(
            Object.keys(restaurantRoutes).reduce((prev, key) =>
              Object.assign(
                {},
                prev,
                {[key]: restaurantRoutes[key].translationKey ?
                  I18n.t(restaurantRoutes[key].translationKey) : null
                }
              ), {}
            ),
            {home: name}
          )
        })}
    />
  );
  }
}

export default compose(
  connect(mapStateToProps),
  getRestaurant
)(Home);
