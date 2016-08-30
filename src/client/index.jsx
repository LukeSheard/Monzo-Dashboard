import React from 'react';

import {
  browserHistory,
  match,
  Router,
} from 'react-router';

import {
  Provider,
} from 'react-redux';

import {
  syncHistoryWithStore,
} from 'react-router-redux';

import {
  render,
} from 'react-dom';

import {
  addLocaleData,
  IntlProvider,
} from 'react-intl';
import en from 'react-intl/locale-data/en';

import configureRoutes from 'routes';
import configureStore from 'store';
import rootSaga, {
  preloadSagas,
} from 'client/root-saga';

import './style.css';

addLocaleData(en);

const mountNode = document.getElementById('react-mount');

const initialState = window.INITIAL_STATE || {};

const store = configureStore(browserHistory, initialState);
const history = syncHistoryWithStore(browserHistory, store);
const routes = configureRoutes(store);

store.runSaga(preloadSagas).done.then(() => {
  match({
    routes,
    history,
  }, (error, redirectLocation, renderProps) => {
    store.runSaga(rootSaga);

    render((
      <Provider store={store} >
        <IntlProvider locale="en">
          <Router {...renderProps} />
        </IntlProvider>
      </Provider>
    ), mountNode);
  });
});
