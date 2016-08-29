import webpack from 'webpack';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import {
  webpackIsomorphicToolsConfig,
} from './config';

const {
  NODE_ENV,
} = process.env;

const _ENV_ = NODE_ENV || 'development';
const _DEV_ = _ENV_ !== 'production';

const isomorphicPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig).development(_DEV_);

export default (config) => {
  config.merge({
    devtool: 'inline-source-map',
    debug: true,
    entry: [
      'babel-polyfill',
      'webpack-hot-middleware/client',
      './src/client',
    ],
  });

  config.plugin('hotmodule', webpack.HotModuleReplacementPlugin);

  config.loader('sass', {
    test: isomorphicPlugin.regular_expression('sass'),
    loaders: [
      'style',
      'css?modules&localIdentName=[path][name]__[local]--[hash:base64:3]',
      'postcss',
      'sass',
    ],
  });

  config.loader('css', {
    test: isomorphicPlugin.regular_expression('css'),
    loaders: [
      'style',
      'css',
      'postcss',
    ],
  });

  config.loader('js', {
    test: /\.jsx?$/,
    loaders: [
      'react-hot',
      'babel',
    ],
    exclude: /node_modules/,
  });

  return config;
}
