const capsize = require("capsize")["default"];
require("lodash.product");
const _ = require("lodash");

function remtopx(remStr) {
  return parseFloat(remStr) * 16;
}

/**
 *
 * @param {Object[]} fontMetrics - font metrics keyed by each supported font weight
 */
module.exports = function (fontMetrics) {
  // generates utilities in the form of
  // capsize-<font-weight>-<font-style>-<font-size>-<line-height>
  // for example,
  // capsize-medium-normal-base-skinny
  return function f({ addUtilities, e, theme }) {
    function themeMapper(key) {
      return _.map(theme(key), (value, modifier) => ({ modifier, value }));
    }

    // generate a cartesian product for each combination
    const combinations = _.product(
      themeMapper("fontWeight"),
      ["italic", "normal"],
      themeMapper("fontSize"),
      themeMapper("lineHeight")
    );

    const utilities = _.fromPairs(
      _.compact(
        _.map(combinations, ([weight, style, size, lineHeight]) => {
          const fontMetric = fontMetrics.find(
            (metric) =>
              metric.fontWeight === weight.modifier &&
              metric.fontStyle === style
          );

          if (fontMetric) {
            const selector = [
              weight.modifier,
              style,
              size.modifier,
              lineHeight.modifier,
            ];

            /**
             * pulling out after and before here because we need to rename the before and
             * after rules to include & in the rule name.
             *
             * before,
             * {
             *   font-size: ...,
             *   "::before": { ... }
             * }
             *
             * after,
             * {
             *   font-size: ...,
             *   "&::before": { ... }
             * }
             */
            const { "::after": after, "::before": before, ...styles } = capsize(
              {
                fontMetrics: fontMetric.fontMetrics,
                fontSize: remtopx(size.value),
                leading: remtopx(lineHeight.value),
              }
            );

            return [
              ".capsize-" + e(selector.join("-")),
              {
                ...styles,
                "&::after": after,
                "&::before": before,
                fontStyle: style,
                fontWeight: weight.value,
              },
            ];
          }
        })
      )
    );

    addUtilities(utilities);
  };
};
