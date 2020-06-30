const path = require("path");
const { generateScopedName } = require("../src/plugins/polarisNamingStrategy");

const getLocalIdent = generateScopedName({
  prefix: "Polarwind",
  extension: ".module.css",
});

module.exports = {
  stories: ["../src/**/*.stories.(js|mdx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "storybook-addon-playroom",
  ],
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
            modules: {
              getLocalIdent: (context, _localIdentName, localName) => {
                return getLocalIdent(localName, context.resourcePath);
              },
            },
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
