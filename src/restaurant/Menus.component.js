import React from 'react';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {View, Text, ListView, TouchableOpacity} from 'react-native';
import {get, isEqual} from 'lodash/fp';
import PropTypes from 'prop-types';

import {getMenusByRestaurant} from 'walless-graphql/restaurant/restaurant.queries';

const mapStateToProps = state => ({
  restaurant: get(['active', 'restaurant'])(state)
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
  render() {
    const {dataSource} = this.state;
    return (
      <View
          style={{
            height: '100%'
          }}
      >
        <ListView
            dataSource={dataSource}
            renderRow={menu => (
              <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('menuItems', {menu})
                  }
                  style={{
                    backgroundColor: 'white',
                    borderBottomWidth: 1,
                    borderColor: 'lightgray'
                  }}
              >
                <Text>{menu.name}</Text>
                <Text>{menu.description}</Text>
              </TouchableOpacity>
            )}
        />
      </View>
    );
  }
}

export default compose(
  connect(mapStateToProps),
  getMenusByRestaurant
)(Menus);
