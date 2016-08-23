import {
  fork,
} from 'redux-saga/effects';

import {
  watcher as watchToRetrieveAccounts,
} from 'store/accounts/saga';

import loadBalance, {
  watcher as watchToRetrieveBalance,
} from 'store/balance/saga';

import loadTransaction, {
  watcher as watchToRetrieveTransaction,
} from 'store/transaction/saga';

import loadTransactions, {
  watcher as watchToRetrieveTransactions,
} from 'store/transactions/saga';

/*
  Load User Data from Server
*/
export function * preloadSagas() {
  return yield [
    fork(loadTransaction),
    fork(loadTransactions),
    fork(loadBalance),
  ];
}

/*
  Watch for User Refreshes,
*/
export default function * () {
  return yield [
    fork(watchToRetrieveAccounts),
    fork(watchToRetrieveBalance),
    fork(watchToRetrieveTransaction),
    fork(watchToRetrieveTransactions),
  ];
}
