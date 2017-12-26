module.exports = {
  'env': {
    'browser': true,
    'jest/globals': true,
    'node': true
  },
  'extends': [
    'plugin:jest/recommended',
    'standard'
  ],
  'globals': {},
  'plugins': [
    'jest',
    'standard',
    'promise'
  ]
}
