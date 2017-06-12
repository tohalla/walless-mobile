import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {get} from 'lodash/fp';
import {NavigationActions} from 'react-navigation';

import Button from 'walless/components/Button.component';
import button from 'walless/styles/button';
import colors from 'walless/styles/colors';

const mapStateToProps = state => ({
  items: get(['cart', 'items'])(state) || []
});

class CartButton extends React.Component {
  render() {
    const {items} = this.props;
    return (
      <Button
          onPress={() =>
            this.props.navigate({routeName: 'cart'})
          }
      >
        <Icon
            color={colors.link}
            name="shopping-cart"
            size={20}
        />
        {items.length ?
          <Text style={button.buttonText}>{items.length}</Text> : null
        }
      </Button>
    );
  }
}

export default connect(
  mapStateToProps,
  {navigate: NavigationActions.navigate}
)(CartButton);
