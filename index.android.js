// @flow
import React from 'react';
import {AppRegistry} from 'react-native';

import App from './src/app';

export default class Walless extends React.Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('walless', () => Walless);
