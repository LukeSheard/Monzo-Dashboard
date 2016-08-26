import test from 'tape';
import loadBalance, {
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
  attemptToRetrieveBalance,
  failureToRetrieveBalance,
  successToRetrieveBalance,
} from './duck';

import {
  getSelectedAccount,
} from 'store/accounts/selectors';

const id = 12345;
const selectedAccount = {
  id,
};
const responseGood = {
  data: 'yay!',
};
const responseBad = {
  data: 'Nooo!',
};

test('Sagas: Balance - success', (t) => {
  let actual;
  let expected;

  t.plan(5);

  // Saga is an iterator
  expected = 'function';
  actual = typeof loadBalance()[Symbol.iterator];

  t.equal(
    actual, expected,
    'Saga is an iterator'
  );

  const saga = loadBalance();

  actual = saga.next().value;
  expected = select(getSelectedAccount);
  t.deepEqual(
    actual, expected,
    'Saga should get account from state'
  );

  actual = saga.next(selectedAccount).value;
  expected = call(
    sendGet,
    '/balance',
    {
      account_id: id,
    }
  );
  t.deepEqual(
    actual, expected,
    'Saga should make request'
  );

  actual = saga.next(responseGood).value;
  expected = put(successToRetrieveBalance(responseGood));
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

test('Sagas: Balance - Failure', (t) => {
  let actual;
  let expected;

  t.plan(3);

  const saga = loadBalance();

  actual = saga.next().value;
  expected = select(getSelectedAccount);
  t.deepEqual(
    actual, expected,
    'Saga should get account from state'
  );

  actual = saga.throw(responseBad).value;
  expected = put(failureToRetrieveBalance(responseBad));
  t.deepEqual(
    actual, expected,
    'Saga should put failure to state'
  );

  actual = saga.next().done;
  expected = true;
  t.equal(
    actual, expected,
    'Saga should be done'
  );

  t.end();
});

test('Sagas: Balance - Watcher', (t) => {
  let actual;
  let expected;

  t.plan(2);

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
    takeLatest(attemptToRetrieveBalance().type, loadBalance),
  ];
  // t.deepEqual(
  //   actual, expected,
  //   'Saga should take all attempt actions'
  // );

  actual = saga.next().done;
  expected = true;
  t.equal(
    actual, expected,
    'Saga should be done'
  );

  t.end();
});
