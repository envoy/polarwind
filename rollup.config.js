const resolve = require("@rollup/plugin-node-resolve");
const babel = require("rollup-plugin-babel");
const commonjs = require("rollup-plugin-commonjs");
const postcss = require("rollup-plugin-postcss");
const packageJson = require("./package.json");
const { generateScopedName } = require("./src/plugins/polarisNamingStrategy");

module.exports = [
  {
    external: ["react", "prop-types"],
    input: "src/index.js",
    plugins: [
      resolve(),
      babel(),
      commonjs(),
      postcss({
        modules: {
          generateScopedName: generateScopedName({
            prefix: "Polarwind",
            extension: ".module.css",
          }),
        },
        extract: "build/polarwind.css",
      }),
    ],
    output: [
      {
        file: `build/${packageJson.module}`,
        format: "esm",
      },
      {
        file: `build/${packageJson.main}`,
        format: "umd",
        name: "polarwind",
        globals: { react: "React", "prop-types": "PropTypes" },
      },
    ],
  },
];
