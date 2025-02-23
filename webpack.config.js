var webpack = require('webpack');
var {merge} = require('webpack-merge');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
var TerserPlugin = require('terser-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');

var baseConfig = require('./webpack/index.js');

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'hidden-source-map',
  output: {
    clean: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"production"`,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    new CopyPlugin({
      patterns: ['public/favicon.ico'],
    }),
    // 配合 nginx gzip_static
    new CompressionPlugin({
      test: /\.(html|js|css|ico)$/,
      threshold: 1024,
    }),
    new webpack.SourceMapDevToolPlugin({
      append: false, // hidden source map
      filename: '[file].map',
      moduleFilenameTemplate: 'litilexuezha://[namespace]/[resource-path]?[loaders]',
    }),
  ],
  optimization: {
    chunkIds: 'deterministic',
    runtimeChunk: 'single',
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        react: {
          name: 'react',
          test: /[/\\]node_modules[/\\](react|react-dom)[/\\]/,
          reuseExistingChunk: true,
          priority: 1,
          enforce: true,
          chunks: 'all',
        },
        vendors: {
          name(module, chunks, cacheGroupKey) {
            const allChunksNames = chunks.map((item) => item.name).join('~');
            return `${cacheGroupKey}~${allChunksNames}`;
          },
          test: /[/\\]node_modules[/\\]/,
          reuseExistingChunk: true,
          enforce: true,
          chunks: 'all',
        },

      },
    },
  },
});
