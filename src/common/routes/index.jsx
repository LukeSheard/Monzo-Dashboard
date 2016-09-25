import userHasTransactions from 'decorators/user-has-transactions';
import userIsAuthenticated from 'decorators/user-is-authenticated';
import userIsNotAuthenticated from 'decorators/user-is-not-authenticated';
import About from 'routes/about';
import App from 'views/app';
import Area from 'common/components/area';
import Dashboard from 'views/dashboard';
import ErrorView from 'routes/error';
import Login from 'routes/login';
import NotFound from 'routes/not-found';
import React from 'react';
import Settings from 'routes/settings';
import SignOut from 'routes/sign-out';
import TransactionList from 'routes/transaction-list';
import {
  IndexRedirect,
  IndexRoute,
  Redirect,
  Route,
} from 'react-router';

export default (store) => {
  const connect = (fn) => (nextState, replace) => fn(store, nextState, replace);

  return (
    <Route path="/" component={App}>
      <IndexRoute
        component={Login}
        onEnter={connect(userIsNotAuthenticated.onEnter)}
      />

      <Route path="about" component={About} />
      <Route path="error" component={ErrorView} />
      <Route path="not-found" component={NotFound} />

      <Route
        component={Dashboard}
        onEnter={connect(userIsAuthenticated.onEnter)}
        path="dashboard"
      >
        <IndexRedirect to="transactions" />

        <Route path="transactions" component={userHasTransactions(Area)}>
          <IndexRoute component={TransactionList} />
        </Route>

        <Route path="settings" component={Settings} />
        <Route path="sign-out" component={SignOut} />
      </Route>

      {/*
        Handle Common Thought that we login on the login page
      */}
      <Redirect from="login" to="/" />

      {/*
        Give nice UX for a not-found page
      */}
      <Redirect from="*" to="not-found" />
    </Route>
  );
};
