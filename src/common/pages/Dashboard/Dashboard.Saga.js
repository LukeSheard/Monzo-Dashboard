import {
  takeLatest,
} from 'redux-saga';

import {
  call,
  put,
  select,
} from 'redux-saga/effects';

import {
  get,
} from 'api';

import {
  attemptToRetrieveAccounts,
  failureToRetrieveAccounts,
  successToRetrieveAccounts
} from './Dashboard.Duck';

export function * loadAccounts() {
  try {
    const {
      accounts,
    } = yield call(
      get,
      '/accounts'
    );

    return yield put(successToRetrieveAccounts(accounts));
  } catch (e) {
    console.error(e);
    return yield put(failureToRetrieveAccounts(e));
  }
}

export default function * () {
  return yield [
    takeLatest(attemptToRetrieveAccounts.type, loadAccounts),
  ];
}
