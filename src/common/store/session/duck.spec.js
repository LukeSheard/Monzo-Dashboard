import test from 'tape';
import reducer, {
  initialState,
  receiveToken,
  removeToken,
} from './duck';

test('Reducers: Sesseion', (t) => {
  let action;
  let actual;
  let expected;
  t.plan(4);

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

  // TODO: receiveToken test
  action = receiveToken();

  const state = {
    random: 'This should not exist',
  };
  action = removeToken();
  expected = initialState;
  actual = reducer(state, action);
  t.deepEqual(
    actual, expected,
    'Remove token should reset state'
  );

  t.end();
});
