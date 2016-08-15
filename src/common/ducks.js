import {
  combineReducers,
} from 'redux';

import {
  routerReducer as routing,
} from 'react-router-redux';

import {
  Reducer as session,
} from 'pages/App';

import {
  Reducer as accounts,
} from 'pages/Dashboard';

const rootReducer = combineReducers({
  // App State
  accounts,
  session,

  // Library State
  routing,
});

export default rootReducer;
