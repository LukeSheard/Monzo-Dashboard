import React from 'react';

import {
  IndexRoute,
  Redirect,
  Route,
} from 'react-router';

// Helmets
import userIsNotAuthenticated from './helmets/user-is-not-authenticated';

// Contexts
import App from 'contexts/app';
import Dashboard, {
  Helmet as userIsAuthenticated,
} from 'contexts/dashboard';
import Public from 'contexts/public';

// Views
import About from 'views/about';
import Login from 'views/login';
import NotFound from 'views/not-found';
import Settings from 'views/settings';
import SignOut from 'views/sign-out';
import TransactionList from 'views/transaction-list';

export default (store) => {
  const connect = (fn) => (nextState, replace) => fn(store, nextState, replace);

  return (
    <Route path="/" component={App}>
      <Route component={Public} >
        <IndexRoute
          component={userIsNotAuthenticated(Login)}
          onEnter={connect(userIsNotAuthenticated.onEnter)}
        />

        <Route path="about" component={About} />
        <Route path="not-found" component={NotFound} />
      </Route>

      <Route
        component={Dashboard}
        onEnter={connect(userIsAuthenticated.onEnter)}
        path="dashboard"
      >
        <IndexRoute component={TransactionList} />

        <Route path="settings" component={Settings} />
        <Route path="sign-out" component={SignOut} />
      </Route>

      {/*
        Handle Common Thought that we login on the login page
      */}
      <Redirect from="login" to="" />

      {/*
        Give nice UX for a not-found page
      */}
      <Redirect from="*" to="not-found" />
    </Route>
  );
};
