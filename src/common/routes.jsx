import React from 'react';

import {
  get,
} from 'lodash/fp';

import {
  IndexRoute,
  Redirect,
  Route,
} from 'react-router';

import {
  routerActions,
} from 'react-router-redux';

import {
  UserAuthWrapper as authWrapper,
} from 'redux-auth-wrapper';

import Area from 'components/Area';

// App Layout
import App from 'containers/App';

// Login Redirects
import Login from 'containers/Login';

// Dashboard
import DashboardAccounts from 'containers/DashboardAccounts';
import DashboardTransaction from 'containers/DashboardTransaction';

const protect = authWrapper({
  // Selectors
  authSelector: state => get('session.data.token', state),
  predicate: authData => get('token.exp', authData) * 1000 > new Date().getTime(),

  // Redirect Options
  allowRedirectBack: false,
  failureRedirectPath: '/',
  redirectAction: routerActions.replace,

  // Wrapper Options
  wrapperDisplayName: 'DashboardProtection',
});

export default (store) => {
  const connect = (fn) => (nextState, replaceState) => fn(store, nextState, replaceState);

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Login} />

      <Route
        path="dashboard"
        component={protect(Area)}
        onEnter={connect(protect.onEnter)}
      >
        <IndexRoute component={DashboardAccounts} />

        <Route path="transaction(/:id)" component={DashboardTransaction} />
      </Route>

      <Redirect from="*" to="/" />
    </Route>
  );
}
