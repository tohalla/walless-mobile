import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import I18n from 'react-native-i18n';
import EStyleSheet from 'react-native-extended-stylesheet';

import AvoidKeyboard from 'walless/components/AvoidKeyboard.component';
import Button from 'walless/components/Button.component';

export default class Stepped extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    contentContainerStyle: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.object])),
      PropTypes.number,
      PropTypes.object
    ]),
    displayProgressBar: PropTypes.bool,
    steps: PropTypes.arrayOf(PropTypes.shape({
      allowContinue: PropTypes.bool,
      validate: PropTypes.func,
      onError: PropTypes.func,
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
  state = {
    loading: false
  };
  handleContinuePress = async() => {
    const {step, onContinuePress, steps} = this.props;
    const {allowContinue, validate, onContinue, onError} = steps[step];
    if (typeof allowContinue === 'undefined' || allowContinue) {
      if (typeof validate === 'function') {
        this.setState({loading: true});
        const valid = await validate();
        this.setState({loading: false});
        if (valid !== true) {
          return typeof onError === 'function' ? onError(valid) : null;
        }
      }
      if (typeof onContinuePress === 'function') {
        onContinuePress();
      }
      if (typeof onContinue === 'function') {
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
      contentContainerStyle,
      steps,
      continueLabel = I18n.t('continue'),
      cancelLabel = I18n.t('cancel'),
      submitLabel = I18n.t('submit'),
      color,
      backLabel = (
        <Icon
          color={this.props.color}
          name='chevron-left'
          size={20}
        />
      )
    } = this.props;
    const {loading} = this.state;
    const step = Math.min(this.props.step, steps.length - 1);
    const LeftButton = props => (
      <Button
        disabled={loading}
        onPress={step === 0 ? this.handleCancelPress : this.handleBackPress}
        padded
        textStyle={{color}}
        {...props}
      >
        {step === 0 ? cancelLabel : backLabel}
      </Button>
    );
    const RightButton = props => (
      <Button
        disabled={
            loading || (
              typeof steps[step].allowContinue !== 'undefined' &&
              !steps[step].allowContinue
            )
          }
        onPress={step === steps.length - 1 ? this.handleSubmitPress : this.handleContinuePress}
        padded
        textStyle={{color}}
        {...props}
      >
        {step === steps.length - 1 ? submitLabel : continueLabel}
      </Button>
    );
    const ProgressBar = () => displayProgressBar ? (
      <View style={styles.progressBarContainer}>
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
    const {invalid, component} = steps[step];
    return (
      <AvoidKeyboard contentContainerStyle={contentContainerStyle}>
        {loading ?
          <View style={contentContainerStyle}>
            <ActivityIndicator color={color} />
          </View> :
          <View style={contentContainerStyle}>
            {typeof invalid === 'string' ? <Text>{invalid}</Text> : null}
            {component}
          </View>
        }
        <View style={styles.navigation}>
          <LeftButton />
          <RightButton />
        </View>
        <ProgressBar />
      </AvoidKeyboard>
    );
  }
};

const styles = EStyleSheet.create({
  progressBarContainer: {
    flex: 0,
    height: 6,
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  navigation: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
