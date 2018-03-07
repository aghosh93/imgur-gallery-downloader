module.exports = {
  'env': {
    'browser': true,
    'jest/globals': true,
    'node': true
  },
  'extends': [
    'standard',
    'plugin:jest/recommended'
  ],
  'globals': {},
  'plugins': [
    'jest',
    'json',
    'promise',
    'standard'
  ],
  'rules': {
    'semi': [2, 'always'],
    'strict': [2, 'global']
  }
}
