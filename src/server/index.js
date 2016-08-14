import Express from 'express';
import http from 'http';
import path from 'path';

/*  ========================
    Express Setup
========================  */
const app = new Express();

/*  ========================
    WEBPACK SETUP
========================  */
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from 'webpack.config';

const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

/*  ========================
    Routing
========================  */
import router from './router';

app.use(router);

/*  ========================
    SERVER OPERATIONS
========================  */
let server;
export function start() {
  const port = process.env.PORT || 8080;

  server = http.createServer(app).listen(port, (err) => {
    if (err) {
      server.close();
      console.error(err);
      process.exit(1);
    }

    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  });
}

export function close() {
  if (server) {
    server.close();
  }
}
