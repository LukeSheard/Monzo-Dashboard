/*
  Test Setup
*/
import test from 'tape';
import rootSaga, {
  preloadSagas,
} from './root-saga';

/*
  Imports from Module
*/
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

test('Sagas: Root Saga', (t) => {
  let actual;
  let expected;

  t.plan(2);

  // Saga is an iterator
  expected = 'function';
  actual = typeof rootSaga()[Symbol.iterator];

  t.equal(
    actual, expected,
    'Saga is an iterator'
  );

  const saga = rootSaga();

  expected = [
    fork(watchToRetrieveAccounts),
    fork(watchToRetrieveBalance),
    fork(watchToRetrieveTransactions),
  ];
  actual = saga.next().value;
  t.deepEqual(
    actual, expected,
    'Saga watches for actions'
  );

  t.end();
});

test('Sagas: Preload Saga', (t) => {
  let actual;
  let expected;

  t.plan(2);

  // Saga is an iterator
  expected = 'function';
  actual = typeof preloadSagas()[Symbol.iterator];

  t.equal(
    actual, expected,
    'Saga is an iterator'
  );

  const saga = preloadSagas();

  expected = [
    fork(loadTransactions),
    fork(loadBalance),
  ];
  actual = saga.next().value;
  t.deepEqual(
    actual, expected,
    'Saga collects data from Mondo api'
  );
});
