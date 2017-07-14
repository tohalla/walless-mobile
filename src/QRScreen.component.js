import React from 'react';
import {VibrationIOS, View, Dimensions} from 'react-native';
import Camera from 'react-native-camera';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

const scanArea = 250;

export default class QRScreen extends React.Component {
  static propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onCancel: PropTypes.func
  };
  componentWillMount() {
    this.state = {
      codeRead: false
    };
  };
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
  render = () => (
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
