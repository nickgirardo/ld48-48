const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.html$/,
        use: { loader: 'html-loader' },
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
  watchOptions: {
    ignored: /node_modules/,
  },
};
