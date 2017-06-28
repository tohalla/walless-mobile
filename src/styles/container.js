import EStyleSheet from 'react-native-extended-stylesheet';
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
    backgroundColor: colors.alizarin
  },
  light: {
    backgroundColor: colors.white
  },
  rowDistinct: {
    backgroundColor: colors.white,
    marginBottom: 1
  },
  default: {
    backgroundColor: colors.carrara
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
    padding: '1rem'
  }
});
