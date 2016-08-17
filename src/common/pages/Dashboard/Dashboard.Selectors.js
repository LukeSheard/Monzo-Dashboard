import {
  get,
  getOr,
} from 'lodash/fp';

import { createSelector } from 'reselect';

export const getTransactions = createSelector(getOr([], 'transactions.data'), t => t.slice().reverse());
