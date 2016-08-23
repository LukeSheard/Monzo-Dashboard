import {
  getOr,
  groupBy,
} from 'lodash/fp';

import {
  createLoad,
  createTransaction,
} from 'utils/transactions';

import {
  createSelector,
} from 'reselect';

export const getTransactions = createSelector(
  getOr([], 'transactions.data'),
  transactions => transactions.slice().reverse().map((transaction) => {
    switch (transaction.is_load) {
      case true: {
        return createLoad(transaction);
      }
      default: {
        return createTransaction(transaction);
      }
    }
  })
);

const groupByDate = (list) => Object.entries(groupBy(({ date }) => date.startOf('day').format(), list));

export const getGroupedTransactions = createSelector(getTransactions, groupByDate);
