import React from 'react';
import {connect} from 'react-redux';
import {get} from 'lodash/fp';
import I18n from 'react-native-i18n';
import {View, Text} from 'react-native';

import MenuItems from 'walless/restaurant/MenuItems.component';
import container from 'walless/styles/container';
import text from 'walless/styles/text';
import CheckoutButton from 'walless/restaurant/cart/CheckoutButton.component';

const mapStateToProps = state => ({
  items: get(['cart', 'items'])(state) || []
});

class Cart extends React.Component {
  static navigationOptions = {
    headerRight: <CheckoutButton />
  };
  render() {
    const {items} = this.props;
    return (
      <View style={container.container}>
        {items.length ?
          <MenuItems items={items} /> :
          <View style={[container.container, container.centerContent]}>
            <Text style={[text.text, text.neutral]}>
              {I18n.t('restaurant.cart.cartIsEmpty')}
            </Text>
          </View>
        }
      </View>
    );
  }
}

export default connect(mapStateToProps)(Cart);
