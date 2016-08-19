import {
  get,
} from 'api';

import {
  takeLatest,
} from 'redux-saga';

import {
  call,
  put,
} from 'redux-saga/effects';

import {
  attemptToRetrieveAccounts,
  failureToRetrieveAccounts,
  successToRetrieveAccounts
} from './duck';

export default function * loadAccounts() {
  try {
    const response = yield call(
      get,
      '/accounts'
    );

    return yield put(successToRetrieveAccounts(response.accounts));
  } catch (e) {
    console.error(e);
    return yield put(failureToRetrieveAccounts(e));
  }
}

export function * watcher() {
  return yield [
    takeLatest(attemptToRetrieveAccounts.type, loadAccounts),
  ];
}
