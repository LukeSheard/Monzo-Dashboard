import {
  stringify,
} from 'querystring';

const {
  baseUrl,
} = process.env;

export const getQueryString = (query) => stringify(query);

export const getUrl = (endpoint, query) => `${baseUrl}${endpoint}?${getQueryString(query)}`;
