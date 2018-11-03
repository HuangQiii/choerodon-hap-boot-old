const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const getBabelCommonConfig = require('./getBabelCommonConfig');
const getTSCommonConfig = require('./getTSCommonConfig');

const jsFileName = '[name].[hash:8].js';
const jsChunkFileName = 'chunks/[name].[chunkhash:5].chunk.js';
const cssFileName = '[name].[contenthash:8].css';
const assetFileName = 'assets/[name].[hash:8].[ext]';

const babelOptions = getBabelCommonConfig();
const tsOptions = getTSCommonConfig();

const getAssetLoader = (mimetype, limit = 10000) => ({
  loader: 'url-loader',
  options: {
    limit,
    mimetype,
    name: assetFileName,
  },
});

const webpackConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: ['./src/index.js'],
  performance: {
    hints: false,
  },
  resolve: {
    modules: ['node_modules', path.join(__dirname, '../../node_modules')],
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  resolveLoader: {
    modules: ['node_modules', path.join(__dirname, '../../node_modules')],
  },
  module: {
    noParse: [/moment.js/],
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: babelOptions,
      },
      {
        test: /\/jsx$/,
        loader: 'babel-loader',
        options: babelOptions,
      },
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'babel-loader',
          options: babelOptions,
        }, {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            compilerOptions: tsOptions,
          },
        }],
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: getAssetLoader('application/font-woff'),
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: getAssetLoader('application/font-woff'),
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: getAssetLoader('application/octet-stream'),
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: getAssetLoader('application/vnd.ms-fontobject'),
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: getAssetLoader('image/svg+xml'),
      },
      {
        test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
        use: getAssetLoader(),
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
                }),
              ],
            },
          },
          {
            loader: 'less-loader',
            options: { javascriptEnabled: true },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
                }),
              ],
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html' }),
    new CaseSensitivePathsPlugin(),
    new webpack.ProgressPlugin((percentage, msg, addInfo) => {
      const stream = process.stderr;
      if (stream.isTTY && percentage < 0.71) {
        stream.cursorTo(0);
        stream.write(`📦  ${chalk.magenta(msg)} (${chalk.magenta(addInfo)})`);
        stream.clearLine(1);
      } else if (percentage === 1) {
        /* eslint-disable */
        console.log(chalk.green('\nwebpack: bundle build is now finished.'));
        /* eslint-enable */
      }
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
};

function getWebpackCommoConfig() {
  return webpackConfig;
}

module.exports = getWebpackCommoConfig;
