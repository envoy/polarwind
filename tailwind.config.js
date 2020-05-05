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

      slate: {
        100: "#f4f4f4",
        200: "#e9e8e8",
        300: "#d3d2d2",
        400: "#c8c7c7", // border hover
        500: "#918f8f",
        600: "#706d6e",
        700: "#4f4c4d",
        800: "#231f20",
      },
      red: {
        100: "#ffeceb",
        200: "#ff7c73",
        300: "#ff4438",
        400: "#c52015", // hover state in sketch
        500: "#a00c1f",
      },
      blue: {
        100: "#4141a2",
      },
      pacific: {
        default: "#028eb7",
        dark: "#006684",
        light: "#b5dfeb",
        lightest: "#effafd",
      },
      arctic: {
        default: "#e9eaf2",
        "50%": "#f6f6f9",
      },
      honeycomb: {
        default: "#f2a53f",
        dark: "#bc781f",
        light: "#f7c277",
        lightest: "#fcf4ea",
      },
      cilantro: {
        default: "#20944e",
        dark: "#0a652e",
        light: "#52bc7c",
        lightest: "#e8f4ed",
      },
      carbon: {
        "100%": "#3f4450",
        "80%": "#646974",
        "65%": "#7e8391",
        "50%": "#999fac",
        "20%": "#d7d8de",
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
      none: "none",
      default: "0px 2px 6px rgba(0, 0, 0, 0.48)",
      outline: `0 0 0 3px ${rgba(theme("colors.slate.300"), 0.2)}`,
      "outline-red": `0 0 0 3px ${rgba(theme("colors.red.300"), 0.3)}`,
      "outline-blue": `0 0 0 3px ${rgba(theme("colors.blue.100"), 0.3)}`,
      "input-pacific": [
        `0 0 0 1px ${theme("colors.pacific.default")}`,
        `0 1px 4px 0 ${rgba(theme("colors.pacific.default"), 0.16)}`,
      ].join(),
      "input-honeycomb": [
        `0 0 0 1px ${theme("colors.honeycomb.default")}`,
        `0 1px 4px 0 ${rgba(theme("colors.honeycomb.default"), 0.16)}`,
      ].join(),
      "input-blur-honeycomb": `0 0 0 1px ${theme("colors.honeycomb.default")}`,
    }),
    extend: {
      borderWidth: {
        12: "12px",
      },
      spacing: {
        2.5: "0.604rem",
        2.75: "0.6666rem",
        3.5: "0.9165rem",
        7: "1.75rem",
        15: "3.75rem",
      },
    },
    customForms: (theme) => ({
      default: {
        "input, textarea, select": {
          color: theme("colors.carbon.100%"),
          borderColor: theme("colors.arctic.default"),
          borderRadius: theme("borderRadius.md"),
        },
        "input, textarea, checkbox, select": {
          "&:disabled": {
            color: theme("colors.slate.600"),
            borderColor: theme("colors.slate.500"),
            backgroundColor: theme("colors.slate.100"),
          },
        },
        "input, textarea": {
          paddingTop: theme("spacing.2"),
          paddingRight: theme("spacing.2"),
          paddingBottom: theme("spacing.2"),
          paddingLeft: theme("spacing.2"),
          "&::placeholder": {
            color: theme("colors.slate.500"),
          },
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
        input: {
          "&[type=search]": {
            borderRadius: theme("borderRadius.full"),
            paddingLeft: theme("spacing.8"),
          },
        },
        checkbox: {
          // fix for :indeterminate overriding the :focus borderColor
          "&:focus:indeterminate": {
            borderColor: config.theme.colors.blue[400], // pull from defaultConfig until we have a focus ring
          },
          "&:indeterminate": {
            background:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='8' height='2' x='4' y='7' rx='1'/%3E%3C/svg%3E\");",
            borderColor: "transparent",
            backgroundColor: "currentColor",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          },
          // fix for :disabled overriding the :checked backgroundColor
          "&:checked:disabled": {
            backgroundColor: "currentColor",
          },
        },
        select: {
          iconColor: theme("colors.carbon.50%"),
        },
      },
    }),
  },
  variants: {
    borderRadius: [...config.variants.borderRadius, "first", "last"],
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
  },
  purge: {
    content: ["./src/**/*.js"],
    options: {
      ...(process.env.STORYBOOK && {
        whitelistPatterns: [/^bg-/], // preserve bg- utilities for colors.stories.js
      }),
    },
  },
};
