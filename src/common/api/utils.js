import {
  stringify,
} from 'querystring';

const {
  baseUrl,
} = process.env;

export const getUrl = (endpoint, query) => `${baseUrl}${endpoint}${query ? `?${stringify(query)}` : ''}`;
