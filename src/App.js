// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {AsyncStorage} from 'react-native';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {addNavigationHelpers} from 'react-navigation';
import {get, isEqual, isEmpty} from 'lodash/fp';
import I18n from 'react-native-i18n';
import {StatusBar, View, Linking} from 'react-native';
import {account} from 'walless-graphql';

import {initializeNotificationHandler} from 'walless/util/wsNotificationHandler';
import {setRestaurantNavigation} from 'walless/navigation/navigation.actions';
import container from 'walless/styles/container';
import {parse} from 'walless/util/link';
import MainNavigation, {routes} from 'walless/navigation/MainNavigation';
import Authentication from 'walless/account/Authentication.component';
import {authenticate} from 'walless/util/auth';
import LoadContent from 'walless/components/LoadContent.component';
import {connectToServingLocation} from 'walless/restaurant/servingLocation.reducer';
import Notifications from 'walless/notification/Notifications.component';

const mapStateToProps = state => ({
  navigationState: get(['navigation', 'main'])(state),
  servingLocation: state.servingLocation,
  notifications: state.notifications
});

class App extends React.Component {
  static propTypes = {
    account: PropTypes.object,
    connectToServingLocation: PropTypes.func.isRequired,
    setRestaurantNavigation: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    navigationState: PropTypes.object
  };
  state = {loading: false};
  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL);
  }
  componentWillReceiveProps = async(newProps) => {
    if (
      !isEqual(newProps.account)(this.props.account) &&
      !get(['getActiveAccount', 'loading'])(this.props) &&
      !get(['getActiveAccount', 'loading'])(newProps)
    ) {
      if (isEmpty(newProps.account)) {
        initializeNotificationHandler();
      } else {
        const [[, refreshToken], [, clientId]] =
          await AsyncStorage.multiGet(['refresh-token', 'client-id']);
        if (refreshToken && clientId) {
          this.setState({loading: true});
          await authenticate();
          this.setState({loading: false});
        }
      }
    }
  };
  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }
  handleOpenURL = async(event) => {
    const {path, value} = parse(event.url);
    if (path === 'serving-location') {
      await this.props.connectToServingLocation(value);
    }
    this.props.setRestaurantNavigation({
      index: 0,
      routes: [{
        key: 'restaurant',
        routeName: 'restaurant'
      }]
    });
  };
  render() {
    const {account} = this.props;
    return (
      <View style={container.container}>
        <StatusBar barStyle='light-content' />
        <LoadContent loadProps={this.props} loading={this.state.loading}>
          {isEmpty(account) ? <Authentication /> :
          <MainNavigation
            navigation={addNavigationHelpers({
              state: this.props.navigationState,
              dispatch: this.props.dispatch
            })}
            ref={c => this.navigation = c}
            screenProps={{
                  titles: Object.keys(routes).reduce((prev, key) =>
                    Object.assign(
                      {},
                      prev,
                      {[key]: routes[key].translationKey ?
                        I18n.t(routes[key].translationKey) : null
                      }
                    ), {}
                  )
                }}
            />
        }
        </LoadContent>
        <Notifications />
      </View>
    );
  }
}

export default compose(
  connect(mapStateToProps, dispatch => ({
    connectToServingLocation: payload => dispatch(connectToServingLocation(payload)),
    setRestaurantNavigation: payload => dispatch(setRestaurantNavigation(payload)),
    dispatch
  })),
  account.getActiveAccount
)(App);
