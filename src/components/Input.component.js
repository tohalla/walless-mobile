import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput
} from 'react-native';

import input from 'walless/styles/input';
import colors from 'walless/styles/colors';

export default class Input extends React.Component {
  static propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    labelStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.object]))
    ]),
    containerStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.object]))
    ]),
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.object]))
    ]),
    light: PropTypes.bool,
    Input: PropTypes.any,
    value: PropTypes.string
  };
  static defaultProps = {
    value: '',
    light: false,
    Input: TextInput
  };
  state = {
    active: false
  };
  focus = () => {
    this.input.focus();
  };
  handleFocus = () => {
    this.setState({active: true});
    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus();
    }
  };
  handleBlur = () => {
    this.setState({active: false});
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur();
    }
  };
  render() {
    const {
      label,
      containerStyle = input.container,
      labelStyle = input.label,
      style = input.input,
      light,
      Input,
      ...rest
    } = this.props;
    return (
      <View style={containerStyle}>
        <Text style={[].concat(labelStyle, light ? input.labelLight : [])}>
          {label}
        </Text>
          <Input
              {...rest}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
              ref={c => this.input = c}
              selectionColor={light ? colors.foregroundLight : colors.darkGray}
              style={[].concat(
                style,
                light && Input === TextInput ? input.inputLight : []
              )}
          />
        <View
            style={
              [{height: 2, backgroundColor: colors.darkGray}].concat(
                light ? {backgroundColor: colors.backgroundLight} : [],
                this.state.active ? [] : {opacity: .6}
              )
            }
        />
      </View>
    );
  }
}
