import test from 'tape';
import {
  getBalance,
} from 'store/balance/selectors';

import {
  mapStateToProps,
} from './index';

const balance = 120
const currency = 'GBP';
const spend_today = 100;
const local_currency = 'USD';
const local_exchange_rate = 1.3;
const local_spend = [{
  spend_today: 130,
  currency: 'USD',
}];
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

test('Components: Balance - mapStateToProps', (t) => {
  t.plan(1);

  const actual = mapStateToProps(state);
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
    'mapStateToProps should create correct state'
  );

  t.end();
});
