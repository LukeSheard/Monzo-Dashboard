import http from 'http';
import {
  isEmpty,
} from 'lodash/fp';

import app from './app';

let server;
export function start() {
  const {
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
    STATE_TOKEN,
    GOOGLE_API_KEY,
    PORT,
  } = process.env;

  [
    ['CLIENT_ID', CLIENT_ID],
    ['CLIENT_SECRET', CLIENT_SECRET],
    ['REDIRECT_URI', REDIRECT_URI],
    ['STATE_TOKEN', STATE_TOKEN],
    ['GOOGLE_API_KEY', GOOGLE_API_KEY],
  ].forEach(([name, variable]) => {
    if (isEmpty(variable)) {
      console.error(`${name} is not set`);
      process.exit(1);
    }
  });

  server = http.createServer(app).listen(PORT, (err) => {
    if (err) {
      server.close();
      console.error(err);
      process.exit(1);
    }

    console.info(`==> 🌎  Listening on port ${PORT}. Open up http://localhost:${PORT}/ in your browser.`);
  });
}

export function close() {
  if (server) {
    server.close();
  }
}
