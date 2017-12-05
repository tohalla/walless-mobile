import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import colors from 'walless/styles/colors';

export default class Score extends React.Component {
  static propTypes = {
    max: PropTypes.number,
    score: PropTypes.number
  };
  render() {
    const {max, score} = this.props;
    const steps = [];
    for (const i = 1; i <= max; i++) {
      steps.push(
        <View
          key={i}
          style={[styles.step].concat(
              i > score ? [{opacity: .2}]
              : score / max > .5 ? {backgroundColor: colors.success}
              : score / max > .2 ? {backgroundColor: colors.alert}
              : {backgroundColor: colors.danger}
            )}
        />
      );
    }
    return (
      <View style={styles.container}>
        {steps}
      </View>
    );
  }
};

const styles = EStyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 6,
    margin: '1rem',
    flexDirection: 'row'
  },
  step: {
    flex: 1,
    backgroundColor: colors.black,
    borderRadius: 3,
    marginRight: 2
  },
  ['step:first-child']: {margin: 0},
  ['step:last-child']: {margin: 0}
});
