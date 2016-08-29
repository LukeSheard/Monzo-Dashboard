import webpackMultiConfigurator from 'webpack-multi-configurator';

import baseMixin from './webpack/base';
import developmentMixin from './webpack/development';
import productionMixin from './webpack/production';

const config = webpackMultiConfigurator()
.define('base')
  .append(baseMixin)
.define('development')
  .append('base')
  .append(developmentMixin)
.define('production')
  .append('base')
  .append(productionMixin)
.create(process.env)
.include(process.env.NODE_ENV)
.otherwise('development')
.resolve()[0];

export default config;
