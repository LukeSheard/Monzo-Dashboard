import {
  combineReducers,
} from 'redux';

import {
  routerReducer as routing,
} from 'react-router-redux';

import {
  reducer as form,
} from 'redux-form';

import accounts from 'store/accounts/duck';
import session from 'store/session/duck';

const rootReducer = combineReducers({
  // App State
  accounts,
  session,

  // Library State
  form,
  routing,
});

export default rootReducer;
