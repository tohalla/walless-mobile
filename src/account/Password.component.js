import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import I18n from 'react-native-i18n';
import zxcvbn from 'zxcvbn';
import {set} from 'lodash/fp';

import Score from 'walless/components/Score.component';
import Input from 'walless/components/Input.component';
import Button from 'walless/components/Button.component';
import container from 'walless/styles/container';
import text from 'walless/styles/text';

export default class Password extends React.Component {
  static propTypes = {
    password: PropTypes.shape({
      value: PropTypes.string.isRequired,
      onChangeText: PropTypes.func.isRequired
    }),
    autoFocus: PropTypes.bool,
    displayScore: PropTypes.bool,
    light: PropTypes.bool,
    requireRetype: PropTypes.bool,
    retype: PropTypes.shape({
      value: PropTypes.string.isRequired,
      onChangeText: PropTypes.func.isRequired
    }),
    requireCurrent: PropTypes.bool,
    current: PropTypes.shape({
      value: PropTypes.string.isRequired,
      onChangeText: PropTypes.func.isRequired
    }),
    onSubmit: PropTypes.func
  };
  static defaultProps = {
    requireRetype: false,
    displayScore: true
  };
  state = {
    current: '',
    password: '',
    retype: ''
  };
  handleInputChange = path => value => {
    this.setState(set(path)(value)(this.state));
  };
  render() {
    const {
      password: {
        value: password = this.state.password,
        onChangeText: onChangePassword = this.handleInputChange('password')
      } = {},
      autoFocus,
      retype: {
        value: retype = this.state.retype,
        onChangeText: onChangeRetype = this.handleInputChange('retype')
      } = {},
      requireRetype,
      current: {
        value: current = this.state.current,
        onChangeText: onChangeCurrent = this.handleInputChange('current')
      } = {},
      requireCurrent,
      displayScore,
      light,
      onSubmit,
      ...rest
    } = this.props;
    const score = zxcvbn(password).score;
    return (
      <View style={{alignSelf: 'stretch'}} {...rest}>
        {requireCurrent ?
          <Input
            autoCapitalize='none'
            autoCorrect={false}
            label={I18n.t('account.currentPassword')}
            light={light}
            name='currentPassword'
            onChangeText={onChangeCurrent}
            secureTextEntry
            value={current}
          /> : null
        }
        <Input
          autoCapitalize='none'
          autoCorrect={false}
          autoFocus={autoFocus}
          label={I18n.t('account.password')}
          light={light}
          name='password'
          onChangeText={onChangePassword}
          secureTextEntry
          value={password}
        />
        {requireRetype ?
          <Input
            autoCapitalize='none'
            autoCorrect={false}
            label={I18n.t('account.retypePassword')}
            light={light}
            name='retypePassword'
            onChangeText={onChangeRetype}
            secureTextEntry
            value={retype}
          /> : null
        }
        {displayScore ? <Score max={4} score={score} /> : null}
        {typeof onSubmit === 'function' ? (
          <View style={[container.row, {justifyContent: 'flex-end'}]}>
            <Button
              disabled={
                  !(requireRetype && retype === password) ||
                  !(requireCurrent && current) ||
                  score <= 2
                }
              onPress={() => onSubmit({password, currentPassword: current})}
              padded
              textStyle={[].concat(light ? text.light : [])}
            >
              {I18n.t('account.changePassword')}
            </Button>
          </View>
        ) : null}
      </View>
    );
  }
};
