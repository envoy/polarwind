const preset = require("@envoy/tailwind");
const hexRgb = require("hex-rgb");
const resolveConfig = require("tailwindcss/resolveConfig");

const { theme } = resolveConfig(preset);

function rgba(hex, alpha) {
  const { blue, green, red } = hexRgb(hex);
  return `rgba(${[red, green, blue, alpha]})`;
}

module.exports = {
  presets: [preset],
  theme: {
    // it's hard to extend boxShadow since it needs the complete string including color,
    // which is why the best place to define it is by overriding the entire boxShadow
    // theme
    boxShadow: (theme) => ({
      default: "0px 1px 2px rgba(0, 0, 0, 0.08)",
      none: "none",
      medium: "0px 2px 4px rgba(0, 0, 0, 0.08)",
      large: "0px 4px 8px rgba(0, 0, 0, 0.12)",
      xl: "0px 4px 16px rgba(0, 0, 0, 0.16)",
      outline: `0 0 0 2px ${theme("colors.carbon.10")}`,
      "outline-red-50": `0 0 0 2px ${rgba(theme("colors.red.50"), 0.3)}`,
      "outline-toggle": `0 0 0 2px ${theme("colors.carbon.20")}`,
      "input-gem": [
        `0 0 0 1px ${theme("colors.gem.50")}`,
        `0 1px 4px 0 ${rgba(theme("colors.gem.50"), 0.16)}`,
      ].join(),
      "input-papaya": [
        `0 0 0 1px ${theme("colors.papaya.50")}`,
        `0 1px 4px 0 ${rgba(theme("colors.papaya.50"), 0.16)}`,
      ].join(),
      "input-blur-papaya": `0 0 0 1px ${theme("colors.papaya.50")}`,
      "checkbox-inset": [
        "inset 0px 1px 1.5px rgba(0, 0, 0, 0.26)",
        "inset 0px -1px 1.5px rgba(0, 0, 0, 0.1)",
      ].join(),
      toggle: "0px 2px 6px rgba(0, 0, 0, 0.48)",
    }),
    extend: {
      colors: {
        carbon: {
          // TODO: tailwind 2.x will automatically perform deep merges so it won't be
          // necessary to spread the previous values anymore
          ...theme.colors.carbon,
          checkbox: "#b4b4b4",
        },
      },
      borderRadius: {
        checkbox: "0.1875rem",
      },
      borderWidth: {
        checkbox: "0.5px",
        6: "6px",
      },
      flex: {
        fill: "1 0",
      },
      maxWidth: {
        banner: "624px",
      },
      minWidth: {
        min: "min-content",
        fit: "fit-content",
      },
      opacity: {
        40: ".4",
        65: ".65",
      },
      spacing: {
        2.5: "0.604rem",
      },
    },
  },
  variants: {
    borderRadius: ({ after }) => after(["first", "last"]),
    borderWidth: ({ after }) => after(["hover"]),
    margin: ({ after }) => after(["first"]),
    textColor: ({ after }) => after(["active"]),
  },
  plugins: [
    require("./src/plugins/fontMetrics")({
      emSquare: 1000,
      ascender: 756,
      descender: -244,
      capitalHeight: 689,
    }),
  ],
  corePlugins: {
    fontSize: false,
    lineHeight: false,
    verticalAlign: false,
    textOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    placeholderOpacity: false,
    divideOpacity: false,
  },
  purge: {
    mode: "layers",
    content: ["./src/**/*.js"],
    options: {
      ...(process.env.STORYBOOK && {
        whitelistPatterns: [/^bg-/], // preserve bg- utilities for colors.stories.js
      }),
    },
  },
  future: {
    removeDeprecatedGapUtilities: true,
  },
  experimental: {
    applyComplexClasses: true,
    extendedSpacingScale: true,
  },
};
