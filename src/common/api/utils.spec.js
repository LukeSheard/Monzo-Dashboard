import test from 'tape';
import {
  getUrl,
} from './utils';

import {
  stringify,
} from 'querystring';

const {
  baseUrl,
} = process.env;

const endpoint = 'testing';
const query = {
  stuff: 'Hello',
  blah: 'World',
};
test('API: Utils: getUrl', (t) => {
  let actual;
  let expected;

  t.plan(2);

  actual = getUrl(endpoint, query);
  expected = `${baseUrl}${endpoint}?${stringify(query)}`;
  t.equal(
    actual, expected,
    'Get Url should return the correct url'
  );

  actual = getUrl(endpoint);
  expected = `${baseUrl}${endpoint}`;
  t.equal(
    actual, expected,
    'Saga should return url without query if it doesnt exit'
  );

  t.end();
});
