import React from 'react';

import {
  IndexRoute,
  Redirect,
  Route,
} from 'react-router';

// Helmets
import protect from './protect';
import redirect from './redirect';

// App Layout
import Area from 'components/Area';
import Window from 'pages/Window';

// Dashboard
import Account from 'pages/Account';
import Dashboard from 'pages/Dashboard';
import DashboardMap from 'pages/DashboardMap';
import DashboardTransaction from 'pages/DashboardTransaction';

// Login
import Login from 'pages/Login';

// NotFound
import NotFound from 'pages/NotFound';

// Settings
import Settings from 'pages/Settings';

export default (store) => {
  const connect = (fn) => (nextState, replaceState) => fn(store, nextState, replaceState);

  return (
    <Route path="/" component={Window}>
      <IndexRoute
        component={redirect(Login)}
        onEnter={connect(redirect.onEnter)}
      />

      <Route
        component={protect(Account)}
        onEnter={connect(protect.onEnter)}
      >
        <Route path="dashboard" component={Dashboard}>
          <IndexRoute component={DashboardMap} />

          <Route path="transaction" component={DashboardTransaction} />
        </Route>

        <Route path="settings" component={Settings} />
      </Route>

      <Route path="*" component={NotFound} />
    </Route>
  );
};
