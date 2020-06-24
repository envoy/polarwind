const { generateScopedName } = require("./src/plugins/polarisNamingStrategy");

const getLocalIdent = generateScopedName({
  prefix: "Polarwind",
  extension: ".module.css",
});

module.exports = {
  components: "./src/components",
  outputPath: "./dist/playroom",
  frameComponent: "./playroom/FrameComponent.js",
  exampleCode: `
    <Page title="Settings">
      <Button>Hello</Button>
    </Page>
  `,
  webpackConfig: () => ({
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
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
            {
              loader: "postcss-loader",
            },
          ],
        },
      ],
    },
  }),
};
