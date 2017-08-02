import React from 'react';
import {ListView, Text, TouchableOpacity} from 'react-native';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {isEqual} from 'lodash/fp';
import {NavigationActions} from 'react-navigation';

import text from 'walless/styles/text';
import container from 'walless/styles/container';
import {getActiveAccount} from 'walless-graphql/account/account.queries';
import {getOrdersByAccount} from 'walless-graphql/restaurant/order.queries';

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => !isEqual(r1)(r2)
      })
    };
  };
  componentWillReceiveProps(newProps) {
    if (!isEqual(this.props.getOrdersByAccount)(newProps.getOrdersByAccount)) {
      this.setState({
        dataSource: Array.isArray(newProps.orders) ?
          this.state.dataSource.cloneWithRows(newProps.orders) :
          this.state.dataSource.cloneWithRows([])
      });
    }
  };
  handleItemPress = order => () => {
    this.props.navigate({routeName: 'order', params: {order}});
  };
  handleRenderItem = order => {
    const {createdAt} = order;
    return (
      <TouchableOpacity
          onPress={this.handleItemPress(order)}
          style={[container.row, container.rowDistinct, container.padded]}
      >
        <Text style={text.text}>{createdAt}</Text>
      </TouchableOpacity>
    );
  };
  render() {
    const {dataSource} = this.state;
    return (
      <ListView
          dataSource={dataSource}
          enableEmptySections
          renderRow={this.handleRenderItem}
      />
    );
  }
}

export default compose(
  connect(null, {navigate: NavigationActions.navigate}),
  getActiveAccount,
  getOrdersByAccount
)(Orders);
