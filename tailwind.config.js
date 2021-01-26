const hexRgb = require("hex-rgb");
const config = require("tailwindcss/defaultConfig");

function rgba(hex, alpha) {
  const { blue, green, red } = hexRgb(hex);
  return `rgba(${[red, green, blue, alpha]})`;
}

module.exports = {
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",

      white: "#fff",

      carbon: {
        5: "#f6f6f9",
        10: "#ebebf0",
        20: "#c9cbd4",
        30: "#a4a9b6",
        40: "#8a8f9e",
        50: "#717684",
        60: "#5c6270",
        70: "#3f4450",
        80: "#303541",
        90: "#1f232d",
      },
      cilantro: {
        5: "#dffbe6",
        10: "#c7f5d2",
        20: "#96e3a9",
        30: "#4ec176",
        40: "#21944e",
        50: "#018940",
        60: "#017939",
      },
      gem: {
        5: "#f0f4ff",
        10: "#e0e8ff",
        20: "#bdcdff",
        30: "#8fa5ff",
        40: "#7083ff",
        50: "#6161ff",
        60: "#4e4eda",
        70: "#4141a2",
        80: "#31317c",
        90: "#1f1f51",
      },
      papaya: {
        5: "#fff3d1",
        10: "#ffe7bd",
        20: "#ffc67a",
        30: "#ff8f33",
        40: "#f76902",
        50: "#c25700",
        60: "#a84f00",
      },
      pistachio: {
        60: "#587000",
        50: "#6a7e07",
        40: "#8e9d01",
        30: "#b8be04",
        20: "#d3d236",
        10: "#f0ef94",
        5: "#f8f8af",
      },
      red: {
        40: "#fa4338",
        50: "#e91c1c",
        60: "#c70a14",
        70: "#a00c1f",
      },
    },
    // typography configs are based on
    // https://github.com/envoy/garaje/blob/jon/style-guide-updates/app/styles/_type.scss
    fontFamily: {
      sans: [
        "SofiaPro",
        '"Helvetica Neue"',
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 600,
    },
    lineHeight: {
      none: 1,
      skinny: 1.15,
      tight: 1.25,
      normal: 1.5,
    },
    // it's hard to extend boxShadow since it needs the complete string including color,
    // which is why the best place to define it is by overriding the entire boxShadow
    // theme
    boxShadow: (theme) => ({
      default: "0px 1px 2px rgba(0, 0, 0, 0.08)",
      none: "none",
      medium: "0px 2px 4px rgba(0, 0, 0, 0.08)",
      large: "0px 4px 8px rgba(0, 0, 0, 0.12)",
      xl: "0px 4px 16px rgba(0, 0, 0, 0.16)",
      outline: `0 0 0 2px ${theme("colors.arctic.default")}`,
      "outline-brand": `0 0 0 2px ${rgba(theme("colors.brand.default"), 0.3)}`,
      "outline-toggle": `0 0 0 2px ${theme("colors.carbon.20%")}`,
      "input-pacific": [
        `0 0 0 1px ${theme("colors.pacific.default")}`,
        `0 1px 4px 0 ${rgba(theme("colors.pacific.default"), 0.16)}`,
      ].join(),
      "input-honeycomb": [
        `0 0 0 1px ${theme("colors.honeycomb.default")}`,
        `0 1px 4px 0 ${rgba(theme("colors.honeycomb.default"), 0.16)}`,
      ].join(),
      "input-blur-honeycomb": `0 0 0 1px ${theme("colors.honeycomb.default")}`,
      "checkbox-inset": [
        "inset 0px 1px 1.5px rgba(0, 0, 0, 0.26)",
        "inset 0px -1px 1.5px rgba(0, 0, 0, 0.1)",
      ].join(),
      toggle: "0px 2px 6px rgba(0, 0, 0, 0.48)",
    }),
    extend: {
      borderRadius: {
        checkbox: "0.1875rem",
        page: "0.625rem",
      },
      borderWidth: {
        checkbox: "0.5px",
        6: "6px",
      },
      flex: {
        fill: "1 0",
      },
      gridTemplateColumns: {
        banner: "1rem minmax(auto, 40em)",
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
        2.75: "0.6666rem",
      },
    },
    customForms: (theme) => ({
      default: {
        "input, textarea, select": {
          color: theme("colors.carbon.100%"),
          borderColor: theme("colors.arctic.default"),
          borderRadius: theme("borderRadius.md"),
          "&:focus, &.focused:enabled:not(.error)": {
            boxShadow: theme("boxShadow.input-pacific"), // defined in TextField.module.css due to complex requirement with error state
            borderColor: theme("colors.pacific.default"),
          },
          "&.error": {
            borderColor: theme("colors.honeycomb.default"),
            boxShadow: theme("boxShadow.input-blur-honeycomb"),
            "&:focus": {
              boxShadow: theme("boxShadow.input-honeycomb"),
            },
          },
        },
        "input, textarea, checkbox, select": {
          "&:disabled": {
            color: theme("colors.carbon.80%"),
            "-webkit-text-fill-color": theme("colors.carbon.80%"),
            borderColor: theme("colors.arctic.default"),
            backgroundColor: theme("colors.arctic.50%"),
          },
        },
        "input, textarea": {
          paddingTop: theme("spacing.2"),
          paddingRight: theme("spacing.2"),
          paddingBottom: theme("spacing.2"),
          paddingLeft: theme("spacing.2"),
          "&::placeholder": {
            color: theme("colors.carbon.20%"),
            lineHeight: "normal",
          },
        },
        input: {
          "&[type=search]": {
            borderRadius: theme("borderRadius.full"),
            paddingLeft: theme("spacing.8"),
          },
        },
        checkbox: {
          color: theme("colors.pacific.default"),
          borderRadius: theme("borderRadius.checkbox"),
          borderColor: theme("colors.carbon.checkbox"),
          boxShadow: theme("boxShadow.checkbox-inset"),
          borderWidth: theme("borderWidth.checkbox"),
          "&:checked": {
            boxShadow: "none",
          },
          "&:focus": {
            boxShadow: theme("boxShadow.checkbox-inset"),
            borderColor: theme("colors.carbon.checkbox"),
          },
          "&:focus:checked": {
            boxShadow: theme("boxShadow.outline"),
            borderColor: theme("colors.pacific.default"),
          },
          "&:indeterminate": {
            background:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='8' height='2' x='4' y='7' rx='1'/%3E%3C/svg%3E\");",
            borderColor: "transparent",
            backgroundColor: "currentColor",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            boxShadow: "none",
          },
          "&:focus:indeterminate": {
            boxShadow: theme("boxShadow.outline"),
          },
          // fix for :disabled overriding the :checked backgroundColor
          "&:checked:disabled": {
            backgroundColor: "currentColor",
            borderColor: "currentColor",
          },
        },
        select: {
          iconColor: theme("colors.carbon.50%"),
          paddingTop: theme("spacing")["2.75"],
          paddingBottom: theme("spacing")["2.75"],
        },
      },
    }),
  },
  variants: {
    borderRadius: [...config.variants.borderRadius, "first", "last"],
    borderWidth: [...config.variants.borderWidth, "hover"],
    margin: [...config.variants.margin, "first"],
  },
  plugins: [
    require("@tailwindcss/custom-forms"),
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
