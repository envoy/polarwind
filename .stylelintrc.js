module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-css-modules",
    "stylelint-config-prettier",
  ],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["tailwind", "screen"],
      },
    ],
    "at-rule-empty-line-before": [
      "always",
      {
        ignoreAtRules: ["apply"],
      },
    ],
  },
};
