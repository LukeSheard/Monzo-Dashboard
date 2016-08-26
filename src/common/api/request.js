import 'isomorphic-fetch';

import {
  call,
  select,
} from 'redux-saga/effects';

import {
  getBearerToken,
} from 'store/session/selectors';

export default function * (url, method = 'GET', body = null) {
  const query = {
    method,
    headers: new Headers({
      'Content-Type':	'application/json',
      Accept: 'application/json, */*',
      Authorization: `Bearer ${yield select(getBearerToken)}`,
    }),
  };

  if (method !== 'GET' && body !== null) {
    query.body = body;
  }

  const request = new Request(url, query);

  const response = yield call(fetch, request);

  // TODO: Deal with error codes
  if (response.error) {
    const error = response.error;
    throw new Error(error.message ? error.message : 'There was an error');
  }

  return response;
}
