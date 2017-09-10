import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import colors from 'walless/styles/colors';
import text from 'walless/styles/text';
import {normal, minor} from 'walless/styles/spacing';

export default class Header extends React.Component {
  static propTypes ={
    label: PropTypes.node
  };
  render() {
    const {label} = this.props;
    return (
      <View style={styles.header}>
        {typeof label === 'string' ?
          <Text style={text.text}>
            {label}
          </Text> : label
        }
      </View>
    );
  }
};

const styles = EStyleSheet.create({
  header: {
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: minor,
    paddingHorizontal: normal,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border
  }
});
