const webpack = require('webpack');
const path = require('path');

const root = path.resolve(__dirname, '../');
const src = path.join(root, 'src');
const dist = path.join(root, 'dist');

const MODE = process.env.NODE_ENV; // development, production
console.log('building ' + MODE + ' release');
const DEBUG = true;

module.exports = {
  entry: './src/index.js',
  mode: MODE,
  resolve: {
    alias: {},
    modules: [src + '/js', 'libs', 'node_modules'],
    extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
  },
  output: {
    path: dist,
    filename: 'jollygoodgame-pbs.js',
    library: 'jollygoodgame-pbs',
    libraryTarget: 'umd',
  },
  stats: 'normal', // minimal, none, normal, verbose ::: https://webpack.js.org/configuration/stats/
  externals: [
    {
      Phaser: { commonjs: 'Phaser', commonjs2: 'Phaser', root: 'Phaser' },
      '@jollywise/jollygoodgame': {
        commonjs: '@jollywise/jollygoodgame',
        commonjs2: '@jollywise/jollygoodgame',
        root: '@jollywise/jollygoodgame',
      },
      webfontloader: {
        commonjs: 'webfontloader',
        commonjs2: 'webfontloader',
        root: 'webfontloader',
      },
    },
    // Using this to trace out modules : how I discovered I needed Phaser not phaser
    // https://webpack.js.org/configuration/externals/#function
    function (context, request, callback) {
      console.log(context, request);
      // if (/^Phaser$/.test(request)) {
      //   return callback(null, 'commonjs ' + request);
      // }
      callback();
    },
  ],
  devtool: process.env.NODE_ENV === 'development' ? 'none' : 'source-map',
  plugins: [],
};
