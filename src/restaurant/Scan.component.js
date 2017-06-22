import React from 'react';
import {NavigationActions} from 'react-navigation';
import {Linking} from 'react-native';

import QRScreen from 'walless/QRScreen.component';
import {isValid} from 'walless/util/link';

export default class Scan extends React.Component {
  static navigationOptions = {
    header: null
  };
  handleBarCodeRead = async(data) => {
    await Linking.openURL(data);
  }
  reset = () => this.props.navigation.dispatch(NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({routeName: 'restaurantHome'})
    ]
  }));
  // render = () => <View />
  render = () => (
    <QRScreen
        onSuccess={this.handleBarCodeRead}
    />
   );
};
