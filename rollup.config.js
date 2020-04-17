import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

const formats = ["esm", "umd"];
const plugins = [
  peerDepsExternal(),
  postcss(),
  babel({ exclude: "node_modules/**" }),
  commonjs(),
];
const globals = { react: "React" };

export default [
  {
    input: "src/index.js",
    plugins,
    output: formats.map((format) => ({
      file: `dist/index.${format}.js`,
      format,
      globals,
      name: "polarwind", // required for umd bundles
    })),
  },
];
