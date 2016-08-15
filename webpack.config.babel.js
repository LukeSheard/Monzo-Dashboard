import path from 'path';
import webpack from 'webpack';
import webpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import {
  webpackIsomorphicToolsConfig
} from './config';
// import ExtractTextPlugin from 'extract-text-webpack-plugin';

const isomorphicPlugin = new webpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig).development();

const {
  authUrl,
  baseUrl,
} = process.env;

const config = {
  context: path.resolve('./'),
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
    publicPath: '/static/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        authUrl,
        baseUrl,
      }),
    }),
    isomorphicPlugin,
  ],
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
      },
    ],
    loaders: [
      {
        test: isomorphicPlugin.regular_expression('style'),
        loaders: [
          'isomorphic-style',
          'css?modules&localIdentName=[name]_[local]_[hash:base64:3]',
          'postcss'
        ],
      },
      {
        test: /\.jsx?$/,
        loaders: [
          'react-hot',
          'babel'
        ],
        include: path.join(__dirname, 'src'),
      },
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
      '.css',
    ],
  }
}

module.exports = config;
