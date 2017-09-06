import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import {get} from 'lodash/fp';
import {connect} from 'react-redux';

import text from 'walless/styles/text';
import container from 'walless/styles/container';

const mapStateToProps = state => ({
  language: state.translation.language
});

class Order extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: get([
      'state',
      'params',
      'order',
      'id'
    ]
    )(navigation)
  });
  render() {
    const {
      order = get(['navigation', 'state', 'params', 'order'])(this.props),
      language
    } = this.props;
    const {
      items = []
    } = order;
    return (
      <ScrollView
          alwaysBounceVertical={false}
          style={[container.container, container.light]}
      >
        <View style={container.padded}>
          {items.map((item, index) => (
            <View key={index}>
              <Text style={text.text}>
                {get(['menuItem', 'information', language, 'name'])(item)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(Order);
