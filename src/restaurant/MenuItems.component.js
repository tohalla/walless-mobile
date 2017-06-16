import React from 'react';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {View, Text, ListView, TouchableOpacity} from 'react-native';
import {get, isEqual} from 'lodash/fp';
import PropTypes from 'prop-types';

import {
  getMenuItemsByRestaurant
} from 'walless-graphql/restaurant/restaurant.queries';

const mapStateToProps = state => ({
  restaurant: get(['active', 'restaurant'])(state),
  language: state.translation.language
});

export class MenuItems extends React.Component {
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
  handleRenderMenuItem = menuItem => {
    const {
      information: {
        [this.props.language]: {
          name, description
        } = {}
      }
    } = menuItem;
    return (
      <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('menuItem', {menuItem})
          }
          style={{
            backgroundColor: 'white',
            borderBottomWidth: 1,
            borderColor: 'lightgray'
          }}
      >
        <View
            style={{
              backgroundColor: 'white',
              borderBottomWidth: 1,
              borderColor: 'lightgray'
            }}
        >
          <Text>{name}</Text>
          <Text>{description}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const {dataSource} = this.state;
    return (
      <View
          style={{
            height: '100%'
          }}
      >
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
  connect(mapStateToProps),
  getMenuItemsByRestaurant
)(MenuItems);
