import React from 'react';

import {
  // IndexRedirect,
  IndexRoute,
  Redirect,
  Route,
} from 'react-router';

// decorators
import userIsAuthenticated from 'decorators/user-is-authenticated';
import userIsNotAuthenticated from 'decorators/user-is-not-authenticated';

// // Area Component
// import Area from 'components/area';

// Contexts
import App from 'views/app';
import Dashboard from 'views/dashboard';
import Public from 'views/public';

// Views
import About from 'routes/about';
import Login from 'routes/login';
import NotFound from 'routes/not-found';
import Settings from 'routes/settings';
import SignOut from 'routes/sign-out';
import Transactions from 'routes/transactions';

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
        <IndexRoute component={Transactions} />

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
