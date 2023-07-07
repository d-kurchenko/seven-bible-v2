module.exports = {
  // Disable check of imports and exports in Typescript project
  // https://github.com/mysticatea/eslint-plugin-node/issues/236
  'node/no-unsupported-features/es-syntax': ['error', {
    ignores: ['modules'],
  }],
  // Path aliases are not supported yet
  // https://github.com/mysticatea/eslint-plugin-node/issues/233
  'node/no-missing-import': 'off',
  // Disable import rules as Typescript recommend
  // https://typescript-eslint.io/docs/linting/troubleshooting/#eslint-plugin-import
  'import/named': 'off',
  'import/namespace': 'off',
  'import/default': 'off',
  'import/no-named-as-default-member': 'off',

  // Enforces a consistent member delimiter style in interfaces and type literals.
  '@typescript-eslint/member-delimiter-style': [
    'warn',
    {
      'multiline': {
        'delimiter': 'semi',
        'requireLast': true,
      },
      'singleline': {
        'delimiter': 'semi',
        'requireLast': false,
      },
    },
  ],
  'node/no-extraneous-import': 'off',
};

