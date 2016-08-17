import {
  get,
} from 'api';

import {
  Selectors as accountSelectors,
} from 'pages/Account';

import {
  loadAccounts,
} from 'pages/Account/Account.Saga';

import {
  push,
} from 'react-router-redux';

import {
  takeLatest,
} from 'redux-saga';

import {
  call,
  put,
  select,
} from 'redux-saga/effects';

import {
  attemptToRetrieveTransactions,
  failureToRetrieveTransactions,
  successToRetrieveTransactions,
  viewTransactions,
} from './Dashboard.Duck';

export function * loadTransactions() {
  try {
    const selectedAccount = yield select(accountSelectors.getSelectedAccount);

    const response = yield call(
      get,
      '/transactions',
      {
        account_id: selectedAccount.id,
        'expand[]': 'merchant',
      }
    );

    return yield put(successToRetrieveTransactions(response.transactions));
  } catch (e) {
    console.error(e);
    return yield put(failureToRetrieveTransactions(e));
  }
}

export default function * () {
  return yield [
    takeLatest(attemptToRetrieveTransactions.type, loadTransactions),
  ];
}
