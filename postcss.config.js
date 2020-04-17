// This config file is to be used exclusively by the postcss-cli in a postdist script. The
// reason for this is that purgecss was confused trying to analyze css in use by css
// modules during the rollup process. We keep it separate now.
//
// Step 1: Rollup will use postcss-import and tailwindcss to transpile the entire CSS and
// output to dist/polarwind.css
// Step 2: postcss-cli will run PurgeCSS and minification.
//
// Additionally, PurgeCSS seems to have issues trying to work against a minified file, so
// we couldn't minify during Step 1.

const purge = process.env.PHASE === "purge";
const minify = process.env.PHASE === "minify";

const options = {
  purgecss: {
    content: ["./dist/index.esm.js"],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  },
  cssnano: {},
};

module.exports = {
  plugins: {
    "@fullhuman/postcss-purgecss": purge ? options.purgecss : false,
    cssnano: minify ? options.cssnano : false,
  },
};
