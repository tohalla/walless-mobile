import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  Keyboard,
  Animated
} from 'react-native';

import Notification from 'walless/notification/Notification.component';

const mapStateToProps = state => ({notifications: state.notifications});

class Notifications extends React.Component {
  static propTypes = {
    notifications: PropTypes.arrayOf(PropTypes.shape({
      message: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['alert', 'danger', 'success', 'neutral'])
    }))
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
  render() {
    const {notifications} = this.props;
    return (
      <Animated.View
        style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: 'column',
            paddingBottom: this.keyboardHeight
          }}
      >
        {notifications
          .sort((a, b) => a.createdAt < b.createdAt)
          .map((n, index) =>
            <Notification key={index} {...n} />
          )}
      </Animated.View>
    );
  }
}

export default connect(mapStateToProps)(Notifications);
