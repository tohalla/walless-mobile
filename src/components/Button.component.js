import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';

import button from '../styles/button';

export default class Button extends React.Component {
  static PropTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired,
    light: PropTypes.bool,
    onPress: PropTypes.func.isRequired
  }
  render() {
    const {onPress, children, light, ...rest} = this.props;
    return (
      <TouchableOpacity
          onPress={onPress}
          style={button.button}
          {...rest}
      >
        <Text style={[button.buttonText, light && button.buttonTextLight]}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
};
