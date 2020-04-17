import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";

const formats = ["esm", "umd"];
const plugins = [babel({ exclude: "node_modules/**" }), commonjs()];
const globals = { react: "React" };

export default [
  {
    input: "src/index.js",
    plugins,
    external: ["react"],
    output: formats.map((format) => ({
      file: `dist/index.${format}.js`,
      format,
      globals,
      name: "polarwind", // required for umd bundles
    })),
  },
];
