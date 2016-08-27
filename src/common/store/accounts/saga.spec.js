import test from 'tape';
import loadAccounts, {
  watcher,
} from './saga';

import sendGet from 'api/get';

import {
  takeLatest,
} from 'redux-saga';

import {
  call,
  put,
} from 'redux-saga/effects';

import {
  primeAccount,
  attemptToRetrieveAccounts,
  failureToRetrieveAccounts,
  successToRetrieveAccounts,
} from './duck';

import loadBalance from 'store/balance/saga';

const response = {
  data: 'DATA!!',
};

test('Sagas: Accounts - Success', (t) => {
  let actual;
  let expected;

  t.plan(4);

  // Saga is an iterator
  expected = 'function';
  actual = typeof loadAccounts()[Symbol.iterator];

  t.equal(
    actual, expected,
    'Saga is an iterator'
  );

  const saga = loadAccounts();

  actual = saga.next().value;
  expected = call(sendGet, '/accounts');
  t.deepEqual(
    actual, expected,
    'Saga should make request to get accounts'
  );

  actual = saga.next(response).value;
  expected = [
    put(successToRetrieveAccounts(response)),
    put(primeAccount(0)),
    call(loadBalance),
  ];
  t.deepEqual(
    actual, expected,
    'Saga should put data to state'
  );

  actual = saga.next().done;
  expected = true;
  t.equal(
    actual, expected,
    'Saga should be done'
  );

  t.end();
});

test('Sagas: Accounts - failure', (t) => {
  let actual;
  let expected;

  t.plan(2);

  const saga = loadAccounts();

  saga.next();

  const error = 'Error';
  actual = saga.throw('error').value;
  expected = put(failureToRetrieveAccounts(error));
  t.deepEqual(
    actual, expected,
    'Saga should put error to state'
  );

  actual = saga.next().done;
  expected = true;
  t.equal(
    actual, expected,
    'Saga should be done'
  );

  t.end();
});

test('Sagas: Accounts - Watcher', (t) => {
  let actual;
  let expected;

  t.plan(3);

  // Saga is an iterator
  expected = 'function';
  actual = typeof watcher()[Symbol.iterator];

  t.equal(
    actual, expected,
    'Saga is an iterator'
  );

  const saga = watcher();

  // TODO: Implement this task
  actual = saga.next().value;
  expected = [
    call(takeLatest, attemptToRetrieveAccounts().type, loadAccounts),
  ];
  t.deepEqual(
    actual, expected,
    'Saga should take all attempt actions'
  );

  actual = saga.next().done;
  expected = true;
  t.equal(
    actual, expected,
    'Saga should be done'
  );

  t.end();
});
