import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import {get} from 'lodash/fp';

import Button from 'walless/components/Button.component';
import header from 'walless/styles/header';
import colors from 'walless/styles/colors';

const mapStateToProps = state => ({
  items: get(['cart', 'items'])(state) || [],
  routes: get(['navigation', 'restaurant', 'routes'])(state)
});

class CartButton extends React.Component {
  static propTypes = {
    items: PropTypes.array,
    routes: PropTypes.arrayOf(PropTypes.shape({routeName: PropTypes.string})),
    navigation: PropTypes.shape({navigate: PropTypes.func})
  };
  render() {
    const {items, routes, navigation, ...props} = this.props;
    return (
      routes[Math.max(routes.length - 1, 0)].routeName === 'cart' ||
      routes[Math.max(routes.length - 2, 0)].routeName === 'cart'
    ) ? <View /> : (
      <Button
        onPress={() => navigation.navigate('restaurantCart')}
        {...props}
      >
        <Icon
          color={colors.headerForeground}
          name='shopping-cart'
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
)(CartButton);
