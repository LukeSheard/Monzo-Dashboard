// Convet ES6 with babel to ES5 to run server and handle JSX
require('babel-register');
require('babel-polyfill');
require('isomorphic-fetch');

// Load user configuration
require('dotenv').config();
require('dotenv').config({
  path: './.env.default',
});

// Start the Server
const webpackIsomorphicTools = require('webpack-isomorphic-tools');
const webpackIsomorphicToolsConfig = require('./config').webpackIsomorphicToolsConfig;

const _DEV_ = (process.env.NODE_ENV || 'development') === 'development';
global.webpack_isomorphic_tools = new webpackIsomorphicTools(webpackIsomorphicToolsConfig)
  .development(_DEV_)
  .server(__dirname, () => {
    require('server').start();
  });
