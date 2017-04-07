// @flow
import React from 'react';
import {AppRegistry} from 'react-native';

import MainNavigator from './src/MainNavigator.component';

export default class Walless extends React.Component {
  render() {
    return (
      <MainNavigator />
    );
  }
}
AppRegistry.registerComponent('walless', () => Walless);
