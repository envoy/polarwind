const { babel } = require("@rollup/plugin-babel");
const image = require("@rollup/plugin-image");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const postcss = require("rollup-plugin-postcss");
const packageJson = require("./package.json");
const { generateScopedName } = require("./src/plugins/polarisNamingStrategy");

const externalPackages = [
  "react",
  "classnames",
  "react-autosize-textarea",
  "react-is",
  "prop-types",
  "object-assign",
];

module.exports = [
  {
    external: (id) =>
      externalPackages.includes(id) ||
      id.includes("react-aria") ||
      id.includes("react-stately"),
    input: "src/index.js",
    plugins: [
      resolve(),
      babel({ babelHelpers: "bundled" }),
      commonjs(),
      postcss({
        modules: {
          generateScopedName: generateScopedName({
            prefix: "Polarwind",
            extension: ".module.css",
          }),
        },
        extract: "polarwind.css",
        minimize: true,
      }),
      image(),
    ],
    output: [
      {
        file: packageJson.module,
        format: "esm",
      },
      {
        file: packageJson.main,
        format: "cjs",
      },
    ],
  },
];
