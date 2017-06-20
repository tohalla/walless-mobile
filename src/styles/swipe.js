import EStyleSheet from 'react-native-extended-stylesheet';
import colors from 'walless/styles/colors';

export default EStyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: '3rem',
    paddingLeft: '3rem'
  },
  action: {
    flex: 1,
    backgroundColor: colors.action
  },
  alert: {
    flex: 1,
    backgroundColor: colors.alizarin
  }
});
