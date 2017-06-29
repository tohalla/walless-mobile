import React from 'react';
import PropTypes from 'prop-types';
import {
  Keyboard,
  Animated,
  View
} from 'react-native';

export default class AvoidKeyboard extends React.Component {
  static PropTypes = {
    children: PropTypes.node
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
  };
  render = () => (
    <View
        style={[].concat(
          this.props.style,
          {flex: 1}
        )}
    >
      <Animated.View style={{flex: 1, paddingBottom: this.keyboardHeight}}>
        {this.props.children}
      </Animated.View>
    </View>
  );
}
