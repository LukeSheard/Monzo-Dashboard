import test from 'tape';
import getSaga from './get';

import {
  call,
} from 'redux-saga/effects';

import {
  getUrl,
} from 'api/utils';

import request from 'api/request';

const endpoint = '/get-test';
const query = {
  stuff: 'stuff',
};
const url = '/get-test?stuff=stuff';
const responseData = {
  data: 'Data!',
};
const response = {
  json: () => responseData,
};

test('API: Get', (t) => {
  let actual;
  let expected;

  t.plan(6);

  // Saga is an iterator
  expected = 'function';
  actual = typeof getSaga()[Symbol.iterator];

  t.equal(
    actual, expected,
    'Saga is an iterator'
  );

  const saga = getSaga(endpoint, query);

  actual = saga.next().value;
  expected = call(getUrl, endpoint, query);
  t.deepEqual(
    actual, expected,
    'Saga should construct full url including query'
  );

  actual = saga.next(url).value;
  expected = call(request, url, 'GET');
  t.deepEqual(
    actual, expected,
    'Saga should make request'
  );

  actual = saga.next(response).value;
  expected = call([
    response,
    response.json,
  ]);
  t.deepEqual(
    actual, expected,
    'Saga should convert response to JSON'
  );

  actual = saga.next(responseData).value;
  expected = responseData;
  t.equal(
    actual, expected,
    'Saga should be return data'
  );

  actual = saga.next().done;
  expected = true;
  t.equal(
    actual, expected,
    'Saga should be done'
  );

  t.end();
});
