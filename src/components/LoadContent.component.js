import React from 'react';
import PropTypes from 'prop-types';
import {find} from 'lodash/fp';
import {ActivityIndicator, View} from 'react-native';

import colors from 'walless/styles/colors';
import container from 'walless/styles/container';

export default class LoadContent extends React.Component {
  static PropTypes = {
    loading: PropTypes.bool,
    loadProps: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired
  }
  render() {
    const loading = this.props.loading || Boolean(find(prop =>
        prop && prop.loading
      )(this.props.loadProps));
    return loading ? (
      <View style={[container.container, container.colored, container.centerContent]}>
        <ActivityIndicator color={colors.white} />
      </View>
    ) : this.props.children;
  }
}
