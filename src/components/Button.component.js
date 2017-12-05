import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

import colors from 'walless/styles/colors';
import {normal} from 'walless/styles/spacing';

export default class Button extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
    padded: PropTypes.bool,
    style: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.object])),
      PropTypes.object
    ]),
    textStyle: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.object])),
      PropTypes.object
    ])
  };
  static defaultProps = {
    disabled: false
  };
  render() {
    const {
      onPress,
      children,
      style,
      padded,
      textStyle,
      disabled,
      ...rest
    } = this.props;
    return (
      <View style={disabled ? styles.disabled : []}>
        <TouchableOpacity
          disabled={disabled}
          onPress={onPress}
          style={[styles.button].concat(
              style,
              padded ? styles.padded : []
            )}
          {...rest}
        >
          {typeof children === 'string' ?
            <Text style={[styles.text].concat(textStyle)}>
              {children}
            </Text> : children
          }
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = EStyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  disabled: {opacity: 0.5},
  padded: {padding: normal},
  text: {
    fontSize: 18,
    color: colors.link
  }
});
