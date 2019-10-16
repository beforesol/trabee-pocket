const webpack = require('webpack');

const port = process.env.PORT || 3000;

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.[hash].js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true,
    hot: true,
  }
};
