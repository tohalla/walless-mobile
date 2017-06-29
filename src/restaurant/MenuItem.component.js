import React from 'react';
import {ScrollView, View, Text, Image} from 'react-native';
import {get} from 'lodash/fp';
import {connect} from 'react-redux';
import Swiper from 'react-native-swiper';

import text from 'walless/styles/text';
import container from 'walless/styles/container';
import colors from 'walless/styles/colors';
import button from 'walless/styles/button';
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
      files = []
    } = menuItem;
    return (
      <ScrollView
          alwaysBounceVertical={false}
          style={[container.container, container.light]}
      >
        <Swiper
            activeDotColor={colors.foregroundLight}
            dotColor="rgba(0,0,0,0.8)"
            height={250}
        >
          {files.map((file, index) => (
            <Image
                key={index}
                source={{uri: file.uri}}
                style={container.slide}
            />
          ))}
        </Swiper>
        <View style={[container.row, container.padded, container.spread]}>
          <Text style={[text.text, text.medium, text.bold]}>{name}</Text>
          <Button
              onPress={this.handleAddToCart}
              style={button.stretch}
          >
            {'order'}
          </Button>
        </View>
        <View style={container.padded}>
          <Text style={[text.text]}>{description}</Text>
        </View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, {addCartItems})(MenuItem);
