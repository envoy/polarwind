const plugins = [];

if (!process.env.PURGE && !process.env.MINIFY) {
  plugins.push(
    require("postcss-preset-env")({ stage: 0, browsers: "last 2 versions" }),
    require("postcss-import"),
    require("postcss-nested"),
    require("tailwindcss")
  );
}

if (process.env.PURGE) {
  plugins.push(
    require("@fullhuman/postcss-purgecss")({
      content: ["./build/index.esm.js"],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    })
  );
}

if (process.env.MINIFY) {
  plugins.push(require("cssnano"));
}

module.exports = { plugins };
