const webpack = require('webpack');

const port = process.env.PORT || 8080;

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    host: '0.0.0.0',
    port,
    historyApiFallback: true,
    open: true,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8001',
        changeOrigin: true
      }
    }
  }
};
