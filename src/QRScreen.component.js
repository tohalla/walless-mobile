import React from 'react';
import {
  VibrationIOS,
  TouchableOpacity,
  Text
} from 'react-native';
import Camera from 'react-native-camera';
import PropTypes from 'prop-types';
import I18n from 'react-native-i18n';

import button from 'walless/styles/button';

export default class QRScreen extends React.Component {
  static propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onCancel: PropTypes.func
  };
  handleBarCodeRead = data => {
    VibrationIOS.vibrate();
    this.props.onSuccess(data);
  };
  render = () => (
    <Camera
        aspect={Camera.constants.Aspect.fill}
        barCodeTypes={['qr']}
        onBarCodeRead={this.handleBarCodeRead}
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}
    >
      {typeof this.props.onCancel === 'function' &&
        <TouchableOpacity
            onPress={(this.props.onCancel)}
            style={button.button}
        >
          <Text style={button.buttonText}>
            {I18n.t('cancel')}
          </Text>
        </TouchableOpacity>
      }
    </Camera>
  );
}
