import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import {get} from 'lodash/fp';
import {NavigationActions} from 'react-navigation';

import Button from 'walless/components/Button.component';
import header from 'walless/styles/header';
import button from 'walless/styles/button';
import colors from 'walless/styles/colors';

const mapStateToProps = state => ({
  items: get(['cart', 'items'])(state) || []
});

class CartButton extends React.Component {
  render() {
    const {items} = this.props;
    return (
      <Button
          onPress={() => this.props.navigate({routeName: 'cart'})}
          style={button.padded}
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
