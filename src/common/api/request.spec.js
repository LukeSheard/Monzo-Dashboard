import test from 'tape';
import requestSaga from './request';

import 'isomorphic-fetch';

import {
  call,
  select,
} from 'redux-saga/effects';

import {
  getBearerToken,
} from 'store/session/selectors';

const token = '123456';
const url = '/url';
const method = 'GET';
const postMethod = 'POST';
const body = {};
const query = {
  method,
  headers: new Headers({
    'Content-Type':	'application/json',
    Accept: 'application/json, */*',
    Authorization: `Bearer ${token}`,
  }),
};
const postQuery = {
  ...query,
  method: postMethod,
  body,
};
const request = new Request(url, query);
const postRequest = new Request(url, postQuery);
const response = {
  data: 'DATA!!',
};
const message = 'This is a message';

test('API: Request (Post) - Success', (t) => {
  let actual;
  let expected;

  t.plan(5);

  expected = 'function';
  actual = typeof requestSaga()[Symbol.iterator];
  t.equal(
    actual, expected,
    'Saga is an iterator'
  );

  const saga = requestSaga(url, postMethod, body);

  expected = select(getBearerToken);
  actual = saga.next().value;
  t.deepEqual(
    actual, expected,
    'Saga should get token from state'
  );

  expected = call(fetch, postRequest);
  actual = saga.next(token).value;
  t.deepEqual(
    actual, expected,
    'Saga should make request'
  );

  expected = response;
  actual = saga.next(response).value;
  t.deepEqual(
    actual, expected,
    'Saga should return response'
  );

  expected = true;
  actual = saga.next().done;
  t.deepEqual(
    actual, expected,
    'Saga should be done'
  );

  t.end();
});

test('API: Request (Get) - Success', (t) => {
  let actual;
  let expected;

  t.plan(5);

  expected = 'function';
  actual = typeof requestSaga()[Symbol.iterator];
  t.equal(
    actual, expected,
    'Saga is an iterator'
  );

  const saga = requestSaga(url, method);

  expected = select(getBearerToken);
  actual = saga.next().value;
  t.deepEqual(
    actual, expected,
    'Saga should get token from state'
  );

  expected = call(fetch, request);
  actual = saga.next(token).value;
  t.deepEqual(
    actual, expected,
    'Saga should make request'
  );

  expected = response;
  actual = saga.next(response).value;
  t.deepEqual(
    actual, expected,
    'Saga should return response'
  );

  expected = true;
  actual = saga.next().done;
  t.deepEqual(
    actual, expected,
    'Saga should be done'
  );

  t.end();
});

test('API: Request (POST) - Failure', (t) => {
  let actual;
  let expected;

  t.plan(2);

  const saga = requestSaga(url, postMethod, body);

  saga.next();
  saga.next(token);
  try {
    saga.next({
      ...response,
      error: {
        message,
      },
    });
  } catch (e) {
    expected = message;
    actual = e.message;
    t.deepEqual(
      actual, expected,
      'Saga should throw an error if the request fails'
    );
  }

  expected = true;
  actual = saga.next().done;
  t.deepEqual(
    actual, expected,
    'Saga should be done'
  );

  t.end();
});

test('API: Request (GET) - Failure', (t) => {
  let actual;
  let expected;

  t.plan(2);

  const saga = requestSaga(url, method);

  saga.next();
  saga.next(token);
  try {
    saga.next({
      ...response,
      error: {
        message,
      },
    });
  } catch (e) {
    expected = message;
    actual = e.message;
    t.deepEqual(
      actual, expected,
      'Saga should throw an error if the request fails'
    );
  }

  expected = true;
  actual = saga.next().done;
  t.deepEqual(
    actual, expected,
    'Saga should be done'
  );

  t.end();
});
