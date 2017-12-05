import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

import container from 'walless/styles/container';
import text from 'walless/styles/text';

export default class NavigationItem extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };
  render = () => (
    <View
      style={[container.row, container.padded, container.rowDistinct]}
      {...this.props}
    >
      <View
        style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row'
          }}
      >
        {[].concat(this.props.children).map((child, index) =>
          typeof child === 'string' ?
            <Text key={index} style={text.text}>{child}</Text>
          : <child.type {...child.props} key={index} />
        )}
      </View>
    </View>
  );
};
