import {
  get,
  getOr,
} from 'lodash/fp';

import {
  createSelector,
} from 'reselect';

export const getAccounts = createSelector(getOr([], 'accounts.data'), accounts => accounts);

export const getSelectedIndex = createSelector(get('accounts.selected'), id => id);

export const getSelectedAccount = createSelector([
  getAccounts,
  getSelectedIndex,
], (accounts, index) => getOr({}, index, accounts));
