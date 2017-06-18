import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';

import button from 'walless/styles/button';

export default class Button extends React.Component {
  static PropTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired,
    light: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
    padded: PropTypes.bool
  };
  static defaultProps = {
    padded: true
  };
  render() {
    const {onPress, children, padded, light, ...rest} = this.props;
    return (
      <TouchableOpacity
          onPress={onPress}
          style={[button.button].concat(padded ? button.padded : [])}
          {...rest}
      >
        {typeof children === 'string' ?
          <Text style={[button.buttonText, light ? button.buttonTextLight : button.buttonText]}>
            {children}
          </Text> : children
        }
      </TouchableOpacity>
    );
  }
};
