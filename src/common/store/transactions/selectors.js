import {
  getOr,
  groupBy,
} from 'lodash/fp';

import Moment from 'moment';

import {
  createSelector,
} from 'reselect';

export const createTransaction = ({
  amount,
  category,
  created,
  currency,
  decline_reason,
  dedupe_id,
  description,
  id,
  local_amount,
  local_currency,
  merchant,
}, load = false, decline = false) => {
  const transaction = {
    amount: Math.abs(amount / 100),
    category,
    currency,
    date: new Moment(created),
    description: merchant && merchant.name ? merchant.name : description,
    dupeId: dedupe_id,
    id,
    localAmount: Math.abs(local_amount / 100), // eslint-disable-line camelcase
    localCurrency: local_currency,
  };

  if (load) {
    transaction.load = true;
  } else {
    transaction.merchant = merchant;
  }

  if (decline) {
    transaction.decline = true;
    transaction.declineReason = decline_reason; // eslint-disable-line camelcase
  }

  return transaction;
};

export const getTransactions = createSelector(
  getOr([], 'transactions.data'),
  transactions => transactions.slice().reverse().map((transaction) => {
    if (transaction.is_load) {
      return createTransaction(transaction, true);
    } else if (transaction.decline_reason) {
      return createTransaction(transaction, false, true);
    }

    return createTransaction(transaction);
  })
);

export const getGroupedTransactions = createSelector(getTransactions, list => groupBy(({ date }) => new Moment(date)
  .startOf('day')
  .toDate()
  .toString(), list)
);

export const getGroupedTransactionsDates = createSelector(getGroupedTransactions, Object.keys);

export const getTransactionsFromGroup = (state, date) => getGroupedTransactions(state)[date];
