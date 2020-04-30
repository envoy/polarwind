module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "plugin:jsx-a11y/strict",
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["sort-destructure-keys", "sort-keys-fix"],
  rules: {
    "react/react-in-jsx-scope": "off", // we use babel-plugin-react-require which injects the import React anyway
    "jsx-a11y/label-has-for": [
      2,
      {
        allowChildren: true,
      },
    ],
    "import/no-anonymous-default-export": [
      "error",
      {
        allowArray: true,
      },
    ],
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "sort-destructure-keys/sort-destructure-keys": [2, { caseSensitive: true }],
    "sort-keys-fix/sort-keys-fix": "error",
  },
  ignorePatterns: [
    "node_modules/",
    "storybook-static/",
    "index.umd.js",
    "index.esm.js",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [
    {
      files: ["*.mdx"],
      extends: ["plugin:mdx/recommended"],
    },
  ],
};
