import sendGet from 'api/get';

import {
  takeLatest,
} from 'redux-saga';

import {
  call,
  put,
} from 'redux-saga/effects';

import {
  primeAccount,
  attemptToRetrieveAccounts,
  failureToRetrieveAccounts,
  successToRetrieveAccounts,
} from './duck';

import loadBalance from 'store/balance/saga';

export default function * loadAccounts() {
  try {
    const response = yield call(
      sendGet,
      '/accounts'
    );

    yield [
      put(successToRetrieveAccounts(response)),
      put(primeAccount(0)),
    ];

    return yield call(loadBalance);
  } catch (e) {
    console.error(e);
    return yield put(failureToRetrieveAccounts(e));
  }
}

export function * watcher() {
  return yield [
    takeLatest(attemptToRetrieveAccounts().type, loadAccounts),
  ];
}
