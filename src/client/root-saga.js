import {
  fork,
} from 'redux-saga/effects';

import {
  watchToRetrieveAccounts,
} from 'contexts/dashboard';

export default function * () {
  return yield [
    fork(watchToRetrieveAccounts),
  ];
}
