import jwtDecode from 'jwt-decode';

import {
  get,
  isEmpty,
} from 'lodash/fp';

import {
  stringify,
} from 'querystring';

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
import loadAccounts from 'store/accounts/saga';
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

  const cookie = get(`signedCookies[${process.env.COOKIE_ACCESS_NAME}]`, req);
  if (!isEmpty(cookie)) {
    try {
      const {
        exp,
      } = jwtDecode(cookie);

      if (exp * 1000 < new Date().getTime()) {
        return res.redirect('/token/refresh');
      }

      store.dispatch(receiveToken(cookie));
    } catch (e) {
      console.error(e);
      return res.redirect('/error?code=500');
    }
  }

  const refreshCookie = get(`signedCookies[${process.env.COOKIE_REFRESH_NAME}]`, req);
  if (!isEmpty(refreshCookie)) {
    const query = stringify({
      redirect: req.originalUrl,
    });
    return res.redirect(`/token/refresh?${query}`);
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
				const renderComponent = (
					<HTML
						store={store}
						renderProps={renderProps}
					/>
				);

        webpack_isomorphic_tools.refresh();
				res.write('<!doctype HTML>');
				res.write(renderToString(renderComponent));
				res.status(200).end();
			}).catch((error) => {
				res.write(error).status(500).end();
			});
		} else {
			return res.status(404).redirect('/');
		}
	});
}
