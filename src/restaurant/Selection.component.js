// @flow
import React from 'react';
import {View} from 'react-native';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {get} from 'lodash/fp';
import I18n from 'react-native-i18n';

import {getRestaurant} from 'walless-graphql/restaurant/restaurant.queries';
import {getActiveAccount} from 'walless-graphql/account/account.queries';
import Button from 'walless/components/Button.component';
import container from 'walless/styles/container';
import LoadContent from 'walless/components/LoadContent.component';

const mapStateToProps = state => ({
  restaurant: get(['active', 'restaurant'])(state)
});

class Restaurant extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const {
      getActiveAccount: {account} = {},
      navigation
    } = this.props;
    return (
      <LoadContent loadProps={this.props}>
        <View style={[container.screenContainer, container.centerContent]}>
          {account ?
            <Button
                light
                onPress={() => {
                  navigation.navigate('scan');
                }}
            >
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
      </LoadContent>
    );
  }
}

export default compose(
  connect(mapStateToProps),
  getRestaurant,
  getActiveAccount
)(Restaurant);
