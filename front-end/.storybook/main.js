const path = require('path');
const root = path.resolve(__dirname, '../');
const alias = {
  '@modules': `${root}/src/modules`,
  '@model': `${root}/src/model`,
  '@hooks': `${root}/src/hooks`,
  '@constants': `${root}/src/constants`,
  '@config': `${root}/src/config`,
  '@api': `${root}/src/api`,
  '@components': `${root}/src/components`,
  '@pages': `${root}/src/pages`,
  '@utils': `${root}/src/utils`,
  '@types': `${root}/src/utils`,
  'sprite': `${root}/src/sprite/scss`,
  '@public': `${root}/public`
}

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

module.exports = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
      },
    },
    {
      test: /\.(css)$/,
      include: path.resolve(__dirname, '../public/css'),
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader', options: cssLoaderOptions },
      ],
    },
    {
      test: /\.(scss)$/,
      include: path.resolve(__dirname, '../src'),
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader', options: scssLoaderOptions },
        { loader: 'sass-loader' },
      ],
    },
    {
      test: /\.(scss)$/,
      include: path.resolve(__dirname, '../node_modules'),
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader', options: commonCssLoaderOptions },
        { loader: 'sass-loader' },
      ],
    }
    );
    config.resolve.alias = {
      ...config.resolve.alias,
      ...alias
    };

    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
