const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        exclude: ['/src/**/*.test.ts'],
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{ from: 'assets', to: 'assets' }]),
    // new BundleAnalyzerPlugin({
    //   defaultSizes: 'gzip',
    // })
  ]
};
