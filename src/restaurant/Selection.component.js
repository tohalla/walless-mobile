// @flow
import React from 'react';
import {View} from 'react-native';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {get} from 'lodash/fp';
import I18n from 'react-native-i18n';

import {NavigationActions} from 'react-navigation';
import {getRestaurant} from 'walless-graphql/restaurant/restaurant.queries';
import {getActiveAccount} from 'walless-graphql/account/account.queries';
import Button from 'walless/components/Button.component';
import container from 'walless/styles/container';
import button from 'walless/styles/button';
import text from 'walless/styles/text';
import LoadContent from 'walless/components/LoadContent.component';

const mapStateToProps = state => ({
  restaurant: get(['servingLocation', 'restaurant'])(state)
});

class Selection extends React.Component {
  static navigationOptions = {
    header: null
  };
  componentWillReceiveProps(newProps) {
    if (newProps.restaurant) {
      newProps.navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'restaurantHome'})
        ]
      }));
    }
  }
  render() {
    const {
      account,
      navigation
    } = this.props;
    return (
      <LoadContent loadProps={this.props}>
        <View style={[container.container, container.colored, container.centerContent]}>
          {account ?
            <Button
                onPress={() => {
                  navigation.navigate('scan');
                }}
                style={button.padded}
                textStyle={text.light}
            >
              {'Scan QR code'}
            </Button> :
            <Button
                onPress={() => navigation.navigate('authentication')}
                style={button.padded}
                textStyle={text.light}
            >
                {I18n.t('account.authenticate')}
            </Button>
          }
          <Button
              onPress={() => navigation.navigate('browse')}
              style={button.padded}
              textStyle={text.light}
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
)(Selection);
