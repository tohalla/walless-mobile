import React from 'react';
import {ScrollView, View, Text, Image} from 'react-native';
import {get} from 'lodash/fp';
import {connect} from 'react-redux';
import Swiper from 'react-native-swiper';

import container from 'walless/styles/container';
import Button from 'walless/components/Button.component';
import {addCartItems} from 'walless/restaurant/cart.reducer';

const mapStateToProps = state => ({
  language: state.translation.language
});

class MenuItem extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: get([
      'state',
      'params',
      'menuItem',
      'information',
      navigation.language,
      'name']
    )(navigation)
  });
  handleAddToCart = () => {
    const {
      menuItem = get(['navigation', 'state', 'params', 'menuItem'])(this.props),
      addCartItems
    } = this.props;
    addCartItems(menuItem);
  }
  render() {
    const {
      menuItem = get(['navigation', 'state', 'params', 'menuItem'])(this.props)
    } = this.props;
    const {
      information: {
        [this.props.language]: {
          name, description
        } = {}
      },
      files
    } = menuItem;
    return (
      <ScrollView
          alwaysBounceVertical={false}
          style={[container.container, container.light]}
      >
        <Swiper height={250}>
          {files.map((file, index) => (
            <Image
                key={index}
                source={{uri: file.uri}}
                style={{width: 'auto', height: '100%'}}
            />
          ))}
        </Swiper>
        <View style={[container.row, container.padded, container.spread]}>
          <Text>{name}</Text>
          <Button
              onPress={this.handleAddToCart}
              padded={false}
          >
            {'order'}
          </Button>
        </View>
        <View style={container.padded}>
          <Text>{description}</Text>
        </View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, {addCartItems})(MenuItem);
