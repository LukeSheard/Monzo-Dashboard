import {
  stringify,
} from 'querystring';

import {
  call,
} from 'redux-saga/effects';

import request from './request';

const {
  baseUrl
} = process.env;

export const getQueryString = (query) => stringify(query);

export const getUrl = (endpoint, query) => `${baseUrl}${endpoint}?${getQueryString(query)}`;

export function * get(endpoint, query) {
  const url = getUrl(endpoint, query);

  const response = yield call(request, url);

  return yield call(() => response.json());
}
