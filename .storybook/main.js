const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.(js|mdx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  webpackFinal: (config) => {
    // Remove the existing css rule
    config.module.rules = config.module.rules.filter(
      (f) => f.test.toString() !== "/\\.css$/"
    );

    config.module.rules.push({
      test: /\.css$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: true,
            importLoaders: 1,
          },
        },
        "postcss-loader",
      ],
      include: path.resolve(__dirname, "../"),
    });

    return config;
  },
};
