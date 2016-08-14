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

import HTML from './Html';
import waitForAll from './waitForAll';

export default (req, res) => {
  const memory = createMemoryHistory(req.url);
  const store = configureStore(memory);
  const routes = configureRoutes(store);
  const history = syncHistoryWithStore(memory, store);

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
        .reduce((result, preloader) => result.concat(preloader), []);

      const renderSagas = waitForAll(preloaders);

      return store.runSaga(renderSagas).done.then(() => {
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
