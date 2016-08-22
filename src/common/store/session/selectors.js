import {
  get,
  getOr,
} from 'lodash/fp';

import {
  createSelector,
} from 'reselect';

export const getBearerToken = createSelector(get('session.data.bearer'), token => token);

export const getToken = createSelector(get('session.data.token'), token => token);

export const tokenValid = createSelector(getToken, token => getOr(0, 'exp', token) * 1000 > new Date().getTime());
