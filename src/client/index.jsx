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

import configureRoutes from 'routes';
import configureStore from 'store';

const mountNode = document.getElementById('react-mount');

const initialState = window.INITIAL_STATE || {};

const store = configureStore(browserHistory, initialState);
const history = syncHistoryWithStore(browserHistory, store);
const routes = configureRoutes(store);

match({
  routes,
  history,
}, (error, redirectLocation, renderProps) => {
  render((
    <Provider store={store} >
      <Router {...renderProps} />
    </Provider>
  ), mountNode);
});
