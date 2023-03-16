module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    serviceworker: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-plugin-prettier/recommended',
  ],
  plugins: ['import'],
  parserOptions: {
    ecmaVersion: 2020,

    // This line enables eslint for *.ts files
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'import/order': [
      1,
      {
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        groups: ['external', 'internal', ['parent', 'sibling', 'index']],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],

    'prettier/prettier': 'error',
    '@typescript-eslint/no-var-requires': 0,
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
