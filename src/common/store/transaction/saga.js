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
  push,
} from 'react-router-redux';

import {
  get,
} from 'lodash/fp';

import {
  attemptToRetrieveTransaction,
  failureToRetrieveTransaction,
  successToRetrieveTransaction,
} from './duck';

import {
  getTransactionId,
} from './selectors';

export default function * loadTransaction(action) {
  console.log('yo?');

  if (get('payload.redirect', action)) {
    yield put(push({
      pathname: '/dashboard/transactions',
      query: {
        id: get('payload.id', action),
      },
    }));
  }

  const id = yield select(getTransactionId);

  if (id) {
    try {
      const response = yield call(
        sendGet,
        `/transactions/${id}`,
        {
          'expand[]': 'merchant',
        }
      );

      return yield put(successToRetrieveTransaction(response));
    } catch (e) {
      console.error(e);
      return yield put(failureToRetrieveTransaction(e));
    }
  }

  return false;
}

export function * watcher() {
  return yield [
    takeLatest(attemptToRetrieveTransaction().type, loadTransaction),
  ];
}
