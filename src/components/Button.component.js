import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';

import button from 'walless/styles/button';
import text from 'walless/styles/text';

export default class Button extends React.Component {
  static PropTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired,
    onPress: PropTypes.func.isRequired,
    style: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.object),
      PropTypes.object
    ]),
    textStyle: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.object),
      PropTypes.object
    ])
  };
  render() {
    const {
      onPress,
      children,
      style,
      textStyle,
      ...rest
    } = this.props;
    return (
      <TouchableOpacity
          onPress={onPress}
          style={[button.button].concat(style)}
          {...rest}
      >
        {typeof children === 'string' ?
          <Text style={[text.button].concat(textStyle)}>
            {children}
          </Text> : children
        }
      </TouchableOpacity>
    );
  }
};
