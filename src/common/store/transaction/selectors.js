import {
  get,
  getOr,
} from 'lodash/fp';

import {
  createSelector,
} from 'reselect';

import {
  createLoad,
  createTransaction,
} from 'utils/transactions';

export const getTransactionId = createSelector(get('routing.locationBeforeTransitions.query.id'), id => id);

export const getTransaction = createSelector(getOr({}, 'transaction.data'), t => {
  switch (t.is_load) {
    case false: {
      return createTransaction(t);
    }
    default: {
      return createLoad(t);
    }
  }
});
