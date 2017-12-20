import {connect} from 'react-redux';
import {VibrationIOS, View, Dimensions} from 'react-native';
import Camera from 'react-native-camera';
import EStyleSheet from 'react-native-extended-stylesheet';
import I18n from 'react-native-i18n';
import Permissions from 'react-native-permissions';
import PropTypes from 'prop-types';
import React from 'react';
import {NavigationActions} from 'react-navigation';

import {addNotification} from 'walless/notification/notifications.reducer';

const scanArea = 250;

class QRScreen extends React.Component {
  static propTypes = {
    back: PropTypes.func.isRequired,
    addNotification: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired
  };
  state = {
    camera: false,
    codeRead: false
  };
  componentDidMount = () =>
    Permissions.check('camera').then(permission => {
      if (permission === 'denied' || permission === 'restricted') {
        this.props.addNotification({
          type: 'alert',
          message: I18n.t('error.permissionCameraDenied')
        });
        this.props.back();
      } else this.setState({camera: true});
    });
  handleBarCodeRead = ({data, type, bounds: {origin, size}}) => {
    const {height, width} = Dimensions.get('window');
    if (
      !this.state.codeRead &&
      type === 'org.iso.QRCode' &&
      Math.max(size.width, size.height) <= scanArea &&
      origin.x >= (width - scanArea) / 2 &&
      origin.x <= (width + scanArea) / 2 &&
      origin.y >= (height - scanArea) / 2 &&
      origin.y <= (height + scanArea) / 2
    ) {
      this.setState({codeRead: true});
      VibrationIOS.vibrate();
      this.props.onSuccess(data);
    }
  };
  render = () =>
    this.state.camera && (
      <Camera
        aspect={Camera.constants.Aspect.fill}
        onBarCodeRead={this.handleBarCodeRead}
        playSoundOnCapture={false}
        style={styles.container}
      >
        <View style={styles.shade} />
        <View style={styles.middle}>
          <View style={styles.shade} />
          <View style={styles.area} />
          <View style={styles.shade} />
        </View>
        <View style={styles.shade} />
      </Camera>
    );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1
  },
  middle: {
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: scanArea
  },
  shade: {
    backgroundColor: 'black',
    flex: 1,
    opacity: 0.4
  },
  area: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: scanArea
  }
});

export default connect(null, {
  addNotification,
  back: NavigationActions.back
})(QRScreen);
