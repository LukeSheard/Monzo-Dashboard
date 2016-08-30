import webpack from 'webpack';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import {
  webpackIsomorphicToolsConfig,
} from './config';

const isomorphicPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig).development(true);

export default (config) => {
  config.merge({
    devtool: 'inline-source-map',
    debug: true,
    entry: [
      'babel-polyfill',
      'webpack-hot-middleware/client',
      './src/client',
    ],
    eslint: {
      configFile: './.eslintrc.yml',
    },
    plugins: [
      isomorphicPlugin,
    ],
  });

  config.plugin('hotmodule', webpack.HotModuleReplacementPlugin);

  config.preLoader('lint', {
    test: /\.jsx?$/,
    loader: 'eslint-loader',
    exclude: /node_modules/,
  });

  config.loader('images', {
    test: isomorphicPlugin.regular_expression('images'),
    loader: 'url',
    query: {
      limit: 10240,
    },
  });

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
};
