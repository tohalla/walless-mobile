import EStyleSheet from 'react-native-extended-stylesheet';

import colors from 'walless/styles/colors';

export default EStyleSheet.create({
  container: {
    padding: '1rem',
    alignSelf: 'stretch',
    flexDirection: 'column'
  },
  input: {
    color: colors.darkGray,
    paddingHorizontal: '0.5rem',
    height: '2rem'
  },
  inputLight: {
    color: colors.foregroundLight
  },
  label: {
    color: colors.darkGray,
    fontSize: 18
  },
  labelLight: {
    color: colors.foregroundLight
  },
  dropdown: {
    height: 'auto',
    maxHeight: 200,
    minWidth: 120
  }
});
