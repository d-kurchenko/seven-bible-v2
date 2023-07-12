module.exports = {
  root: true,

  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
    extraFileExtensions: ['.vue'],
  },

  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    // 'eslint:recommended',
    'plugin:@typescript-eslint/recommended',

    // 'plugin:vue/vue3-essential', // Priority A: Essential (Error Prevention)
    // 'plugin:vue/vue3-strongly-recommended', // Priority B: Strongly Recommended (Improving Readability)
    'plugin:vue/vue3-recommended', // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)
  ],

  plugins: ['@typescript-eslint', 'vue'],

  globals: {
    ga: 'readonly', // Google Analytics
    cordova: 'readonly',
    __statics: 'readonly',
    __QUASAR_SSR__: 'readonly',
    __QUASAR_SSR_SERVER__: 'readonly',
    __QUASAR_SSR_CLIENT__: 'readonly',
    __QUASAR_SSR_PWA__: 'readonly',
    process: 'readonly',
    Capacitor: 'readonly',
    chrome: 'readonly',
    api: 'readonly',
  },
  ignorePatterns: [
    '/dist',
    '/dist-*',
    '/src-capacitor',
    '/src-cordova',
    '/.quasar',
    '/node_modules',
    '.eslintrc.js',
    '/src-ssr',
    '/quasar.config.*.temporary.compiled*',
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

    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  },
};
