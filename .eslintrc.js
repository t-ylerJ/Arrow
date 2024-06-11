module.exports = {
  extends: 'airbnb',
  env: {
    es6: true,
    browser: true,
    node: true,
    'jest/globals': true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react/prop-types': 'off',
    'no-console': 'off',
    'max-len': 'off',
    radix: 'off',
    'react/button-has-type': 'off',
    'react/jsx-no-constructed-context-values': 'off',
  },
};
