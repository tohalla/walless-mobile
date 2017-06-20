import React from 'react';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {View, Text, ListView, TouchableOpacity} from 'react-native';
import {get, isEqual} from 'lodash/fp';
import PropTypes from 'prop-types';
import {NavigationActions} from 'react-navigation';

import {
  getMenuItemsByRestaurant
} from 'walless-graphql/restaurant/restaurant.queries';
import container from 'walless/styles/container';
import text from 'walless/styles/text';

const mapStateToProps = state => ({
  restaurant: get(['active', 'restaurant'])(state),
  language: state.translation.language,
  navigat: state.navigation
});

class MenuItems extends React.Component {
  static PropTypes = {
    restaurant: PropTypes.object.isRequired,
    items: PropTypes.arrayOf(PropTypes.object),
    menu: PropTypes.object
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
        : Array.isArray(get(['getMenuItemsByRestaurant', 'menuItems'])(props)) ?
          props.getMenuItemsByRestaurant.menuItems
        : []
      )
    };
  };
  componentWillReceiveProps(newProps) {
    if (!isEqual(this.props.getMenuItemsByRestaurant)(newProps.getMenuItemsByRestaurant)) {
      const menu = newProps.menu || get(['navigation', 'state', 'params', 'menu'])(newProps);
      this.setState({
        dataSource:
          this.state.dataSource.cloneWithRows(
            Array.isArray(newProps.items) ?
              newProps.items
            : menu && typeof menu === 'object' ?
              menu.menuItems
            : Array.isArray(get(['getMenuItemsByRestaurant', 'menuItems'])(newProps)) ?
              newProps.getMenuItemsByRestaurant.menuItems
            : []
          )
      });
    }
  };
  handleMenuItemPress = menuItem => () => {
    this.props.navigate({routeName: 'menuItem', params: {menuItem}});
  };
  handleRenderMenuItem = menuItem => {
    const {
      information: {
        [this.props.language]: {
          name, description
        } = {}
      },
      price,
      currency: {symbol}
    } = menuItem;
    return (
      <TouchableOpacity
          onPress={this.handleMenuItemPress(menuItem)}
          style={[container.row, container.padded]}
      >
        <View>
          <Text style={[text.text, text.medium, text.bold]}>{name}</Text>
          <Text style={text.text}>{description}</Text>
        </View>
        <View style={{justifyContent: 'center', marginLeft: 'auto'}}>
          <Text style={text.text}>{`${price} ${symbol}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const {dataSource} = this.state;
    return (
      <View style={[container.container, container.default]}>
        <ListView
            dataSource={dataSource}
            enableEmptySections
            renderRow={this.handleRenderMenuItem}
        />
      </View>
    );
  }
}

export default compose(
  connect(mapStateToProps, {navigate: NavigationActions.navigate}),
  getMenuItemsByRestaurant
)(MenuItems);
