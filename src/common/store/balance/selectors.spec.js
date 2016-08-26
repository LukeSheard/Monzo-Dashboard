/* eslint-disable camelcase */
import test from 'tape';

import {
  getBalance,
} from './selectors';

const balance = 120;
const currency = 'GBP';
const spend_today = 100;
const local_currency = 'USD';
const local_exchange_rate = 1.3;
const local_spend = [
  {
    spend_today: 100,
    currency: local_currency,
  },
];
const state = {
  balance: {
    data: {
      balance,
      currency,
      spend_today,
      local_currency,
      local_exchange_rate,
      local_spend,
    },
  },
};

const stateNoLocal = {
  balance: {
    data: {
      balance,
      currency,
      spend_today,
    },
  },
};

test('Selectors: Balance', (t) => {
  let actual;
  let expected;
  t.plan(2);

  actual = getBalance(state);
  expected = {
    currency,
    balance: balance / 100,
    spendToday: Math.abs(spend_today / 100),
    localSpend: local_spend.map(region => ({
      spendToday: region.spend_today,
      currency: region.currency,
    })),
    localCurrency: local_currency,
    localExchangeRate: local_exchange_rate,
  };

  t.deepEqual(
    actual, expected,
    'getBalance should create correct state with local_currency'
  );

  actual = getBalance(stateNoLocal);
  expected = {
    currency,
    balance: balance / 100,
    spendToday: Math.abs(spend_today / 100),
    localSpend: [],
    localCurrency: currency,
    localExchangeRate: 1,
  };

  t.deepEqual(
    actual, expected,
    'getBalance should create correct state without local_currency'
  );

  t.end();
});
