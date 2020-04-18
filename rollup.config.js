import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import postcssImport from "postcss-import";
import postcssNested from "postcss-nested";
import tailwindcss from "tailwindcss";
import packageJson from "./package.json";

export default [
  {
    external: ["react", "prop-types"],
    input: "src/index.js",
    plugins: [
      resolve(),
      babel({ exclude: "node_modules/**" }),
      commonjs(),
      postcss({
        extract: "build/polarwind.full.css",
        config: false, // don't use the config file. that'll be used by the postcss-cli
        plugins: [postcssImport, postcssNested, tailwindcss],
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
