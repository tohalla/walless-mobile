import EStyleSheet from 'react-native-extended-stylesheet';

import colors from 'walless/styles/colors';

export default EStyleSheet.create({
  container: {
    marginVertical: '0.2rem',
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
    color: colors.carrara
  },
  label: {
    color: colors.darkGray,
    fontSize: 18
  },
  labelLight: {
    color: colors.carrara
  }
});
