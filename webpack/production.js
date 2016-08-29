import Webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default (config) => {
  config.merge({
    entry: [
      'babel-polyfill',
      './src/client',
    ],
  });

  config.plugin('uglify', Webpack.optimize.UglifyJsPlugin, [{
    mangle: true,
    comments: false,
    compress: true,
    preamble: '(c) 2016 Luke Sheard',
  }]);

  config.plugin('optimize', Webpack.optimize.OccurenceOrderPlugin, [
    true,
  ]);

  config.plugin('ExtractTextPlugin', ExtractTextPlugin, [
    'style.css'
  ]);

  config.loader('images', {
    test: /\.(png|jpg|gif|ico|svg)$/,
    loader: 'url',
    query: {
      limit: 10240,
    },
  });

  config.loader('sass', {
    test: /\.(scss|sass)$/,
    loader: ExtractTextPlugin.extract(
      'style',
      'css?modules&localIdentName=[path][name]__[local]--[hash:base64:3]!postcss!sass',
    ),
  });

  config.loader('css', {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract(
      'style',
      'css!postcss'
    ),
  });

  config.loader('js', {
    test: /\.jsx?$/,
    loader: 'babel',
    exclude: /node_modules/,
  });

  return config;
}
