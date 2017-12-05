import React from 'react';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {View, Text, ListView, TouchableOpacity} from 'react-native';
import {get, isEqual} from 'lodash/fp';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swipeable from 'react-native-swipeable';
import {NavigationActions} from 'react-navigation';

import {addCartItems} from 'walless/restaurant/cart.reducer';
import {menuItem} from 'walless-graphql';
import container from 'walless/styles/container';
import text from 'walless/styles/text';
import swipe from 'walless/styles/swipe';
import colors from 'walless/styles/colors';

const mapStateToProps = state => ({
  restaurant: get(['servingLocation', 'restaurant'])(state),
  language: state.translation.language
});

class MenuItems extends React.Component {
  static propTypes = {
    menuItemActions: PropTypes.arrayOf(PropTypes.shape({
      onPress: PropTypes.func.isRequired,
      label: PropTypes.string.isRequired
    })),
    restaurant: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    items: PropTypes.arrayOf(PropTypes.object),
    menu: PropTypes.object,
    allowEdit: PropTypes.bool,
    swipeable: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    listViewProps: PropTypes.object,
    getMenuItemsByRestaurant: PropTypes.object,
    addCartItems: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    menuItems: PropTypes.array,
    language: PropTypes.string
  };
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => !isEqual(r1)(r2)
    });
    const menu = props.menu || get(['navigation', 'state', 'params', 'menu'])(props);
    this.state = {
      dataSource: dataSource.cloneWithRows(
        Array.isArray(props.items) ?
          props.items
        : menu && typeof menu === 'object' ?
          menu.menuItems
        : Array.isArray(props.menuItems) ?
          props.menuItems
        : []
      )
    };
  };
  componentWillReceiveProps(newProps) {
    if (!isEqual(this.props.getMenuItemsByRestaurant)(newProps.getMenuItemsByRestaurant)) {
      const menu = newProps.menu || get(['navigation', 'state', 'params', 'menu'])(newProps);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(
          Array.isArray(newProps.items) ?
            newProps.items
          : menu && typeof menu === 'object' ?
            menu.menuItems
          : Array.isArray(newProps.menuItems) ?
            newProps.menuItems
          : []
        )
      });
    }
  };
  handleAddToCart = menuItem =>
    this.props.addCartItems(menuItem);
  handleItemPress = menuItem => () =>
    this.props.navigate({
      routeName: 'menuItem',
      params: {
        menuItem,
        allowEdit: this.props.allowEdit,
        actions: this.props.menuItemActions
      }
    });
  handleRenderItem = (menuItem, sectionId, rowId) => {
    const {
      i18n: {
        [this.props.language]: {
          name
        } = {}
      },
      price,
      currency: {symbol}
    } = menuItem;
    const swipeable = typeof this.props.swipeable === 'function' ?
      this.props.swipeable({menuItem, rowId}) : swipeable || {
        leftContent: (
          <View style={[swipe.content, swipe.action, {alignItems: 'flex-end'}]}>
            <Icon
              color={colors.foregroundLight}
              name='add-shopping-cart'
              size={20}
            />
          </View>
        ),
        onLeftActionRelease: () => this.handleAddToCart(menuItem)
      };
    return (
      <Swipeable
        onSwipeRelease={() => this.setState({isSwiping: false})}
        onSwipeStart={() => this.setState({isSwiping: true})}
        {...swipeable}
      >
        <TouchableOpacity
          onPress={this.handleItemPress(menuItem)}
          style={[container.row, container.rowDistinct, container.padded]}
        >
          <View style={{flex: 1}}>
            <Text style={[text.text, text.medium, text.bold]}>{name}</Text>
          </View>
          <View style={{justifyContent: 'center', flex: 0}}>
            <Text style={text.text}>{`${price} ${symbol}`}</Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };
  render() {
    const {dataSource, isSwiping} = this.state;
    return (
      <ListView
        dataSource={dataSource}
        enableEmptySections
        renderRow={this.handleRenderItem}
        scrollEnabled={!isSwiping}
        style={container.container}
        {...this.props.listViewProps}
      />
    );
  }
}


export default compose(
  connect(mapStateToProps, {
    addCartItems,
    navigate: NavigationActions.navigate
  }),
  menuItem.getMenuItemsByRestaurant
)(MenuItems);
