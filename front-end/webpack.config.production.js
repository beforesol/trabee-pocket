const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        exclude: ['/src/**/*.test.ts'],
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'public/img/sprite', to: 'public/img/sprite' }
    ]),
    new BundleAnalyzerPlugin({
      defaultSizes: 'gzip',
    })
  ]
};
