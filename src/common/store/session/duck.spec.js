import test from 'tape';
import reducer, {
  initialState,
  receiveToken,
  removeToken,
} from './duck';

import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';

test('Reducers: Sesseion', (t) => {
  let action;
  let actual;
  let expected;
  t.plan(5);

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

  const bearer = jwt.sign({
    hello: 'World',
  }, 'secret', {
    expiresIn: '1h',
  });
  action = receiveToken(bearer);
  expected = {
    data: {
      bearer,
      token: jwtDecode(bearer),
    },
  };
  actual = reducer({}, action);
  t.deepEqual(
    actual, expected,
    'Saga should decode JWT token'
  );

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
