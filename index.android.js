// @flow
import React from 'react';
import {AppRegistry} from 'react-native';

import Root from './src/Root';

export default class Walless extends React.Component {
  render() {
    return (
      <Root />
    );
  }
}

AppRegistry.registerComponent('walless', () => Walless);
