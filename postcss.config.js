let plugins = {};

if (!process.env.MINIFY) {
  plugins = {
    "postcss-import": {},
    "postcss-nested": {},
    tailwindcss: {},
    "postcss-preset-env": { stage: 0, browsers: "last 2 versions" },
  };
}

if (process.env.MINIFY) {
  plugins = {
    ...plugins,
    cssnano: {},
  };
}

module.exports = { plugins };
