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
  plugins: [],
  rules: {
    "react/react-in-jsx-scope": "off", // we use babel-plugin-react-require which injects the import React anyway
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
