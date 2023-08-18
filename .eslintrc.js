/**
 * @type {import("eslint").Linter.Config}
 */

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'more'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:node/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  settings: {
    'import/resolver': {
      typescript: {
      },
    },
  },
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  ignorePatterns: ['.eslintrc.js', 'ui', 'api'],
  rules: {
    'node/no-unpublished-import': "off",

    ...require('./configs/eslint-node.ts'),
    ...require('./configs/eslint-recomended.ts'),
  },
};
