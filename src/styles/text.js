import EStyleSheet from 'react-native-extended-stylesheet';
import colors from 'walless/styles/colors';

export default EStyleSheet.create({
  text: {
    color: colors.darkGray,
    fontSize: 16
  },
  light: {
    color: colors.carrara
  },
  bold: {
    fontWeight: 'bold'
  },
  neutral: {
    color: colors.lightGray
  },
  small: {
    fontSize: 14
  },
  medium: {
    fontSize: 18
  },
  large: {
    fontSize: 22
  },
  button: {
    color: colors.link,
    fontSize: 18
  }
});
