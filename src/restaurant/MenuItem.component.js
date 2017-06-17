import React from 'react';
import {View, Text, Image} from 'react-native';
import {get} from 'lodash/fp';
import {connect} from 'react-redux';
import Swiper from 'react-native-swiper';

import container from 'walless/styles/container';

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
      <View style={[container.container, container.light]}>
        <Swiper height={250}>
          {files.map((file, index) => (
            <Image
                key={index}
                source={{uri: file.uri}}
                style={{width: 'auto', height: '100%'}}
            />
          ))}
        </Swiper>
        <View style={container.padded}>
          <Text>{name}</Text>
          <Text>{description}</Text>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(MenuItem);
