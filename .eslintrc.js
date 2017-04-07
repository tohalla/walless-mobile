module.exports = {
  parser: 'babel-eslint',
  extends: [
    'google',
    'plugin:flowtype/recommended'
  ],
  plugins: [
    'react',
    'babel',
    'flowtype'
  ],
  env: {
    es6: true
  },
  ecmaFeatures: {
    jsx: true
  },
  rules: {
    'no-invalid-this': 0,
    'comma-dangle': [2, 'never'],
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-undef': 2,
    'no-nested-ternary': 0,
    'operator-linebreak': 0,
    'require-jsdoc': 0,
    'max-len': 1,
    'react/jsx-uses-vars': 1
  }
};
