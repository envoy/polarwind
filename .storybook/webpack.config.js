module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { modules: true, importLoaders: 1 },
          },
          {
            loader: "postcss-loader",
            options: { config: { path: "./.storybook/" } },
          },
        ],
      },
    ],
  },
};
