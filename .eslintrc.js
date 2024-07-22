module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier'
    ],
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      // Add your custom rules here
    }
  };
  