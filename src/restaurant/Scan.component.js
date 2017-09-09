import React from 'react';
import {Linking} from 'react-native';

import QRScreen from 'walless/QRScreen.component';

export default class Scan extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'transparent',
      position: 'absolute',
      shadowColor: 'transparent',
      borderBottomWidth: 0,
      top: 0,
      left: 0,
      right: 0
    },
    headerRight: null
  };
  handleBarCodeRead = async(data) => {
    await Linking.openURL(data);
  }
  render = () => (
    <QRScreen
        onSuccess={this.handleBarCodeRead}
    />
   );
};
