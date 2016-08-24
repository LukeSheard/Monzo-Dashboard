import cookieParser from 'cookie-parser';
import Express from 'express';

/*  ========================
    Express Setup
========================  */
const {
  COOKIE_SECRET,
} = process.env;
const app = new Express();
app.use(cookieParser(COOKIE_SECRET));

/*  ========================
    WEBPACK SETUP
========================  */
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from 'webpack.config.babel'; // eslint-disable-line import/no-unresolved

const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));
app.use(webpackHotMiddleware(compiler));

/*  ========================
    Routing
========================  */
import token from './token';
import render from './render';

app.use('/token', token);
app.use(render);

export default app;
