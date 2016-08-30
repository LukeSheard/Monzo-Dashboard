import path from 'path';
import Webpack from 'webpack';

require('dotenv').config({
  silent: true,
});
require('dotenv').config({
  path: './.env-default',
});

const {
  authUrl,
  baseUrl,
  GOOGLE_API_KEY,
  NODE_ENV,
} = process.env;

const _ENV_ = NODE_ENV || 'development';
const _DEV_ = _ENV_ !== 'production';

import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import {
  webpackIsomorphicToolsConfig,
} from './config';

const isomorphicPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig).development(_DEV_);

export default (config) => {
  const directory = process.cwd();

  config.merge({
    output: {
      path: path.resolve(directory, 'dist'),
      filename: 'bundle.js',
      publicPath: '/static/',
    },
    resolve: {
      modulesDirectories: [
        `${directory}/src`,
        `${directory}/src/common`,
        'node_modules',
      ],
      extensions: [
        '',
        '.js',
        '.jsx',
      ],
    },
    plugins: [
      isomorphicPlugin,
    ],
  });

  config.plugin('definePlugin', Webpack.DefinePlugin, [{
    'process.env': JSON.stringify({
      authUrl,
      baseUrl,
      GOOGLE_API_KEY,
      NODE_ENV: _ENV_,
    }),
  }]);

  return config;
};
