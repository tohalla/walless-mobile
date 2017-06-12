import {StyleSheet} from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  button: {
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonText: {
    color: colors.link,
    fontSize: 16
  },
  buttonTextLight: {
    color: colors.carrara
  }
});
