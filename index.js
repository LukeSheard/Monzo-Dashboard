// Convet ES6 with babel to ES5 to run server and handle JSX
require('babel-register');
require('babel-polyfill');

// Load user configuration
require('dotenv').config({
  silent: true,
});
require('dotenv').config({
  path: './.env-default',
});

// Start the Server
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const webpackIsomorphicToolsConfig = require('./webpack/config').webpackIsomorphicToolsConfig;

const _DEV_ = (process.env.NODE_ENV || 'development') === 'development';
global.webpack_isomorphic_tools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfig)
  .development(_DEV_)
  .server(__dirname, () => {
    require('server').start();
  });
