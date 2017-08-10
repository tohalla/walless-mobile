import React from 'react';
import {ListView, Text, TouchableOpacity, RefreshControl} from 'react-native';
import {compose} from 'react-apollo';
import I18n from 'react-native-i18n';
import {connect} from 'react-redux';
import {isEqual} from 'lodash/fp';
import {NavigationActions} from 'react-navigation';

import colors from 'walless/styles/colors';
import text from 'walless/styles/text';
import container from 'walless/styles/container';
import {getActiveAccount} from 'walless-graphql/account/account.queries';
import {getOrdersByAccount} from 'walless-graphql/restaurant/order.queries';

class Orders extends React.Component {
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
    const {
      createdAt,
      accepted,
      completed,
      declined
    } = order;
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
        {
          completed ?
            <Text style={[text.text, {color: colors.success}]}>
              {I18n.t('restaurant.order.state.completed')}
            </Text>
          : accepted ?
            <Text style={[text.text, {color: colors.foregroundDark}]}>
              {I18n.t('restaurant.order.state.accepted')}
            </Text>
          : declined ?
            <Text style={[text.text, {color: colors.danger}]}>
              {I18n.t('restaurant.order.state.declined')}
            </Text>
          :
            <Text style={[text.text, {color: colors.neutral}]}>
              {I18n.t('restaurant.order.state.pending')}
            </Text>
        }
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
      />
    );
  }
}

export default compose(
  connect(null, {navigate: NavigationActions.navigate}),
  getActiveAccount,
  getOrdersByAccount
)(Orders);
