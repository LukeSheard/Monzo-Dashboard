import 'isomorphic-fetch';

import {
  call,
  select,
} from 'redux-saga/effects';

import getToken from 'utils/getToken';

export default function * (url, method = 'GET', body = null) {
  const query = {
    method,
    headers: new Headers({
      'Content-Type':	'application/json',
      Accept: 'application/json, */*',
      Authorization: `Bearer ${yield select(getToken)}`,
    }),
  };

  if (body !== null) {
    query.body = body;
  }

  const request = new Request(url, query);

  try {
    return yield call(fetch, request);
  } catch (e) {
    throw e;
  }
}
