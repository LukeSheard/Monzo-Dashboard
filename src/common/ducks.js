import {
  combineReducers,
} from 'redux';

import {
  routerReducer as routing,
} from 'react-router-redux';

import {
  Reducer as session,
} from 'pages/Window';

import {
  Reducer as account,
} from 'pages/Account';

import {
  Reducer as transactions,
} from 'pages/Dashboard';

const rootReducer = combineReducers({
  // App State
  account,
  session,
  transactions,

  // Library State
  routing,
});

export default rootReducer;
