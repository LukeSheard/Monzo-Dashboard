/* eslint-disable camelcase */
import {
  get,
} from 'lodash/fp';

import {
  createSelector,
} from 'reselect';

export const getBalance = createSelector(get('balance.data'), ({
  balance,
  currency,
  spend_today,
  local_currency,
  local_exchange_rate,
  local_spend,
}) => ({
  currency,
  balance: balance / 100,
  spendToday: Math.abs(spend_today / 100),
  localSpend: local_spend ? local_spend.map(region => ({
    spendToday: region.spend_today,
    currency: region.currency,
  })) : [],
  localCurrency: local_currency || currency,
  localExchangeRate: local_exchange_rate || 1,
}));

export default getBalance;
