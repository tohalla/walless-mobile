import React from 'react';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {View, Text, ListView, TouchableOpacity} from 'react-native';
import {get, isEqual} from 'lodash/fp';
import PropTypes from 'prop-types';

import text from 'walless/styles/text';
import {getMenusByRestaurant} from 'walless-graphql/restaurant/menu.queries';
import container from 'walless/styles/container';

const mapStateToProps = state => ({
  restaurant: get(['servingLocation', 'restaurant'])(state),
  language: state.translation.language
});

class Menus extends React.Component {
  static PropTypes = {
    restaurant: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired
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
        dataSource: Array.isArray(newProps.menus) ?
          this.state.dataSource.cloneWithRows(newProps.menus) :
          this.state.dataSource.cloneWithRows([])
      });
    }
  };
  handleRenderItem = menu => {
    const {
      i18n: {
        [this.props.language]: {
          name, description
        } = {}
      }
    } = menu;
    return (
      <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('restaurantMenuItems', {menu})
          }
          style={[container.row, container.rowDistinct, container.padded]}
      >
        <View>
          <Text style={[text.text, text.medium, text.bold]}>{name}</Text>
          <Text style={text.text}>{description}</Text>
        </View>
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
          style={container.container}
      />
    );
  }
}

export default compose(
  connect(mapStateToProps),
  getMenusByRestaurant
)(Menus);
