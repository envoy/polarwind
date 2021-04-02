const hexRgb = require("hex-rgb");

function rgba(hex, alpha) {
  const { blue, green, red } = hexRgb(hex);
  return `rgba(${[red, green, blue, alpha]})`;
}

module.exports = {
  presets: [require("@envoy/tailwind")],
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
    customForms: (theme) => ({
      default: {
        "input, textarea, select": {
          color: theme("colors.carbon.70"),
          borderColor: theme("colors.carbon.10"),
          borderRadius: theme("borderRadius.md"),
          "&:focus, &.focused:enabled:not(.error)": {
            boxShadow: theme("boxShadow.input-gem"), // defined in TextField.module.css due to complex requirement with error state
            borderColor: theme("colors.gem.50"),
          },
          "&.error": {
            borderColor: theme("colors.papaya.50"),
            boxShadow: theme("boxShadow.input-blur-papaya"),
            "&:focus": {
              boxShadow: theme("boxShadow.input-papaya"),
            },
          },
        },
        "input, textarea, checkbox, select": {
          "&:disabled": {
            color: theme("colors.carbon.60"),
            "-webkit-text-fill-color": theme("colors.carbon.60"),
            borderColor: theme("colors.carbon.10"),
            backgroundColor: theme("colors.carbon.5"),
          },
        },
        "input, textarea": {
          paddingTop: theme("spacing.2"),
          paddingRight: theme("spacing.2"),
          paddingBottom: theme("spacing.2"),
          paddingLeft: theme("spacing.2"),
          "&::placeholder": {
            color: theme("colors.carbon.20"),
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
          color: theme("colors.gem.50"),
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
            borderColor: theme("colors.gem.50"),
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
          iconColor: theme("colors.carbon.40"),
          paddingTop: theme("spacing")["2.75"],
          paddingBottom: theme("spacing")["2.75"],
        },
      },
    }),
  },
  variants: {
    borderRadius: ({ after }) => after(["first", "last"]),
    borderWidth: ({ after }) => after(["hover"]),
    margin: ({ after }) => after(["first"]),
    textColor: ({ after }) => after(["active"]),
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
    mode: "layers",
    content: ["./src/**/*.js"],
    options: {
      ...(process.env.STORYBOOK && {
        whitelistPatterns: [/^bg-/], // preserve bg- utilities for colors.stories.js
      }),
    },
  },
};
