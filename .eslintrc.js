module.exports = {
  env: {
    browser: true,
    es6: true,
    "jest/globals": true,
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
    "plugin:jest/recommended",
    "plugin:jest/style",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  ignorePatterns: [
    "node_modules/",
    "storybook-static/",
    "index.cjs.js",
    "index.esm.js",
    "examples/",
    "docs/",
  ],
  overrides: [
    {
      extends: ["plugin:mdx/recommended"],
      files: ["*.mdx"],
    },
    {
      files: ["*.config.js", "plopfile.js"],
      rules: {
        "sort-keys-fix/sort-keys-fix": "off",
      },
    },
  ],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["sort-destructure-keys", "sort-keys-fix", "jest"],
  rules: {
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
          caseInsensitive: true,
          order: "asc",
        },
      },
    ],

    "jsx-a11y/label-has-for": [
      2,
      {
        allowChildren: true,
      },
    ],

    "object-shorthand": ["error", "always"],
    // we use babel-plugin-react-require which injects the import React anyway
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true,
      },
    ],
    "react/react-in-jsx-scope": "off",
    "sort-destructure-keys/sort-destructure-keys": [2, { caseSensitive: true }],
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true, // to avoid clashing with import/order
        memberSyntaxSortOrder: ["all", "single", "multiple", "none"],
      },
    ],
    "sort-keys-fix/sort-keys-fix": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
