import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import {get} from 'lodash/fp';
import {NavigationActions} from 'react-navigation';

import Button from 'walless/components/Button.component';
import header from 'walless/styles/header';
import colors from 'walless/styles/colors';

const mapStateToProps = state => ({
  items: get(['cart', 'items'])(state) || [],
  routes: get(['navigation', 'restaurant', 'routes'])(state)
});

class CartButton extends React.Component {
  render() {
    const {items, routes} = this.props;
    return (
      routes[Math.max(routes.length - 1, 0)].routeName === 'cart' ||
      routes[Math.max(routes.length - 2, 0)].routeName === 'cart'
    ) ? <View /> : (
      <Button
          onPress={() => this.props.navigate({routeName: 'restaurantCart'})}
          padded
      >
        <Icon
            color={colors.headerForeground}
            name="shopping-cart"
            size={20}
        />
        {items.length ?
          <View style={header.cartItems}>
            <Text style={{color: colors.headerBackground}}>
              {items.length > 99 ? '*' : items.length}
            </Text>
          </View> : null
        }
      </Button>
    );
  }
}

export default connect(
  mapStateToProps,
  {navigate: NavigationActions.navigate}
)(CartButton);
