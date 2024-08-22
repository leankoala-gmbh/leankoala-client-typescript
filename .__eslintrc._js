module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jest/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint', 'jest'],
  rules: {
    semi: ['error', 'never'],
    'import/namespace': 'off',
    'no-use-before-define': 'off',
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'off',
    'node/no-deprecated-api': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'object-curly-spacing': 'error',
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
    'comma-dangle': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-case-declarations': 'off',
    camelcase: 'off',
    curly: 0,
    'indent': ['error', 2, {
      'SwitchCase': 1,
      'VariableDeclarator': 'first',
      'outerIIFEBody': 1,
      'MemberExpression': 1,
      'FunctionDeclaration': {'parameters': 'first'},
      'FunctionExpression': {'parameters': 'first'},
      'CallExpression': {'arguments': 'first'},
      'ArrayExpression': 'first',
      'ObjectExpression': 'first',
      'ImportDeclaration': 'first',
      'flatTernaryExpressions': false,
      'ignoreComments': false
    }],
    'dot-notation': 0,
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    'eqeqeq': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'quotes': ['error', 'single'],
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error'
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:jest/recommended']
    }
  ]
};
