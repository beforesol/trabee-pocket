const path = require('path');
const SuperEasySpriter = require('easy-spriter').SuperEasySpriter;

const spriter = new SuperEasySpriter({
  mode: 'svg',
  entry: path.resolve(__dirname, 'sprites'),
  publicPath: '/',
  output: {
    sprite: '/assets/img/sprite',
    scss: path.resolve(__dirname, 'scss')
  },
  options: {
    filePrefix: '_sp_',
    bgRootUrl: '/assets/img/sprite'
  }
});

spriter.compile(() => {
  console.log('sprite done!');
});
