import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'react-apollo';
import {get, pullAt} from 'lodash/fp';
import Icon from 'react-native-vector-icons/MaterialIcons';
import I18n from 'react-native-i18n';
import {View, Text, StyleSheet} from 'react-native';

import MenuItems from 'walless/restaurant/MenuItems.component';
import {getRestaurant} from 'walless-graphql/restaurant/restaurant.queries';
import {createOrder} from 'walless-graphql/restaurant/order.mutations';
import container from 'walless/styles/container';
import {setCartItems} from 'walless/restaurant/cart.reducer';
import {getActiveAccount} from 'walless/graphql/account/account.queries';
import text from 'walless/styles/text';
import button from 'walless/styles/button';
import colors from 'walless/styles/colors';
import swipe from 'walless/styles/swipe';
import Button from 'walless/components/Button.component';
import {addNotification} from 'walless/notification/notification.reducer';

const mapStateToProps = state => ({
  restaurant: get(['servingLocation', 'restaurant'])(state),
  servingLocation: get(['servingLocation', 'servingLocation'])(state),
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
      account
    } = this.props;
    try {
      await createOrder(
        {
          createdBy: account.id,
          restaurant: restaurant.id,
          servingLocation: servingLocation
        },
        items.map(item => item.id)
      );
      setCartItems([]);
    } catch (error) {
      throw new Error(error);
    }
  };
  render() {
    const {
      items,
      restaurant: {currency: {symbol}} = {currency: {}}
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
                      color={colors.foregroundLight}
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
              container.light,
              container.spread,
              {
                flex: 0,
                flexDirection: 'row',
                borderTopWidth: StyleSheet.hairlineWidth,
                borderColor: colors.border
              }
            ]}
        >
          <View>
            <Button onPress={this.handleCreateOrder} style={button.padded}>
              {I18n.t('restaurant.cart.checkout')}
            </Button>
          </View>
          <View style={[container.padded, {flexDirection: 'row'}]}>
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
  connect(mapStateToProps, {setCartItems, addNotification}),
  getRestaurant,
  createOrder,
  getActiveAccount
)(Cart);
