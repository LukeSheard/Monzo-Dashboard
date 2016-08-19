import {
  combineReducers,
} from 'redux';

import {
  routerReducer as routing,
} from 'react-router-redux';

import {
  reducer as form,
} from 'redux-form';

import {
  Reducer as session,
} from 'contexts/app';

import {
  Reducer as accounts,
} from 'contexts/dashboard';

const rootReducer = combineReducers({
  // App State
  accounts,
  session,

  // Library State
  form,
  routing,
});

export default rootReducer;
