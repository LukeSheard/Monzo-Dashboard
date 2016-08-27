import test from 'tape';
import loadTransactions, {
  watcher,
} from './saga';

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
  attemptToRetrieveTransactions,
  failureToRetrieveTransactions,
  successToRetrieveTransactions,
} from './duck';

import {
  getSelectedAccount,
} from 'store/accounts/selectors';

const selectedAccount = {
  id: 12355,
};

const response = {
  transactions: [
    {
      stuff: 'STUFF',
    },
  ],
};

test('Sagas: Transactions', (t) => {
  let actual;
  let expected;

  t.plan(5);

  // Saga is an iterator
  expected = 'function';
  actual = typeof loadTransactions()[Symbol.iterator];

  t.equal(
    actual, expected,
    'Saga is an iterator'
  );

  const saga = loadTransactions();

  actual = saga.next().value;
  expected = select(getSelectedAccount);
  t.deepEqual(
    actual, expected,
    'Saga should get selected account'
  );

  actual = saga.next(selectedAccount).value;
  expected = call(
    sendGet,
    '/transactions',
    {
      'expand[]': 'merchant',
      account_id: selectedAccount.id,
    }
  );
  t.deepEqual(
    actual, expected,
    'Saga should get transactions from API'
  );

  actual = saga.next(response).value;
  expected = put(successToRetrieveTransactions(response));
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

const error = 'YO STUFF';
test('Sagas: Transactions - Declined', (t) => {
  let actual;
  let expected;

  t.plan(2);

  const saga = loadTransactions();

  saga.next();
  saga.next(selectedAccount);

  actual = saga.throw(error).value;
  expected = put(failureToRetrieveTransactions(error));
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

test('Sagas: Transactions - Watcher', (t) => {
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
    call(takeLatest, attemptToRetrieveTransactions().type, loadTransactions),
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
