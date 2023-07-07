module.exports = {
  // require parentheses around arrow function arguments
  'arrow-parens': 'error',
  // enforce consistent spacing before and after the arrow in arrow functions
  'arrow-spacing': [
    'error',
    {
      before: true,
      after: true,
    },
  ],
  // enforce spacing inside array brackets
  'array-bracket-spacing': ['error', 'never'],
  // enforce line breaks after each array element
  'array-element-newline': 'off',
  // disallow or enforce spaces inside of single line blocks
  'block-spacing': ['error', 'always'],
  // enforce one true brace style
  'brace-style': [
    'error',
    '1tbs',
    {
      allowSingleLine: true,
    },
  ],
  // require camel case names
  camelcase: [
    'error',
    {
      properties: 'always',
    },
  ],
  // enforce or disallow capitalization of the first letter of a comment
  'capitalized-comments': 'off',
  // disallow trailing commas in object literals
  'comma-dangle': ['error', 'always-multiline'],
  // enforce spacing before and after comma
  'comma-spacing': [
    'error',
    {
      before: false,
      after: true,
    },
  ],
  // enforce one true comma style
  'comma-style': ['error', 'last'],
  // disallow padding inside computed properties
  'computed-property-spacing': ['error', 'never'],
  // enforces consistent naming when capturing the current execution context
  'consistent-this': 'off',
  // enforce newline at the end of file, with no multiple empty lines
  'eol-last': 'error',
  // require or disallow spacing between function identifiers and their invocations
  'func-call-spacing': 'off',
  '@typescript-eslint/func-call-spacing': ['error'],
  // require function names to match the name of the variable or property to which they are assigned
  'func-name-matching': 'off',
  // require function expressions to have a name
  'func-names': 'off',
  // requires the use of function expressions instead of function declarations
  'func-style': ['error', 'expression'],
  // enforce line breaks between arguments of a function call
  'function-call-argument-newline': 'off',
  // enforce consistent line breaks inside function parentheses
  'function-paren-newline': 'off',
  // blacklist certain identifiers to prevent them being used
  'id-blacklist': 'off',
  // this option enforces minimum and maximum identifier lengths (variable names, property names etc.)
  'id-length': 'off',
  // require identifiers to match the provided regular expression
  'id-match': 'off',
  // this option sets a specific tab width for your code
  indent: 'off',
  '@typescript-eslint/indent': [
    'error',
    2,
    {
      SwitchCase: 1,
      VariableDeclarator: 1,
      // HOTFIX: class properties with decorators
      // https://github.com/eslint/eslint/issues/15299
      ignoredNodes: ['PropertyDefinition', 'Decorator'],
    },
  ],
  // specify whether double or single quotes should be used in JSX attributes
  'jsx-quotes': ['error', 'prefer-double'],
  // enforces spacing between keys and values in object literal properties
  'key-spacing': [
    'error',
    {
      beforeColon: false,
      afterColon: true,
    },
  ],
  // enforce spacing before and after keywords
  'keyword-spacing': 'error',
  // enforce position of line comments
  'line-comment-position': 'off',
  // disallow mixed 'LF' and 'CRLF' as linebreaks
  'linebreak-style': 'off',
  // enforces empty lines around comments
  'lines-around-comment': 'off',
  // specify the maximum depth that blocks can be nested
  'max-depth': 'off',
  // specify the maximum length of a line in your program
  'max-len': [
    'error',
    150,
    4,
    {
      ignoreComments: false,
      ignoreUrls: true,
    },
  ],
  // enforce a maximum file length
  'max-lines': 'off',
  // specify the maximum depth callbacks can be nested
  'max-nested-callbacks': 'off',
  // limits the number of parameters that can be used in the function declaration
  'max-params': 'off',
  // specify the maximum number of statement allowed in a function
  'max-statements': 'off',
  // specify the maximum number of statements allowed per line
  'max-statements-per-line': 'error',
  // enforce newlines between operands of ternary expressions
  'multiline-ternary': 'off',
  // require a capital letter for constructors
  'new-cap': [
    'error',
    {
      newIsCap: true,
      capIsNew: false,
    },
  ],
  // disallow the omission of parentheses when invoking a constructor with no arguments
  'new-parens': 'error',
  // newline per chained method call
  'newline-per-chained-call': 'off',
  // disallow use of the Array constructor
  'no-array-constructor': 'off',
  '@typescript-eslint/no-array-constructor': 'error',
  // disallow use of bitwise operators
  'no-bitwise': 'error',
  // disallow use of the continue statement
  'no-continue': 'off',
  // disallow comments inline after code
  'no-inline-comments': 'off',
  // disallow if as the only statement in an else block
  'no-lonely-if': 'error',
  // disallow mixes of different operators
  'no-mixed-operators': [
    'error',
    {
      allowSamePrecedence: true,
    },
  ],
  // disallow mixed spaces and tabs for indentation
  'no-mixed-spaces-and-tabs': 'error',
  // disallow use of chained assignment expressions
  'no-multi-assign': 'error',
  // disallow multiple empty lines and only one newline at the end
  'no-multiple-empty-lines': [
    'error',
    {
      max: 1,
      maxEOF: 1,
    },
  ],
  // disallow negated conditions
  'no-negated-condition': 'off',
  // disallow use of the Object constructor
  'no-new-object': 'error',
  // disallow use of unary operators, ++ and --
  'no-plusplus': 'off',
  // disallow use of certain syntax in code
  'no-restricted-syntax': 'off',
  // disallow all tabs
  'no-tabs': 'error',
  // disallow the use of ternary operators
  'no-ternary': 'off',
  // disallow trailing whitespace at the end of lines
  'no-trailing-spaces': 'error',
  // disallow dangling underscores in identifiers
  'no-underscore-dangle': 'off',
  // disallow the use of Boolean literals in conditional expressions
  'no-unneeded-ternary': 'error',
  // disallow whitespace before properties
  'no-whitespace-before-property': 'error',
  // enforce the location of single-line statements
  'nonblock-statement-body-position': 'off',
  // enforce block statements to be wrapped in curly braces
  curly: 'error',
  // enforce consistent line breaks inside braces
  'object-curly-newline': [
    'error',
    {
      ObjectExpression: 'always',
      ObjectPattern: {
        multiline: true,
      },
      ImportDeclaration: {
        multiline: true,
        minProperties: 3,
      },
      ExportDeclaration: {
        multiline: true,
        minProperties: 3,
      },
    },
  ],
  // require padding inside curly braces
  'object-curly-spacing': ['error', 'always'],
  // enforce placing object properties on separate lines
  'object-property-newline': 'error',
  // allow just one var statement per function
  'one-var': ['error', 'never'],
  // require or disallow newlines around variable declarations
  'one-var-declaration-per-line': 'error',
  // require assignment operator shorthand where possible or prohibit it entirely
  'operator-assignment': ['error', 'always'],
  // enforce operators to be placed before or after line breaks
  'operator-linebreak': [
    'error',
    'after',
    {
      overrides: {
        '?': 'before',
        ':': 'before',
      },
    },
  ],
  // enforce padding within blocks
  'padded-blocks': ['error', 'never'],
  // require or disallow padding lines between statements
  'padding-line-between-statements': [
    'error',
    {
      blankLine: 'always',
      next: 'return',
      prev: '*',
    },
  ],
  // disallow using Object.assign with an object literal as the first argument and prefer
  // the use of object spread instead
  'prefer-object-spread': 'error',
  // require quotes around object literal property names
  'quote-props': [
    'error',
    'as-needed',
    {
      keywords: false,
      unnecessary: false,
      numbers: true,
    },
  ],
  // specify whether double or single quotes should be used
  quotes: [
    'error',
    'single',
    {
      allowTemplateLiterals: true,
    },
  ],
  // Require JSDoc comment
  'require-jsdoc': 'off',
  // require or disallow use of semicolons instead of ASI
  semi: ['error', 'always'],
  // enforce spacing before and after semicolons
  'semi-spacing': [
    'error',
    {
      before: false,
      after: true,
    },
  ],
  // enforce location of semicolons
  'semi-style': ['error', 'last'],
  // require object keys to be sorted
  'sort-keys': 'off',
  // sort variables within the same declaration block
  'sort-vars': 'off',
  // require or disallow space before blocks
  'space-before-blocks': ['error', 'always'],
  // require or disallow space before function opening parenthesis
  'space-before-function-paren': [
    'error',
    {
      anonymous: 'always',
      named: 'never',
    },
  ],
  // require or disallow spaces inside parentheses
  'space-in-parens': ['error', 'never'],
  // require spaces around operators
  'space-infix-ops': 'error',
  // Require or disallow spaces before/after unary operators
  'space-unary-ops': [
    'error',
    {
      words: true,
      nonwords: false,
    },
  ],
  // require or disallow a space immediately following the // or /* in a comment
  'spaced-comment': ['error', 'always'],
  // enforce spacing around colons of switch statements
  'switch-colon-spacing': [
    'error',
    {
      after: true,
      before: false,
    },
  ],
  // require or disallow spacing between template tags and their literals
  'template-tag-spacing': 'error',
  // require or disallow the Unicode BOM
  'unicode-bom': ['error', 'never'],
  // require regex literals to be wrapped in parentheses
  'wrap-regex': 'off',

  // Disallows unused variables.
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': ['warn'],

  // Disallows the use of console.
  'no-console': [
    'error',
    {
      allow: ['warn', 'error'],
    },
  ],
};
