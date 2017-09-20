import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View, Text, Image, Switch} from 'react-native';
import {get, set} from 'lodash/fp';
import {connect} from 'react-redux';
import Swiper from 'react-native-swiper';

import NavigationItem from 'walless/components/NavigationItem.component';
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
  constructor(props) {
    super(props);
    this.state = {
      orderOptions: (
        get(['menuItem', 'options'])(props) ||
        get(['navigation', 'state', 'params', 'menuItem', 'options'])(props)
      ).reduce(
        (prev, curr) => Object.assign({}, prev, {[curr.id]: curr.defaultValue}),
        {}
      )
    };
  }
  handleOptionToggle = option => () => {
    const {orderOptions = {}} = this.state;
    this.setState({
      orderOptions: set(option.id)(!orderOptions[option.id])(orderOptions)
    });
  };
  handleActionPress = action => () => typeof action.onPress === 'function' ?
    action.onPress(this.state.options) : null;
  render() {
    const {
      menuItem = get(['navigation', 'state', 'params', 'menuItem'])(this.props),
      actions = [],
      language
    } = this.props;
    const {orderOptions} = this.state;
    const {
      i18n: {
        [language]: {
          name, description
        } = {}
      },
      diets = [],
      images = [],
      options = []
    } = menuItem;
    return (
      <ScrollView
          alwaysBounceVertical={false}
          style={[container.container, container.light]}
      >
        {images.length > 0 &&
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
        }
        <View style={container.header}>
          <Text style={[text.text, container.padded, text.medium, text.bold]}>{name}</Text>
          {actions.map((action, index) => (
            <Button
                key={index}
                onPress={this.handleActionPress(action)}
                padded
                textStyle={{color: colors.action}}
            >
              {action.label}
            </Button>
          ))}
        </View>
        {description &&
          <View style={container.padded}>
            <Text style={[text.text]}>{description}</Text>
          </View>
        }
        {options.length > 0 &&
          <View>
            {options.map((option, index) => (
              <NavigationItem key={index}>
                <Text>{get(['i18n', language, 'name'])(option)}</Text>
                <Switch
                    onValueChange={this.handleOptionToggle(option)}
                    value={orderOptions[option.id]}
                />
              </NavigationItem>
            ))}
          </View>
        }
        <Diets diets={diets} />
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(MenuItem);

