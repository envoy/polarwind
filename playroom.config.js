const { generateScopedName } = require("./src/plugins/polarisNamingStrategy");

const getLocalIdent = generateScopedName({
  prefix: "Polarwind",
  extension: ".module.css",
});

module.exports = {
  components: "./src",
  outputPath: "./docs/playroom",
  widths: [
    600, // min-width of contentContainer in garaje
    1300, // max-width of contentContainer in garaje
  ],
  exampleCode: `
    <Page title="Settings">
      <Button>Hello</Button>
    </Page>
  `,
  openBrowser: false,
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
        {
          test: /\.svg$/,
          exclude: /node_modules/,
          use: "url-loader",
        },
      ],
    },
  }),
};
