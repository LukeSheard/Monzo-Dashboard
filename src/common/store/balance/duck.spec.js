import test from 'tape';
import reducer, {
  initialState,
  attemptToRetrieveBalance,
  failureToRetrieveBalance,
  successToRetrieveBalance,
} from './duck';

test('Reducers: Balance', (t) => {
  let action;
  let actual;
  let expected;
  t.plan(6);

  expected = {
    loading: false,
    data: {},
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

  action = attemptToRetrieveBalance();
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
  action = failureToRetrieveBalance(error);
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
    balance: 1234,
  };
  action = successToRetrieveBalance(data);
  actual = reducer(initialState, action);
  expected = {
    ...initialState,
    data,
  };
  t.deepEqual(
    actual, expected,
    'Reducer should load data into state'
  );

  t.end();
});
