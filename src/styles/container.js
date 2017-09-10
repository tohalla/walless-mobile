import {StyleSheet} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import {normal} from 'walless/styles/spacing';
import colors from 'walless/styles/colors';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gallery
  },
  slide: {
    backgroundColor: colors.backgroundDark,
    flex: 1
  },
  colored: {
    backgroundColor: colors.background
  },
  light: {
    backgroundColor: colors.backgroundLight
  },
  rowDistinct: {
    backgroundColor: colors.backgroundLight,
    marginBottom: StyleSheet.hairlineWidth
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  spread: {
    justifyContent: 'space-between'
  },
  padded: {
    padding: normal
  }
});
