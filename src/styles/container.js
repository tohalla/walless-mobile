import EStyleSheet from 'react-native-extended-stylesheet';
import colors from 'walless/styles/colors';

export default EStyleSheet.create({
  container: {
    flex: 1
  },
  screenContainer: {
    flex: 1,
    backgroundColor: colors.alizarin
  },
  light: {
    backgroundColor: colors.white
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  spread: {
    justifyContent: 'space-between'
  },
  padded: {
    padding: '0.5rem 1rem'
  }
});
