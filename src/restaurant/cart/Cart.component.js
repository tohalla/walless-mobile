import React from 'react';
import {connect} from 'react-redux';
import {get} from 'lodash/fp';
import {View} from 'react-native';

import MenuItems from 'walless/restaurant/MenuItems.component';
import container from 'walless/styles/container';
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
      <View style={[container.container, container.light]}>
        <MenuItems items={items} />
      </View>
    );
  }
}

export default connect(mapStateToProps)(Cart);
