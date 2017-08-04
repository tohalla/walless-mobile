import React from 'react';
import {connect} from 'react-redux';
import {get} from 'lodash/fp';
import {View, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import text from 'walless/styles/text';
import colors from 'walless/styles/colors';
import {minor} from 'walless/styles/spacing';

const mapStateToProps = state => ({
  language: state.translation.language
});

const Diet = ({diets, language, ...props}) => diets.length ? (
  <View style={styles.container} {...props}>
    {diets.map((diet, index) => (
      <View
          key={index}
          style={[styles.diet, {backgroundColor: diet.color || colors.neutral}]}
      >
        <Text style={[text.text, text.light]}>
          {get(['i18n', language, 'name'])(diet)}
        </Text>
      </View>
    ))}
  </View>
) : null;

export default connect(mapStateToProps)(Diet);

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: minor,
    justifyContent: 'flex-end'
  },
  diet: {
    padding: minor,
    borderRadius: 5
  }
});
