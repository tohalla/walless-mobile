import EStyleSheet from 'react-native-extended-stylesheet';
import colors from 'walless/styles/colors';

export default EStyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  padded: {
    padding: '0.7rem'
  },
  buttonText: {
    color: colors.link,
    fontSize: 18
  },
  buttonTextLight: {
    color: colors.carrara
  }
});
