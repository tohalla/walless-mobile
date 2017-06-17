import React from 'react';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {View, Text, ListView, TouchableOpacity} from 'react-native';
import {get, isEqual} from 'lodash/fp';
import PropTypes from 'prop-types';

import {getMenusByRestaurant} from 'walless-graphql/restaurant/restaurant.queries';
import container from 'walless/styles/container';

const mapStateToProps = state => ({
  restaurant: get(['active', 'restaurant'])(state),
  language: state.translation.language
});

class Menus extends React.Component {
  static PropTypes = {
    restaurant: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => !isEqual(r1)(r2)
      })
    };
  };
  componentWillReceiveProps(newProps) {
    if (!isEqual(this.props.getMenusByRestaurant)(newProps.getMenusByRestaurant)) {
      this.setState({
        dataSource: Array.isArray(newProps.getMenusByRestaurant.menus) ?
          this.state.dataSource.cloneWithRows(newProps.getMenusByRestaurant.menus) :
          this.state.dataSource.cloneWithRows([])
      });
    }
  };
  handleRenderMenu = menu => {
    const {
      information: {
        [this.props.language]: {
          name, description
        } = {}
      }
    } = menu;
    return (
      <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('menuItems', {menu})
          }
          style={[container.row, container.padded]}
      >
        <Text>{name}</Text>
        <Text>{description}</Text>
      </TouchableOpacity>
    );
  }
  render() {
    const {dataSource} = this.state;
    return (
      <View style={[container.container, container.light]}>
        <ListView
            dataSource={dataSource}
            enableEmptySections
            renderRow={this.handleRenderMenu}
        />
      </View>
    );
  }
}

export default compose(
  connect(mapStateToProps),
  getMenusByRestaurant
)(Menus);
