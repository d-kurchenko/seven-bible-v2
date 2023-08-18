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
      typescript: true,
      node: true,
    },
  },
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  ignorePatterns: [
    '.eslintrc.js',
    'src/**/*.spec.ts',
    'src/migrations/**/*.ts',
  ],
  rules: {
    ...require('../configs/eslint-node.ts'),
    ...require('../configs/eslint-recomended.ts'),
  },
  overrides: [
    {
      files: ['src/migrations/**/*.ts'],
      rules: {
        'max-len': 'off',
      },
    },
  ],
};
