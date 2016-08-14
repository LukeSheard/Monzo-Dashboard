const path = require('path');
const webpack = require('webpack');

const config = {
  devtool: 'inline-source-map',
  debug: true,
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './src/client'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: [
          'react-hot',
          'babel'
        ],
        include: path.join(__dirname, 'src')
      }
    ]
  },
  resolve: {
    modulesDirectories: [
      `${__dirname}/src`,
      `${__dirname}/src/common`,
      'node_modules'
    ],
    extensions: [
      '',
      '.js',
      '.jsx',
      '.html',
      '.scss',
      '.css'
    ]
  }
}

module.exports = config;
