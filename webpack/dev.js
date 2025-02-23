var {merge} = require('webpack-merge');
var baseConfig = require('./index.js');

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    filename: 'js/[name].js',
  },
  devtool: 'eval-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 8008,
    hot: true,
    compress: false,
    historyApiFallback: {},
    static: {
      publicPath: '/react-demo-ResponsiveCardSlider',
    },
  },
});
