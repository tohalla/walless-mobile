import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'react-apollo';
import {get, pullAt} from 'lodash/fp';
import Icon from 'react-native-vector-icons/MaterialIcons';
import I18n from 'react-native-i18n';
import {View, Text} from 'react-native';

import MenuItems from 'walless/restaurant/MenuItems.component';
import {getRestaurant} from 'walless-graphql/restaurant/restaurant.queries';
import {
  createOrder,
  createOrderMenuItem
} from 'walless-graphql/restaurant/order.mutations';
import container from 'walless/styles/container';
import {setCartItems} from 'walless/restaurant/cart.reducer';
import {getActiveAccount} from 'walless/graphql/account/account.queries';
import text from 'walless/styles/text';
import colors from 'walless/styles/colors';
import swipe from 'walless/styles/swipe';
import Button from 'walless/components/Button.component';

const mapStateToProps = state => ({
  restaurant: get(['active', 'restaurant'])(state),
  servingLocation: get(['active', 'servingLocation'])(state),
  items: get(['cart', 'items'])(state) || []
});

class Cart extends React.Component {
  static navigationOptions = {
    headerRight: <View />
  };
  handleDeleteItem = index => {
    const {setCartItems, items} = this.props;
    setCartItems(pullAt(index)(items));
  };
  handleCreateOrder = async() => {
    const {
      setCartItems,
      items,
      servingLocation,
      restaurant,
      createOrder,
      createOrderMenuItem,
      getActiveAccount: {account}
    } = this.props;
    try {
      const {data: {createOrder: {order}}} = await createOrder({
        createdBy: account.id,
        restaurant,
        servingLocation
      });
      await Promise.all(
        items.map(item => createOrderMenuItem({menuItem: item.id, order: order.id}))
      );
      setCartItems([]);
    } catch (error) {
      throw new Error(error);
    }
  };
  render() {
    const {
      items,
      getRestaurant: {restaurant: {currency: {symbol}}} = {restaurant: {currency: {}}}
    } = this.props;
    if (items.length) {}
    return items.length ? (
      <View style={container.container}>
        <MenuItems
            items={items}
            swipeable={({rowId}) => ({
              rightContent: (
                <View style={[swipe.content, swipe.alert, {alignItems: 'flex-start'}]}>
                  <Icon
                      color={colors.carrara}
                      name="remove-shopping-cart"
                      size={20}
                  />
                </View>
              ),
              onRightActionRelease: () => this.handleDeleteItem(rowId)
            })}
        />
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
            <Button onPress={this.handleCreateOrder}>
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
  connect(mapStateToProps, {setCartItems}),
  getRestaurant,
  createOrder,
  createOrderMenuItem,
  getActiveAccount
)(Cart);
