/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
  ],
  plugins: ['@typescript-eslint', 'vue'],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: require.resolve('@typescript-eslint/parser'),
    extraFileExtensions: ['.vue'],
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  globals: {
    process: 'readonly',
    electron: 'readonly',
  },
  ignorePatterns: [
    '/dist',
    'out',
    'node_modules',
  ],
  rules: {
    // This rule require to use typescript in the application for the lang attribute of block elements.
    'vue/block-lang': [
      'error',
      {
        script: {
          lang: 'ts',
        },
      },
    ],

    // This rule require to use script setup syntax in vue files.
    'vue/component-api-style': ['error', ['script-setup']],

    // Define a PascalCase style for the component name in template casing for consistency purposes.
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      'registeredComponentsOnly': false,
    }],

    ...require('../configs/eslint-recomended.ts'),
  },
};

