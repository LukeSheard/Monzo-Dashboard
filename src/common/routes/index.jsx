import React from 'react';

import {
  IndexRoute,
  Redirect,
  Route,
} from 'react-router';

// Helmets
import userIsAuthenticated from 'helmets/user-is-authenticated';
import userIsNotAuthenticated from 'helmets/user-is-not-authenticated';

// Contexts
import App from 'views/app';
import Dashboard from 'views/dashboard';
import Public from 'views/public';

// Views
import About from 'pages/about';
import Login from 'pages/login';
import NotFound from 'pages/not-found';
import Settings from 'pages/settings';
import SignOut from 'pages/sign-out';
import TransactionList from 'pages/transaction-list';

export default (store) => {
  const connect = (fn) => (nextState, replace) => fn(store, nextState, replace);

  return (
    <Route path="/" component={App}>
      <Route component={Public} >
        <IndexRoute
          component={Login}
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
