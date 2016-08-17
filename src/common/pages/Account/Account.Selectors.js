import {
  get,
  getOr,
} from 'lodash/fp';

import { createSelector } from 'reselect';

export const getAccounts = createSelector(getOr([], 'account.data'), accounts => accounts);

export const getSelectedIndex = createSelector(get('account.selected'), id => id);

export const getSelectedAccount = createSelector([
  getAccounts,
  getSelectedIndex,
], (accounts, index) => getOr({}, index, accounts));
