import webpackMultiConfigurator from 'webpack-multi-configurator';

const {
  NODE_ENV,
} = process.env;

import baseMixin from './webpack/base';
import developmentMixin from './webpack/development';

const config = webpackMultiConfigurator()
.define('base')
  .append(baseMixin)
.define('development')
  .append('base')
  .append(developmentMixin)
.create(NODE_ENV)
.otherwise('development')
.resolve()[0];

export default config;
