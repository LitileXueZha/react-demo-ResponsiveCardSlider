import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["src/**/*.{js,jsx}"],
    ignores: ['dist/**/*', 'webpack/', 'webpack.config.js'],
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  {
    settings: {
      react: {version: 'detect'},
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        // ...globals.node,
        __DEV__: 'readonly',
      },
    },
    rules: {
      'react/prop-types': 'off',
    },
  },
];
