import test from 'tape';
import reducer, {
  initialState,
  attemptToRetrieveTransactions,
  failureToRetrieveTransactions,
  successToRetrieveTransactions,
} from './duck';

import {
  successToRetrieveAccounts,
} from 'store/accounts/duck';

test('Reducers: Transactions', (t) => {
  let action;
  let actual;
  let expected;
  t.plan(7);

  expected = {
    loading: false,
    data: [],
  };
  actual = initialState;
  t.deepEqual(
    actual, expected,
    'Initial state should have correct shape'
  );

  expected = 'function';
  actual = typeof reducer;
  t.equal(
    actual, expected,
    'Reducer should be a function'
  );

  expected = initialState;
  actual = reducer(initialState, {});
  t.deepEqual(
    actual, expected,
    'Reducer should return initial state'
  );

  action = successToRetrieveAccounts({
    accounts: {},
  });
  actual = reducer(initialState, action);
  expected = {
    ...initialState,
    loading: true,
  };
  t.deepEqual(
    actual, expected,
    'After getting transactions we load those transactions'
  );

  action = attemptToRetrieveTransactions();
  actual = reducer(initialState, action);
  expected = {
    ...initialState,
    loading: true,
  };
  t.deepEqual(
    actual, expected,
    'Reducer should return correct loading state'
  );

  const error = 'There was an error';
  action = failureToRetrieveTransactions(error);
  actual = reducer(initialState, action);
  expected = {
    ...initialState,
    loading: false,
    error,
  };
  t.deepEqual(
    actual, expected,
    'Reducer should return correct failure state'
  );

  const data = {
    transactions: [
      {
        name: 'Hello',
        title: 1234,
      },
    ],
  };
  action = successToRetrieveTransactions(data);
  actual = reducer(initialState, action);
  expected = {
    ...initialState,
    data: data.transactions,
  };
  t.deepEqual(
    actual, expected,
    'Reducer should load data into state'
  );

  t.end();
});
