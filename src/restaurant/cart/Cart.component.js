import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'react-apollo';
import {get} from 'lodash/fp';
import I18n from 'react-native-i18n';
import {View, Text} from 'react-native';

import MenuItems from 'walless/restaurant/MenuItems.component';
import {getRestaurant} from 'walless-graphql/restaurant/restaurant.queries';
import container from 'walless/styles/container';
import text from 'walless/styles/text';
import colors from 'walless/styles/colors';
import Button from 'walless/components/Button.component';

const mapStateToProps = state => ({
  restaurant: get(['active', 'restaurant'])(state),
  items: get(['cart', 'items'])(state) || []
});

class Cart extends React.Component {
  static navigationOptions = {
    headerRight: <View />
  };
  render() {
    const {
      items,
      getRestaurant: {restaurant: {currency: {symbol}}} = {restaurant: {currency: {}}}
    } = this.props;
    if (items.length) {}
    return items.length ? (
      <View style={container.container}>
        <MenuItems items={items} />
        <View
            style={[
              container.padded,
              container.light,
              container.spread,
              {
                flex: 0,
                flexDirection: 'row',
                borderTopWidth: 1,
                borderColor: colors.border
              }
            ]}
        >
          <View>
            <Button onPress={() => {}}>
              {I18n.t('restaurant.cart.checkout')}
            </Button>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[text.text, text.bold]}>
              {`${I18n.t('restaurant.cart.totalPrice')}: `}
            </Text>
            <Text style={[text.text]}>
              {`${items.reduce((prev, curr) => prev + curr.price, 0)} ${symbol}`}
            </Text>
          </View>
        </View>
      </View>
    ) : (
      <View style={[container.container, container.centerContent]}>
        <Text style={[text.text, text.neutral]}>
          {I18n.t('restaurant.cart.cartIsEmpty')}
        </Text>
      </View>
    );
  }
}

export default compose(
  connect(mapStateToProps),
  getRestaurant
)(Cart);
