import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import postcssImport from "postcss-import";
import tailwindcss from "tailwindcss";
import packageJson from "./package.json";

export default [
  {
    input: "src/index.js",
    plugins: [
      peerDepsExternal(),
      babel({ exclude: "node_modules/**" }),
      commonjs(),
      postcss({
        extract: "build/polarwind.full.css",
        config: false, // don't use the config file. that'll be used by the postcss-cli
        plugins: [postcssImport, tailwindcss],
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
        globals: { react: "React" },
        name: "polarwind",
      },
    ],
  },
];
