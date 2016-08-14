// Convet ES6 with babel to ES5 to run server and handle JSX
require('babel-register');
require('babel-polyfill');

// Load user configuration
require('dotenv').config();
require('dotenv').config({
  path: './.env.default',
});

// Start the Server
require('server').start();
