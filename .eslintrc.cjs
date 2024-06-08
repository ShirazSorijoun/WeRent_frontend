module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react-hooks/recommended",
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      typescript: {},
    },
  },
  plugins: ['unused-imports', 'import',"react-refresh"],
  rules: {
    'prettier/prettier': 1,
    'unused-imports/no-unused-imports': 'error',
    'react/jsx-filename-extension': [
      0,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-unused-vars': 1,
    'import/extensions': ['error', 'never'],
    'import/no-extraneous-dependencies': ['error'],
    '@typescript-eslint/no-explicit-any': 1,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
