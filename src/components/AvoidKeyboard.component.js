import React from 'react';
import PropTypes from 'prop-types';
import {
  Keyboard,
  Animated,
  View,
  ScrollView
} from 'react-native';

export default class AvoidKeyboard extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    contentContainerStyle: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.object])),
      PropTypes.object
    ]),
    style: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.object])),
      PropTypes.object
    ])
  };
  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }
  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }
  keyboardHeight = new Animated.Value(0);
  keyboardWillShow = (event) => {
    Animated.timing(this.keyboardHeight, {
      duration: event.duration,
      toValue: event.endCoordinates.height
    }).start();
  };
  keyboardWillHide = (event) => {
    Animated.timing(this.keyboardHeight, {
      duration: event.duration,
      toValue: 0
    }).start();
    this.scrollView.scrollTo();
  };
  render = () => (
    <View style={[{flex: 1}].concat(this.props.style)}>
      <Animated.View style={{flex: 1, paddingBottom: this.keyboardHeight}}>
        <ScrollView
          bounce={false}
          contentContainerStyle={this.props.contentContainerStyle}
          keyboardShouldPersistTaps='handled'
          ref={c => this.scrollView = c}
          style={{flex: 1}}
        >
          {this.props.children}
        </ScrollView>
      </Animated.View>
    </View>
  );
}
