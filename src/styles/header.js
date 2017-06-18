import EStyleSheet from 'react-native-extended-stylesheet';
import colors from 'walless/styles/colors';

export default EStyleSheet.create({
  header: {
    backgroundColor: colors.headerBackground
  },
  text: {
    color: colors.headerForeground,
    fontSize: 16
  },
  title: {
    fontSize: 18
  },
  cartItems: {
    $size: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.headerForeground,
    width: '$size',
    height: '$size',
    borderRadius: '0.5 * $size',
    overflow: 'hidden'
  }
});
