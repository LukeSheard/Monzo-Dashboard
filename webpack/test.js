import dotenv from 'dotenv';
import Webpack from 'webpack';

dotenv.config({
  silent: true,
});
dotenv.config({
  path: './.env-default',
});

const {
  authUrl,
  baseUrl,
  GOOGLE_API_KEY,
} = process.env;

export default (config) => {
  const directory = process.cwd();

  config.merge({
    output: {
      libraryTarget: 'commonjs2',
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
  });

  config.loader('sass', {
    test: /\.scss$/,
    loaders: [
      'style',
      'css?modules&localIdentName=[path][name]__[local]--[hash:base64:3]',
      'postcss',
      'sass',
    ],
  });

  config.loader('css', {
    test: /\.css$/,
    loaders: [
      'style',
      'css',
      'postcss',
    ],
  });

  config.plugin('definePlugin', Webpack.DefinePlugin, [{
    'process.env': JSON.stringify({
      authUrl,
      baseUrl,
      GOOGLE_API_KEY,
      NODE_ENV: 'test',
    }),
  }]);

  return config;
}
