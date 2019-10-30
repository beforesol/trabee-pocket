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
  entry: ['@babel/polyfill', './src/index.js', './public/css/base.css'],
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.scss']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        include: path.resolve(__dirname, './src'),
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_module/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(css)$/,
        include: path.resolve(__dirname, './public/css'),
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
      },
      {
        test: /\.(scss)$/,
        include: path.resolve(__dirname, 'node_modules'),
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: commonCssLoaderOptions },
          { loader: 'postcss-loader', options: postCssLoaderOptions },
          { loader: 'sass-loader' },
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    })
  ],
};
