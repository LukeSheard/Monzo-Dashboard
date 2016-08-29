import cookieParser from 'cookie-parser';
import Express from 'express';
import path from 'path';

/*  ========================
    Express Setup
========================  */
const {
  COOKIE_SECRET,
  NODE_ENV,
} = process.env;
const app = new Express();
app.use(cookieParser(COOKIE_SECRET));

/*  ========================
    WEBPACK SETUP
========================  */
import webpack from 'webpack';

if (NODE_ENV !== 'production') {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('webpack.config.babel'); // eslint-disable-line import/no-unresolved

  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
} else {
  const staticDir = path.join(__dirname, '../..', 'dist');
  app.use(Express.static(staticDir));
}

/*  ========================
    Routing
========================  */
import token from './token';
import render from './render';

app.use('/token', token);
app.use(render);

export default app;
