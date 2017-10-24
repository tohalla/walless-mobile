import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'react-apollo';
import {get, pullAt} from 'lodash/fp';
import Icon from 'react-native-vector-icons/MaterialIcons';
import I18n from 'react-native-i18n';
import {View, Text, StyleSheet} from 'react-native';
import {restaurant, order, account} from 'walless-graphql';

import MenuItems from 'walless/restaurant/MenuItems.component';
import container from 'walless/styles/container';
import {setCartItems} from 'walless/restaurant/cart.reducer';
import text from 'walless/styles/text';
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
  handleCreateOrder = async () => {
    const {
      addNotification,
      setCartItems,
      servingLocation,
      restaurant,
      createOrder,
      account
    } = this.props;
    try {
      const orderItemsWithOptions = this.props.items.map(item => Object.assign(
        {item: item.id},
        get(['orderOptions', 'length'])(item) ? {options: item.orderOptions} : {}
      ));
      await createOrder(
        {
          createdBy: account.id,
          restaurant: restaurant.id,
          servingLocation: servingLocation
        },
        orderItemsWithOptions
      );
      addNotification({
        type: 'success',
        message: I18n.t('notifications.orderPlaced')
      });
      setCartItems([]);
    } catch (error) {
      throw new Error(error);
    }
  };
  render() {
    const {
      items,
      restaurant
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
            <Button onPress={this.handleCreateOrder} padded>
              {I18n.t('restaurant.cart.checkout')}
            </Button>
          </View>
          <View style={[container.padded, {flexDirection: 'row'}]}>
            <Text style={[text.text, text.bold]}>
              {`${I18n.t('restaurant.cart.totalPrice')}: `}
            </Text>
            <Text style={[text.text]}>
              {
                items.reduce((prev, curr) => prev + curr.price, 0).toString()
                + ` ${get(['currency', 'symbol'])(restaurant)}`
              }
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
  restaurant.getRestaurant,
  order.createOrder,
  account.getActiveAccount
)(Cart);
