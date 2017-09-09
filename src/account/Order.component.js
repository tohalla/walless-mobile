import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import {get} from 'lodash/fp';
import {connect} from 'react-redux';

import MenuItems from 'walless/restaurant/MenuItems.component';
import container from 'walless/styles/container';

const mapStateToProps = state => ({
  language: state.translation.language
});

class Order extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: get([
      'state',
      'params',
      'order',
      'id'
    ]
    )(navigation)
  });
  render() {
    const {
      order = get(['navigation', 'state', 'params', 'order'])(this.props)
    } = this.props;
    const {
      items = []
    } = order;
    return (
      <ScrollView
          alwaysBounceVertical={false}
          style={[container.container, container.light]}
      >
        <MenuItems items={items.map(item => item.menuItem)} />
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(Order);
