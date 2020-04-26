const _ = require("lodash");
const assert = require("assert");

module.exports = function ({
  infix,
  emSquare,
  ascender,
  descender,
  capitalHeight,
  lineGap,
}) {
  // convert metric to relative emSquare
  function remsq(metric) {
    return (Math.abs(metric) / emSquare).toPrecision(2);
  }

  // convert rem to capital height (px)
  function capHeight(rem) {
    return (parseFloat(rem) * 16 * remsq(capitalHeight)).toPrecision(2);
  }

  function fontSize(capHeight) {
    return (capHeight / remsq(capitalHeight)).toPrecision(2);
  }

  function lineHeight(lineHeight, capHeight) {
    return lineHeight * capHeight - valign(capHeight);
  }

  function valign(capHeight) {
    const distanceBottom = remsq(descender);
    const distanceTop = remsq(ascender) - remsq(capitalHeight);
    return ((distanceBottom - distanceTop) * fontSize(capHeight)).toPrecision(
      2
    );
  }

  function capitalHeights(theme) {
    return _.map(theme("fontSize"), (value, modifier) => {
      return [modifier, capHeight(value)];
    });
  }

  return function ({ addUtilities, theme, e, variants, config }) {
    const capHeights = capitalHeights(theme);

    const fontSizes = _.fromPairs(
      _.map(capHeights, ([modifier, capHeight]) => {
        let selector;

        if (config("corePlugins.fontSize") === false) {
          selector = ["text", modifier];
        } else {
          assert(infix, "infix required if fontSize corePlugin is enabled");
          selector = ["text", infix, modifier];
        }

        return [
          "." + e(selector.join("-")),
          {
            "font-size": fontSize(capHeight) + "px",
          },
        ];
      })
    );
    addUtilities(fontSizes, variants("fontSize"));

    // line-heights are custom per font-size
    const lineHeights = _.fromPairs(
      _.flatMap(theme("lineHeight"), (value, modifier) => {
        return _.map(capHeights, ([fontSizeModifier, capHeight]) => {
          let selector;

          if (config("corePlugins.lineHeight") === false) {
            selector = ["leading", fontSizeModifier, modifier];
          } else {
            assert(infix, "infix required if lineHeight corePlugin is enabled");
            selector = ["leading", infix, fontSizeModifier, modifier];
          }

          return [
            "." + e(selector.join("-")),
            {
              "line-height": lineHeight(value, capHeight) + "px",
            },
          ];
        });
      })
    );
    addUtilities(lineHeights, variants("lineHeight"));

    const verticalAligns = _.fromPairs(
      _.map(capHeights, ([modifier, capHeight]) => {
        return [
          `.align-${e(modifier)}`,
          {
            "vertical-align": `-${valign(capHeight)}px`,
          },
        ];
      })
    );
    addUtilities(verticalAligns, variants("verticalAlign"));
  };
};
