import path from 'path';
import Webpack from 'webpack';

const {
  authUrl,
  baseUrl,
  GOOGLE_API_KEY,
  NODE_ENV,
} = process.env;

const _ENV_ = NODE_ENV || 'development';

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
  });

  config.plugin('definePlugin', Webpack.DefinePlugin, [{
    'process.env': JSON.stringify({
      authUrl,
      baseUrl,
      GOOGLE_API_KEY,
      NODE_ENV: _ENV_,
    }),
  }]);

  config.preLoader('lint', {
    test: /\.jsx?$/,
    loader: 'eslint-loader',
    exclude: /node_modules/,
  });

  return config;
};