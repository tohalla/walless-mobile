const colors = {
  red: '#e74c3c',
  white: '#FFFFFF',
  carrara: '#F2F1EF',
  gallery: '#E1E1E1',
  river: '#3498db',
  lightGray: '#9E9E9E',
  gray: '#424242',
  asphalt: '#95a5a6',
  darkGray: '#212121',
  black: '#000',
  orange: '#f39c12',
  green: '#2ecc71'

};

export default Object.assign({
  danger: colors.red,
  neutral: colors.lightGray,
  alert: colors.orange,
  success: colors.green,
  default: colors.green,
  background: colors.red,
  border: colors.lightGray,
  backgroundLight: colors.carrara,
  backgroundDark: colors.darkGray,
  foregroundLight: colors.carrara,
  foregroundDark: colors.darkGray,
  headerBackground: colors.red,
  headerForeground: colors.carrara,
  action: colors.river,
  link: colors.madison
}, colors);
