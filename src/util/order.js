import React from 'react';
import {Text} from 'react-native';
import I18n from 'react-native-i18n';

import colors from 'walless/styles/colors';
import text from 'walless/styles/text';

export const getOrderStateIndicator = ({completed, accepted, declined}) =>
  completed ?
    <Text style={[text.text, {color: colors.success}]}>
      {I18n.t('restaurant.order.state.completed')}
    </Text>
  : accepted ?
    <Text style={[text.text, {color: colors.foregroundDark}]}>
      {I18n.t('restaurant.order.state.accepted')}
    </Text>
  : declined ?
    <Text style={[text.text, {color: colors.danger}]}>
      {I18n.t('restaurant.order.state.declined')}
    </Text>
  :
    <Text style={[text.text, {color: colors.neutral}]}>
      {I18n.t('restaurant.order.state.pending')}
    </Text>;
