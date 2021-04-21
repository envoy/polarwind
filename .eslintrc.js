module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true,
    node: true,
    "jest/globals": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "plugin:jsx-a11y/strict",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:jest/recommended",
    "plugin:jest/style",
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
  plugins: ["sort-destructure-keys", "sort-keys-fix", "jest"],
  rules: {
    "react/react-in-jsx-scope": "off", // we use babel-plugin-react-require which injects the import React anyway
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true,
      },
    ],
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
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true, // to avoid clashing with import/order
        memberSyntaxSortOrder: ["all", "single", "multiple", "none"],
      },
    ],
    "sort-destructure-keys/sort-destructure-keys": [2, { caseSensitive: true }],
    "sort-keys-fix/sort-keys-fix": "error",
    "object-shorthand": ["error", "always"],
  },
  ignorePatterns: [
    "node_modules/",
    "storybook-static/",
    "index.cjs.js",
    "index.esm.js",
    "examples/",
    "docs/",
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
    {
      files: ["*.config.js", "plopfile.js"],
      rules: {
        "sort-keys-fix/sort-keys-fix": "off",
      },
    },
  ],
};
