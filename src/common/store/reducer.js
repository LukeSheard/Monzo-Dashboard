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
import balance from 'store/balance/duck';
import session from 'store/session/duck';
import transactions from 'store/transactions/duck';

const rootReducer = combineReducers({
  // App State
  accounts,
  balance,
  session,
  transactions,

  // Library State
  form,
  routing,
});

export default rootReducer;
