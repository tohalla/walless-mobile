import React from 'react';
import {View, Text} from 'react-native';
import {get} from 'lodash/fp';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  language: state.translation.language
});


class MenuItem extends React.Component {
  render() {
    const {
      menuItem = get(['navigation', 'state', 'params', 'menuItem'])(this.props)
    } = this.props;
    const {
      information: {
        [this.props.language]: {
          name, description
        } = {}
      }
    } = menuItem;
    return (
      <View>
        <Text>{name}</Text>
        <Text>{description}</Text>
      </View>
    );
  }
}

export default connect(mapStateToProps)(MenuItem);
