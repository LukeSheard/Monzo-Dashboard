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
  attemptToRetrieveBalance,
  failureToRetrieveBalance,
  successToRetrieveBalance,
} from './duck';

import {
  getSelectedAccount,
} from 'store/accounts/selectors';

export default function * loadBalance() {
  try {
    const selectedAccount = yield select(getSelectedAccount);

    const response = yield call(
      sendGet,
      '/balance',
      {
        account_id: selectedAccount.id,
      }
    );

    return yield put(successToRetrieveBalance(response));
  } catch (e) {
    console.error(e);
    return yield put(failureToRetrieveBalance(e));
  }
}

export function * watcher() {
  return yield [
    takeLatest(attemptToRetrieveBalance().type, loadBalance),
  ];
}
