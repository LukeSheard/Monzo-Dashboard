import {
  getOr,
} from 'lodash/fp';

import {
  createSelector,
} from 'reselect';

export const createLoad = ({
  amount,
  created,
  currency,
  dedupe_id,
  description,
  id,
  local_amount,
  local_currency,
  settled,
}) => ({
  amount,
  currency,
  date: new Date(settled || created),
  description,
  dupeId: dedupe_id,
  id,
  load: true,
  localAmount: local_amount,
  localCurrency: local_currency,
});

export const createTransaction = ({
  amount,
  created,
  currency,
  decline_reason,
  dedupe_id,
  description,
  id,
  local_amount,
  local_currency,
  merchant,
  settled,
}) => ({
  amount,
  currency,
  data: new Date(settled || created),
  decline: !!decline_reason, // eslint-disable-line camelcase
  declineReason: decline_reason,
  description,
  dupeId: dedupe_id,
  id,
  localAmount: local_amount,
  localCurrency: local_currency,
  merchant,
});

export const getTransactions = createSelector(
  getOr([], 'transactions.data'),
  transactions => transactions.map((transaction) => {
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
