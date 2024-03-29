import React from 'react';
import PropTypes from 'prop-types';
import {ListView, Text, TouchableOpacity, RefreshControl} from 'react-native';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {isEqual} from 'lodash/fp';
import {NavigationActions} from 'react-navigation';
import {order, account} from 'walless-graphql';

import {OrderStateInficator} from 'walless/util/order';
import text from 'walless/styles/text';
import container from 'walless/styles/container';

class Orders extends React.Component {
  static propTypes = {
    getOrdersByAccount: PropTypes.shape({
      refetch: PropTypes.func.isRequired
    }),
    navigate: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
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
  refresh = async() => {
    this.setState({refreshing: true});
    await this.props.getOrdersByAccount.refetch();
    this.setState({refreshing: false});
  };
  handleItemPress = order => () => {
    this.props.navigate({routeName: 'order', params: {order}});
  };
  handleRenderItem = order => {
    const {createdAt} = order;
    return (
      <TouchableOpacity
        onPress={this.handleItemPress(order)}
        style={[
            container.row,
            container.rowDistinct,
            container.padded,
            container.spread
          ]}
      >
        <Text style={text.text}>{createdAt}</Text>
        <OrderStateInficator {...order} />
      </TouchableOpacity>
    );
  };
  render() {
    const {dataSource} = this.state;
    return (
      <ListView
        dataSource={dataSource}
        enableEmptySections
        refreshControl={
          <RefreshControl
            onRefresh={this.refresh}
            refreshing={this.state.refreshing}
            />
          }
        renderRow={this.handleRenderItem}
        style={container.container}
      />
    );
  }
}

export default compose(
  connect(null, {navigate: NavigationActions.navigate}),
  account.getActiveAccount,
  order.getOrdersByAccount
)(Orders);
