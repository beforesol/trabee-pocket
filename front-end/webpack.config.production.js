const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
  },
  plugins: [
    new CopyWebpackPlugin([
      {from:'public/img/sprite',to:'public/img/sprite'}
    ]),
  ]
};
