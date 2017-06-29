import React from 'react';
import PropTypes from 'prop-types';
import {
  Keyboard,
  Animated,
  View,
  ScrollView,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import I18n from 'react-native-i18n';

import button from 'walless/styles/button';
import Button from 'walless/components/Button.component';

export default class Stepped extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    containerProps: PropTypes.object,
    displayProgressBar: PropTypes.bool,
    steps: PropTypes.arrayOf(PropTypes.shape({
      component: PropTypes.node.isRequired
    })).isRequired,
    onContinuePress: PropTypes.func,
    onCancelPress: PropTypes.func,
    onSubmitPress: PropTypes.func,
    onBackPress: PropTypes.func,
    continueLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    cancelLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    submitLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    backLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    step: PropTypes.number
  };
  static defaultProps = {
    color: 'white',
    displayProgressBar: true,
    step: 0
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
  handleContinuePress = () => {
    const {step, onContinuePress, steps} = this.props;
    if (typeof steps[step].allowContinue === 'undefined' || steps[step].allowContinue) {
      if (typeof onContinuePress === 'function') {
        onContinuePress();
      }
      if (typeof steps[step].onContinue === 'function') {
        steps[step].onContinue();
      }
    }
  };
  handleBackPress = () => {
    if (typeof this.props.onBackPress === 'function') {
      this.props.onBackPress();
    }
  };
  handleSubmitPress = () => {
    if (typeof this.props.onSubmitPress === 'function') {
      this.props.onSubmitPress();
    }
  };
  handleCancelPress = () => {
    if (typeof this.props.onCancelPress === 'function') {
      this.props.onCancelPress();
    }
  };
  render() {
    const {
      displayProgressBar,
      steps,
      containerProps,
      continueLabel = I18n.t('continue'),
      cancelLabel = I18n.t('cancel'),
      submitLabel = I18n.t('submit'),
      color,
      backLabel = (
        <Icon
            color={this.props.color}
            name="chevron-left"
            size={20}
        />
      )
    } = this.props;
    const step = Math.min(this.props.step, steps.length - 1);
    const LeftButton = () => (
      <Button
          onPress={step === 0 ? this.handleCancelPress : this.handleBackPress}
          style={button.padded}
          textStyle={{color}}
      >
        {step === 0 ? cancelLabel : backLabel}
      </Button>
    );
    const RightButton = () => (
      <Button
          disabled={
            typeof steps[step].allowContinue !== 'undefined' &&
            !steps[step].allowContinue
          }
          onPress={step === steps.length - 1 ? this.handleSubmitPress : this.handleContinuePress}
          style={button.padded}
          textStyle={{color}}
      >
        {step === steps.length - 1 ? submitLabel : continueLabel}
      </Button>
    );
    const ProgressBar = () => displayProgressBar ? (
      <View style={{flex: 0, height: 6, alignSelf: 'stretch', flexDirection: 'row'}}>
        <View
            style={{
              flex: 0,
              flexBasis: Dimensions.get('window').width * (step + .5) / steps.length,
              backgroundColor: color,
              opacity: 0.8
            }}
        />
        <View style={{flex: 1, backgroundColor: color, opacity: .4}} />
      </View>
    ) : null;
    return (
      <Animated.View style={{flex: 1, flexDirection: 'column', paddingBottom: this.keyboardHeight}}>
        <ScrollView style={{flex: 1}} {...containerProps}>
          {steps[step].component}
        </ScrollView>
        <View
            style={{
              alignSelf: 'stretch',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
        >
          <LeftButton />
          <RightButton />
        </View>
        <ProgressBar />
      </Animated.View>
    );
  }
};
