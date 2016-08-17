import {
  get,
} from 'api';

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
  attemptToRetrieveAccounts,
  failureToRetrieveAccounts,
  successToRetrieveAccounts
} from './Account.Duck';

export function * loadAccounts() {
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

export default function * () {
  return yield [
    takeLatest(attemptToRetrieveAccounts.type, loadAccounts),
  ];
}
