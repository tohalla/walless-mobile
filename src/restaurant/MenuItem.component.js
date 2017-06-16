import React from 'react';
import {View, Text} from 'react-native';
import {get} from 'lodash/fp';

export default class MenuItem extends React.Component {
  render() {
    const {
      menuItem = get(['navigation', 'state', 'params', 'menuItem'])(this.props)
    } = this.props;
    return (
      <View>
        <Text>{menuItem.name}</Text>
      </View>
    );
  }
}
