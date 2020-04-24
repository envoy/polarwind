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
      blue: {
        100: "#4141a2",
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
      tight: 1.25,
      normal: 1.5,
    },
    // it's hard to extend boxShadow since it needs the complete string including color,
    // which is why the best place to define it is by overriding the entire boxShadow
    // theme
    boxShadow: {
      none: "none",
      outline: "0 0 0 3px rgba(211, 210, 210, 0.2)",
      "outline-red": "0 0 0 3px rgba(255, 68, 56, 0.3)",
      "input-blue": "0 0 0 1px #4141a2, 0 1px 3px 0 rgba(65, 65, 162, 0.2)",
      "input-yellow": "0 0 0 1px #f2a53f, 0 1px 3px 0 rgba(242, 165, 63, 0.2)",
      "input-blur-yellow": "0 0 0 1px #f2a53f",
    },
    extend: {},
  },
  variants: {},
  plugins: [],
};
