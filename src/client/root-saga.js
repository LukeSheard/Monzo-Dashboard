import {
  fork,
} from 'redux-saga/effects';

import {
  watcher as watchToRetrieveAccounts,
} from 'store/accounts/saga';

import loadBalance, {
  watcher as watchToRetrieveBalance,
} from 'store/balance/saga';

import loadTransactions, {
  watcher as watchToRetrieveTransactions,
} from 'store/transactions/saga';

export default function * () {
  return yield [
    /*
      Load User Data from Server
    */
    fork(loadTransactions),
    fork(loadBalance),

    /*
      Watch for User Refreshes,
    */
    fork(watchToRetrieveAccounts),
    fork(watchToRetrieveBalance),
    fork(watchToRetrieveTransactions),
  ];
}
