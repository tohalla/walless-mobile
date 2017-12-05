import React from 'react';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {View, Text, ListView, TouchableOpacity} from 'react-native';
import {get, isEqual} from 'lodash/fp';
import PropTypes from 'prop-types';
import {menu} from 'walless-graphql';

import text from 'walless/styles/text';
import container from 'walless/styles/container';

const mapStateToProps = state => ({
  restaurant: get(['servingLocation', 'restaurant'])(state),
  language: state.translation.language
});

class Menus extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({navigate: PropTypes.func.isRequired}),
    getMenusByRestaurant: PropTypes.object,
    language: PropTypes.string
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
  menu.getMenusByRestaurant
)(Menus);
