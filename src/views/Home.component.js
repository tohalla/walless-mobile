import React from 'react';
import {connect} from 'react-redux';
import {addNavigationHelpers} from 'react-navigation';
import {get} from 'lodash/fp';

import RestaurantNavigator from 'walless/navigation/RestaurantNavigation';

const mapStateToProps = state => ({
  navigationState: get(['navigation', 'restaurant'])(state)
});

class Home extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home'
  };
  render = () => (
    <RestaurantNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.navigationState
        })}
    />
  );
}

export default connect(mapStateToProps)(Home);
