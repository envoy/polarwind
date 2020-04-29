import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import packageJson from "./package.json";
import path from "path";

export default [
  {
    external: ["react", "prop-types"],
    input: "src/index.js",
    plugins: [
      resolve(),
      babel({ exclude: "node_modules/**" }),
      commonjs(),
      postcss({
        modules: {
          generateScopedName: (name, filename, css) => {
            const i = css.indexOf("." + name);
            const line = css.substr(0, i).split(/[\r\n]/).length;
            const file = path.basename(filename, ".css");

            return `_${file}_${line}_${name}`;
          },
        },
        extract: "build/polarwind.full.css",
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
