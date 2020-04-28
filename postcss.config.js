let plugins = {};

if (!process.env.PURGE && !process.env.MINIFY) {
  plugins = {
    ...plugins,
    "postcss-preset-env": { stage: 0, browsers: "last 2 versions" },
    "postcss-import": {},
    "postcss-nested": {},
    tailwindcss: {},
  };
}

if (process.env.PURGE) {
  plugins = {
    ...plugins,
    "@fullhuman/postcss-purgecss": {
      content: ["./build/index.esm.js"],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    },
  };
}

if (process.env.MINIFY) {
  plugins = {
    ...plugins,
    cssnano: {},
  };
}

module.exports = { plugins };
