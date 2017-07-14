// @flow
import {TabNavigator} from 'react-navigation';

export const initialRouteName = 'orders';

export const restaurantRoutes = {
  [initialRouteName]: {
    screen: () => null,
    translationKey: 'restaurant.order.orders'
  }
};

const OrdersNavigation = new TabNavigator(
  restaurantRoutes,
  {initialRouteName}
);

export default OrdersNavigation;
