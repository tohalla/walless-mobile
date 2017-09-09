import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View, Text, Image} from 'react-native';
import {get} from 'lodash/fp';
import {connect} from 'react-redux';
import Swiper from 'react-native-swiper';

import text from 'walless/styles/text';
import container from 'walless/styles/container';
import colors from 'walless/styles/colors';
import Button from 'walless/components/Button.component';
import Diets from 'walless/restaurant/Diets.component';

const mapStateToProps = state => ({
  language: state.translation.language
});

class MenuItem extends React.Component {
  static propTypes = {
    actions: PropTypes.arrayOf(PropTypes.shape({
      onPress: PropTypes.func.isRequired,
      label: PropTypes.string.isRequired
    }))
  };
  static navigationOptions = ({navigation, ...props}) => ({
    title: get([
      'state',
      'params',
      'menuItem',
      'i18n',
      navigation.language,
      'name']
    )(navigation)
  });
  render() {
    const {
      menuItem = get(['navigation', 'state', 'params', 'menuItem'])(this.props),
      actions = []
    } = this.props;
    const {
      i18n: {
        [this.props.language]: {
          name, description
        } = {}
      },
      diets = [],
      images = []
    } = menuItem;
    return (
      <ScrollView
          alwaysBounceVertical={false}
          style={[container.container, container.light]}
      >
        {images.length ?
          <Swiper
              activeDotColor={colors.foregroundLight}
              dotColor="rgba(0,0,0,0.8)"
              height={250}
          >
            {images.map((image, index) => (
              <Image
                  key={index}
                  source={{uri: image.uri}}
                  style={container.slide}
              />
            ))}
          </Swiper>
        : null}
        <View style={[container.row, container.spread]}>
          <Text style={[text.text, container.padded, text.medium, text.bold]}>{name}</Text>
          {
            actions.map((action, index) => (
              <Button
                  key={index}
                  onPress={action.onPress}
                  padded
                  textStyle={{color: colors.action}}
              >
                {action.label}
              </Button>
            ))
          }
        </View>
        <View style={container.padded}>
          <Text style={[text.text]}>{description}</Text>
        </View>
        <Diets diets={diets} />
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(MenuItem);

