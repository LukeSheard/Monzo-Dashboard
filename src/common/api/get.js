import {
  call,
} from 'redux-saga/effects';

import {
  getUrl,
} from 'api/utils';

import request from 'api/request';

export default function* get(endpoint, query) {
  const url = yield call(getUrl, endpoint, query);

  const response = yield call(request, url, 'GET');

  const responseJson = yield call([
    response,
    response.json,
  ]);

  return responseJson;
}
