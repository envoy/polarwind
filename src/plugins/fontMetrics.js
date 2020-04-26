const _ = require("lodash");

module.exports = function ({
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
    return parseFloat(rem) * 16;
  }

  function fontSize(capHeight) {
    return (capHeight / remsq(capitalHeight)).toPrecision(2);
  }

  function lineHeight(lineHeight, fontSize) {
    return lineHeight * fontSize - valign(fontSize);
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

  return function ({ addUtilities, theme, e, variants }) {
    const capHeights = capitalHeights(theme);

    const fontSizes = _.fromPairs(
      _.map(capHeights, ([modifier, capHeight]) => {
        return [
          `.${e(`text-${modifier}`)}`,
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
        return _.map(capHeights, ([fontSizeModifier, fontSize]) => {
          return [
            `.${e(`leading-${fontSizeModifier}-${modifier}`)}`,
            {
              "line-height": lineHeight(value, fontSize) + "px",
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
