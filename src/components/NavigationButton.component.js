import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from 'walless/components/Button.component';
import colors from 'walless/styles/colors';
import container from 'walless/styles/container';

export default class NavigationButton extends React.Component {
  static PropTypes = {
    children: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onPress: PropTypes.func.isRequired
  };
  static defaultProps = {
    disabled: false
  };
  render = () => (
    <Button
        {...this.props}
        style={[container.row, container.padded, container.rowDistinct]}
    >
      <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row'
          }}
      >
        <Text>{this.props.children}</Text>
        <Icon
            color={colors.lightGray}
            name="chevron-right"
            size={20}
        />
      </View>
    </Button>
  );
};
