const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const port = process.env.PORT || 3000;

const commonCssLoaderOptions = {
  importLoaders: 2,
  url: false
};

const cssLoaderOptions = {
  ...commonCssLoaderOptions,
  modules: false
};

const scssLoaderOptions = {
  ...commonCssLoaderOptions,
  modules: true,
  localIdentName: '[local]--[hash:base64:5]'
};

const postCssLoaderOptions = {
  ident: 'postcss',
  plugins: () => [
    autoprefixer(),
  ],
};

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/index.js'],
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.[hash].js'
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(css)$/,
        include: path.resolve(__dirname, './src'),
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: cssLoaderOptions },
        ],
      },
      {
        test: /\.(scss)$/,
        include: path.resolve(__dirname, './src'),
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: scssLoaderOptions },
          { loader: 'postcss-loader', options: postCssLoaderOptions },
          { loader: 'sass-loader' },
        ],
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    })
  ],
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true,
    hot: true,
  }
};
