// @flow
import React from 'react';
import {
  ActivityIndicator,
  View
} from 'react-native';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {get} from 'lodash/fp';
import I18n from 'react-native-i18n';

import {getRestaurant} from '../graphql/restaurant/restaurant.queries';
import {getActiveAccount} from '../graphql/account/account.queries';
import Button from '../components/Button.component';
import container from '../styles/container';
import colors from '../styles/colors';

const mapStateToProps = state => ({
  restaurant: get(['active', 'restaurant'])(state)
});

class Restaurant extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const {
      getActiveAccount: {account, data: {loading}} = {data: {}},
      navigation
    } = this.props;
    if (loading) {
      return (
        <View style={[container.screenContainer, container.centerContent]}>
          <ActivityIndicator color={colors.white} />
        </View>
      );
    }
    return (
      <View style={[container.screenContainer, container.centerContent]}>
        {account ?
          <Button light onPress={() => navigation.navigate('scan')}>
            {'Scan QR code'}
          </Button> :
          <Button
              light
              onPress={() => navigation.navigate('authentication')}
          >
              {I18n.t('account.authenticate')}
          </Button>
        }
        <Button
            light
            onPress={() => navigation.navigate('browse')}
        >
            {'Browse restaurants'}
        </Button>
      </View>
    );
  }
}

export default compose(
  connect(mapStateToProps),
  getRestaurant,
  getActiveAccount
)(Restaurant);
