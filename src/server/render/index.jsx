import jwtDecode from 'jwt-decode';

import React from 'react';

import {
  renderToString,
} from 'react-dom/server'

import {
  createMemoryHistory,
  match,
} from 'react-router';

import {
  syncHistoryWithStore,
} from 'react-router-redux';

import configureRoutes from 'routes';
import configureStore from 'store';
import {
  receiveToken,
} from 'store/session/duck';

import HTML from 'server/html';
import waitForAll from './waitForAll';

export default (req, res) => {
  const memory = createMemoryHistory(req.url);
  const store = configureStore(memory);
  const routes = configureRoutes(store);
  const history = syncHistoryWithStore(memory, store);

  const cookieName = process.env.COOKIE_NAME;
  if (req.signedCookies && req.signedCookies[cookieName]) {
    const {
      issueToken,
      refreshToken,
    } = JSON.parse(req.signedCookies[cookieName]);

    const {
      exp,
    } = jwtDecode(issueToken);

    if (exp * 1000 < new Date().getTime()) {
      return res.redirect('/api/refresh');
    }

    store.dispatch(receiveToken(issueToken));
  }

  match({
    history,
    routes,
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      return res.status(500).send(error.message);
    } else if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const preloaders = renderProps.components
        .filter((component) => component && component.preload)
        .map((component) => component.preload(renderProps.params, req))
        .reduce((result, results) => result.concat(results), []);

      const renderSagas = waitForAll(preloaders);

      return store.runSaga(renderSagas).done.then(() => {
        webpack_isomorphic_tools.refresh();

        const renderComponent = (
          <HTML
            store={store}
            renderProps={renderProps}
          />
        );

        res.write('<!doctype HTML>');
        res.write(renderToString(renderComponent));
        res.status(200).end();
      });
    } else {
      return res.status(404).redirect('/');
    }
  });
}
