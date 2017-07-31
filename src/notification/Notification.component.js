import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {pick} from 'lodash/fp';

import {minor} from 'walless/styles/spacing';
import {deleteNotification} from 'walless/notification/notification.reducer';
import text from 'walless/styles/text';
import colors from 'walless/styles/colors';
import Button from 'walless/components/Button.component';

class Notification extends React.Component {
  static propTypes = {
    actions: PropTypes.arrayOf(PropTypes.shape({
      onPress: PropTypes.func.isRequired,
      label: PropTypes.node.isRequired,
      deleteOnPress: PropTypes.bool
    })),
    createdAt: PropTypes.instanceOf(Date),
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['alert', 'danger', 'success', 'neutral'])
  };
  static defaultProps = {
    type: 'neutral'
  };
  handleActionPress = action => () => {
    action.onPress();
    if (action.deleteOnPress) {
      this.handleDeleteNotification();
    }
  };
  handleDeleteNotification = () => this.props.deleteNotification(
    pick(['createdAt', 'message', 'type', 'actions'])(this.props)
  );
  render() {
    const {message, type, actions = []} = this.props;
    return (
      <View style={styles.container}>
        <View style={[styles.indicator, styles[type]]} />
        <Text style={[text.small, text.neutral, styles.message]}>
          {message}
        </Text>
        {actions.map((action, index) => (
          <Button
              key={index}
              onPress={this.handleActionPress(action)}
              style={styles.action}
              textStyle={text.neutral}
          >
            {action.label}
          </Button>
        ))}
        <Button onPress={this.handleDeleteNotification} style={styles.action}>
          <Icon
              color={colors.neutral}
              name="close"
              size={20}
          />
        </Button>
      </View>
    );
  }
};

export default connect(null, {deleteNotification})(Notification);

const styles = EStyleSheet.create({
  indicator: {
    alignSelf: 'stretch',
    width: 5
  },
  alert: {backgroundColor: colors.alert},
  danger: {backgroundColor: colors.danger},
  success: {backgroundColor: colors.success},
  neutral: {display: 'none'},
  message: {
    padding: minor,
    flex: 1,
    justifyContent: 'center'
  },
  action: {
    flex: 0,
    padding: minor
  },
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});
