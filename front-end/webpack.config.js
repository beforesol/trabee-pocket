const webpackMerge = require('webpack-merge');

const webpackCommonConfig = require('./webpack.config.common');
const webpackDevConfig = require('./webpack.config.development');
const webpackProdConfig = require('./webpack.config.production');

const MODE = {
  DEV: 'development',
  PROD: 'production',
};

module.exports = function (env, argv) {
  const { mode } = argv;

  switch (mode) {
    case MODE.DEV:
      return webpackMerge(webpackCommonConfig, webpackDevConfig, {
        devtool: 'inline-source-map',
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json', 'scss']
        },
      });

    case MODE.PROD:
      return webpackMerge(webpackCommonConfig, webpackProdConfig);

    default:
      throw new Error('invalid MODE');
  }
};
