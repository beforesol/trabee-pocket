const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
var CopyWebpackPlugin = require('copy-webpack-plugin');

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
  mode: 'production',
  entry: ['@babel/polyfill', './src/index.js'],
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
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
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new CopyWebpackPlugin([
      {from:'public/img/sprite',to:'public/img/sprite'}
    ]),
  ]
};
