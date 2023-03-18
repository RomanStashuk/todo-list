const StylelintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { merge } = require('webpack-merge');

const path = require('./path');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',

  output: {
    path: path.build,
    filename: 'js/[name].bundle.js',
    // publicPath: '/',
  },

  devServer: {
    open: true,
    hot: true,
    port: 8080,
  },

  plugins: [
    new StylelintPlugin({
      files: `${path.src}/**/*.(sass|scss|css)`,
    }),

    new ESLintPlugin({
      extensions: ['.js', '.mjs', '.jsx'],
      emitWarning: true,
      files: path.src,
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
});
