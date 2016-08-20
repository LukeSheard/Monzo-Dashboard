import {
  fork,
} from 'redux-saga/effects';

import Saga, {
  watcher as watchToRetrieveAccounts,
} from 'store/accounts/saga';

export default function * () {
  return yield [
    fork(Saga),
    fork(watchToRetrieveAccounts),
  ];
}
