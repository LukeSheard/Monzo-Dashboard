import sendGet from 'api/get';

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
} from './duck';

import {
  getSelectedAccount,
} from 'store/accounts/selectors';

export default function * loadTransactions() {
  const selectedAccount = yield select(getSelectedAccount);

  try {
    const response = yield call(
      sendGet,
      '/transactions',
      {
        'expand[]': 'merchant',
        account_id: selectedAccount.id,
      }
    );

    return yield put(successToRetrieveTransactions(response));
  } catch (e) {
    console.error(e);
    return yield put(failureToRetrieveTransactions(e));
  }
}

export function * watcher() {
  return yield [
    takeLatest(attemptToRetrieveTransactions().type, loadTransactions),
  ];
}
