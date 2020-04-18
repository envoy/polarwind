module.exports = {
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",

      black: "#000",
      white: "#fff",

      slate: {
        100: "#f4f4f4",
        200: "#e9e8e8",
        300: "#d3d2d2",
        400: "#918f8f",
        500: "#706d6e",
        600: "#4f4c4d",
        700: "#231f20",
      },
      red: {
        100: "#ffeceb",
        200: "#ff7c73",
        300: "#ff4438",
        400: "#c52015", // hover state in sketch
        500: "#a00c1f",
      },
      purple: {
        100: "#ececf5",
        200: "#a09cde",
        300: "#5d45d7",
        400: "#3e32ac",
      },
      green: {
        100: "#e8f4ed",
        200: "#5dc486",
        300: "#20944e",
        400: "#0a652e",
      },
      yellow: {
        100: "#fcf4ea",
        200: "#f7c277",
        300: "#f2a53f",
        400: "#bc781f",
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
    fontSize: {
      xxs: "10px",
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "20px",
      xl: "24px",
      "2xl": "32px",
      "3xl": "48px",
      "4xl": "72px",
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      normal: 1.5,
    },
    borderRadius: {
      default: "6px",
    },
    spacing: {
      7: "7px",
      8: "8px",
      9: "9px",
      10: "10px",
      11: "11px",
      13: "13px",
      16: "16px",
      19: "19px",
      24: "24px",
      32: "32px",
    },
    // it's hard to extend boxShadow since it needs the complete string including color,
    // which is why the best place to define it is by overriding the entire boxShadow
    // theme
    boxShadow: {
      red: "0 2px 8px 0 rgba(255, 68, 56, 0.3)",
      "hover-red": "0 2px 12px 0 rgba(255, 68, 56, 0.3)",
      "outline-red": "0 0 0 3px rgba(255, 68, 56, 0.3)",
    },
  },
  variants: {},
  plugins: [],
};
