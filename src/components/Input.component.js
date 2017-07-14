import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import {minor} from 'walless/styles/spacing';
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
      containerStyle = styles.container,
      labelStyle = styles.label,
      style = styles.input,
      light,
      Input,
      ...rest
    } = this.props;
    return (
      <View style={containerStyle}>
        <Text style={[].concat(labelStyle, light ? styles.labelLight : [])}>
          {label}
        </Text>
        <Input
            {...rest}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            ref={c => this.input = c}
            selectionColor={light ? colors.foregroundLight : colors.border}
            style={[].concat(
              style,
              light && Input === TextInput ? styles.inputLight : []
            )}
        />
        <View
            style={
              [{height: 2, backgroundColor: colors.border}].concat(
                light ? {backgroundColor: colors.backgroundLight} : [],
                this.state.active ? [] : {opacity: .6}
              )
            }
        />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    padding: '1rem',
    alignSelf: 'stretch',
    flexDirection: 'column'
  },
  input: {
    color: colors.darkGray,
    paddingVertical: minor
  },
  inputLight: {
    color: colors.foregroundLight
  },
  label: {
    color: colors.darkGray,
    fontSize: 18
  },
  labelLight: {
    color: colors.foregroundLight
  },
  dropdown: {
    height: 'auto',
    maxHeight: 200,
    minWidth: 120
  }
});

