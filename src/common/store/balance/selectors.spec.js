import test from 'tape';

import {
  getBalance,
} from './selectors';

const balance = 120
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

test('Selectors: Balance', (t) => {
  t.plan(1);

  const actual = getBalance(state);
  const expected = {
    currency,
    balance: balance / 100,
    spendToday: Math.abs(spend_today / 100),
    localSpend: local_spend ? local_spend.map(region => ({
      spendToday: region.spend_today,
      currency: region.currency,
    })) : [],
    localCurrency: local_currency,
    localExchangeRate: local_exchange_rate,
  };

  t.deepEqual(
    actual, expected,
    'getBalance should create correct state'
  );

  t.end();
});
