const path = require('./path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [`${path.src}/index.js`],

  plugins: [
    new CleanWebpackPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.public,
          to: 'assets',
          noErrorOnMissing: true,
        },
      ],
    }),

    new HTMLWebpackPlugin({
      template: `${path.src}/index.html`,
      favicon: `${path.public}/images/favicon.png`,
    }),
  ],

  resolve: {
    modules: [path.src, 'node_modules'],
    extensions: ['.js', '.mjs', '.jsx'],
    alias: {
      '@': path.src,
      assets: path.public,
    },
  },

  module: {
    rules: [
      {
        test: /\.(m?js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif|ico)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/inline',
      },
    ],
  },
};
