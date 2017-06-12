import React from 'react';
import {connect} from 'react-redux';
import {get} from 'lodash/fp';
import {View} from 'react-native';

import {MenuItems} from 'walless/restaurant/MenuItems.component';

const mapStateToProps = state => ({
  items: get(['cart', 'items'])(state) || []
});

class Cart extends React.Component {
  render() {
    const {items} = this.props;
    return (
      <View>
        <MenuItems items={items} />
      </View>
    );
  }
}

export default connect(mapStateToProps)(Cart);
