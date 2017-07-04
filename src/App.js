// @flow
import React from 'react';
import {AsyncStorage} from 'react-native';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {get} from 'lodash/fp';
import I18n from 'react-native-i18n';
import {StatusBar, View, Linking} from 'react-native';

import container from 'walless/styles/container';
import {parse} from 'walless/util/link';
import MainNavigation, {routes} from 'walless/navigation/MainNavigation';
import {getActiveAccount} from 'walless/graphql/account/account.queries';
import Authentication from 'walless/account/Authentication.component';
import {authenticate} from 'walless/util/auth';
import LoadContent from 'walless/components/LoadContent.component';
import {connectToServingLocation} from 'walless/restaurant/servingLocation.reducer';
import Notifications from 'walless/notification/Notifications.component';

const mapStateToProps = state => ({
  servingLocation: state.servingLocation,
  notification: state.notification
});

class App extends React.Component {
  state = {loading: false};
  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL);
  }
  componentWillReceiveProps = async(newProps) => {
    if (
      !newProps.account &&
      !get(['getActiveAccount', 'loading'])(newProps)
    ) {
      const [[, refreshToken], [, clientId]] =
        await AsyncStorage.multiGet(['refresh-token', 'client-id']);
      if (refreshToken && clientId) {
        this.setState({loading: true});
        await authenticate();
        await newProps.getActiveAccount.refetch();
        this.setState({loading: false});
      }
    }
  }
  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }
  handleOpenURL = event => {
    const {path, value} = parse(event.url);
    if (path === 'serving-location') {
      this.props.connectToServingLocation(value);
    }
  };
  render() {
    const {
      account
    } = this.props;
    return (
      <View style={container.container}>
        <StatusBar barStyle="light-content" />
        <LoadContent loadProps={this.props} loading={this.state.loading}>
          {
            account ?
              <MainNavigation
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
              /> : <Authentication />
        }
        </LoadContent>
        <Notifications />
      </View>
    );
  }
}

export default compose(
  connect(mapStateToProps, dispatch => ({
    connectToServingLocation: value => dispatch(connectToServingLocation(value)),
    dispatch
  })),
  getActiveAccount
)(App);
