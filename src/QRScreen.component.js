import React from 'react';
import {VibrationIOS} from 'react-native';
import Camera from 'react-native-camera';
import PropTypes from 'prop-types';
import I18n from 'react-native-i18n';

import Button from 'walless/components/Button.component';
import button from 'walless/styles/button';

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
  handleBarCodeRead = ({data}) => {
    if (!this.state.codeRead) {
      this.setState({codeRead: true});
      VibrationIOS.vibrate();
      this.props.onSuccess(data);
    }
  };
  render = () => (
    <Camera
        aspect={Camera.constants.Aspect.fill}
        onBarCodeRead={this.handleBarCodeRead}
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}
    >
      {typeof this.props.onCancel === 'function' &&
        <Button
            onPress={(this.props.onCancel)}
            style={button.button}
        >
          {I18n.t('cancel')}
        </Button>
      }
    </Camera>
  );
}
