import React from 'react';
import {NavigationActions} from 'react-navigation';
import {Linking} from 'react-native';

import QRScreen from 'walless/QRScreen.component';

export default class Scan extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'transparent',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0
    },
    headerRight: null
  };
  handleBarCodeRead = async(data) => {
    await Linking.openURL(data);
  }
  reset = () => this.props.navigation.dispatch(NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({routeName: 'restaurant'})
    ]
  }));
  render = () => (
    <QRScreen
        onSuccess={this.handleBarCodeRead}
    />
   );
};
