var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var DIST = path.resolve(__dirname, '../dist');
var SRC = path.resolve(__dirname, '../src');
var DEV = process.env.NODE_ENV === 'development';

/** @type {webpack.Configuration} */
var baseConfig = {
  context: path.resolve(__dirname, '..'),
  entry: {
    main: './src/index.js',
  },
  output: {
    path: DIST,
    filename: 'js/[name].[contenthash].js',
    assetModuleFilename: 'images/[name][ext]',
    publicPath: '/',
    hashDigestLength: 6,
  },
  module: {
    // noParse: /react|react-dom/,
    rules: [{
      test: /\.m?jsx?$/,
      exclude: /node_modules/,
      include: SRC,
      use: {
        loader: 'babel-loader',
        options: {
          targets: 'defaults',
          presets: [
            '@babel/preset-env',
            ['@babel/preset-react', {
              runtime: 'automatic',
              development: DEV,
            }],
          ],
        },
      },
    },{
      test: /\.(sc|sa|c)ss$/,
      use: [
        DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {importLoaders: 2},
        },{
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [autoprefixer()],
            },
          },
        },
        'sass-loader',
      ],
    },{
      test: /\.(jpe?g|png|gif)$/,
      exclude: /node_modules/,
      type: 'asset/resource',
    },{
      test: /\.(md|txt)$/,
      exclude: /node_modules/,
      type: 'asset/source',
    },{
      test: /\.svg$/,
      exclude: /node_modules/,
      type: 'asset/inline',
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body',
      meta: {
        // 内容安全策略
        csp: {
          'http-equiv': 'Content-Security-Policy',
          content: DEV ? `default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https:` : `default-src 'self' data:; img-src 'self' data: cdn.seovx.com`,
        },
      },
    }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(DEV),
    }),
  ],
  resolve: {
    alias: {
      s: SRC,
    },
  },
};

module.exports = baseConfig;
