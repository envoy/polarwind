const path = require("path");
const { generateScopedName } = require("../src/plugins/polarisNamingStrategy");

const getLocalIdent = generateScopedName({
  prefix: "Polarwind",
  extension: ".module.css",
});

module.exports = {
  stories: ["../src/**/*.stories.@(js|mdx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "storybook-addon-playroom",
    "@storybook/addon-knobs",
  ],
  webpackFinal: (config) => {
    // Remove the existing css rule
    config.module.rules = config.module.rules.filter(
      (f) => f.test.toString() !== "/\\.css$/"
    );

    config.module.rules = config.module.rules.map((data) => {
      if (/svg\|/.test(String(data.test)))
        data.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;
      return data;
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: ["url-loader"],
    });

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

    config.module.rules[0].use[0].options.plugins = [
      require.resolve("babel-plugin-react-docgen"),
    ];

    return config;
  },
};
