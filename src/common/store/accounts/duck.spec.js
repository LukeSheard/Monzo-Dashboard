import test from 'tape';
import reducer, {
  initialState,
  primeAccount,
  attemptToRetrieveAccounts,
  failureToRetrieveAccounts,
  successToRetrieveAccounts,
} from './duck';

test('Reducers: Accounts', (t) => {
  let action;
  let expected;
  let actual;
  t.plan(7);

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
    'Reducer should return initialState'
  );

  action = attemptToRetrieveAccounts();
  expected = {
    ...initialState,
    loading: true,
  };
  actual = reducer(initialState, action);
  t.deepEqual(
    actual, expected,
    'Reducer should accept attemptToRetrieveAccounts action'
  );

  const error = 'There was an error';
  action = failureToRetrieveAccounts(error);
  expected = {
    loading: false,
    error,
  };
  actual = reducer({}, action);
  t.deepEqual(
    actual, expected,
    'Reducer should accept failureToRetrieveAccounts action'
  );

  const accounts = [
    {
      id: 1234,
      name: 'Test1',
    },
  ];
  const data = { accounts };
  action = successToRetrieveAccounts(data);
  expected = {
    ...initialState,
    data: accounts,
  };
  actual = reducer({}, action);
  t.deepEqual(
    actual, expected,
    'Reducer should set accounts correctly from accounts state'
  );

  const selected = 0;
  action = primeAccount(selected);
  expected = {
    selected,
  };
  actual = reducer({}, action);
  t.deepEqual(
    actual, expected,
    'Saga should set selected account'
  );

  t.end();
});
