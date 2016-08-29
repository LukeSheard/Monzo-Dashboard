import path from 'path';
import Webpack from 'webpack';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import {
  webpackIsomorphicToolsConfig,
} from './config';

const {
  authUrl,
  baseUrl,
  GOOGLE_API_KEY,
  NODE_ENV,
} = process.env;

const _ENV_ = NODE_ENV || 'development';
const _DEV_ = _ENV_ !== 'production';

const isomorphicPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig).development(_DEV_);

export default (config) => {
  const directory = process.cwd();

  config.merge({
    eslint: {
      configFile: './.eslintrc.yml',
    },
    output: {
      path: path.join(directory, 'dist'),
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
        '.html',
        '.scss',
        '.css',
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

  config.plugin('optimize', Webpack.optimize.OccurenceOrderPlugin, [
    true,
  ]);

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

  return config;
};
