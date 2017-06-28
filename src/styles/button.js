import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  disabled: {
    opacity: 0.5
  },
  stretch: {
    alignSelf: 'stretch'
  },
  padded: {
    padding: '0.7rem'
  }
});
