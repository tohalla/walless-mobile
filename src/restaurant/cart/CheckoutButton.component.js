import React from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {get} from 'lodash/fp';

import Button from 'walless/components/Button.component';
import header from 'walless/styles/header';

const mapStateToProps = state => ({
  items: get(['cart', 'items'])(state) || []
});

class CheckoutButton extends React.Component {
  render() {
    const {items} = this.props;
    return items.lenght ? (
      <Button onPress={() => {}}>
        <Text style={header.text}>
          {I18n.t('restaurant.cart.checkout')}
        </Text>
      </Button>
    ) : null;
  }
}

export default connect(
  mapStateToProps
)(CheckoutButton);
