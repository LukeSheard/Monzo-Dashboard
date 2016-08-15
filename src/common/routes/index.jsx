import React from 'react';

import {
  IndexRoute,
  Redirect,
  Route,
} from 'react-router';

import protect from './protect';

// App Layout
import Area from 'components/Area';
import App from 'pages/App';

// Dashboard
import Dashboard from 'pages/Dashboard';
import DashboardMap from 'pages/DashboardMap';
import DashboardTransaction from 'pages/DashboardTransaction';

// Login
import Login from 'pages/Login';

// NotFound
import NotFound from 'pages/NotFound';

export default (store) => {
  const connect = (fn) => (nextState, replaceState) => fn(store, nextState, replaceState);

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Login} />

      <Route
        path="dashboard"
        component={protect(Dashboard)}
        onEnter={connect(protect.onEnter)}
      >
        <IndexRoute component={DashboardMap} />

        <Route path="transaction" component={DashboardTransaction} />
      </Route>

      <Route path="*" component={NotFound} />
    </Route>
  );
};
