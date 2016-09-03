/* eslint-disable camelcase */

import createStore from 'store';
import test from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {
  Provider,
} from 'react-redux';
import {
  getBalance,
} from 'store/balance/selectors';

import Balance, {
  mapStateToProps,
} from './index';

const balance = 120;
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
    ...getBalance(state),
  };

  t.deepEqual(
    actual, expected,
    'mapStateToProps should create correct state'
  );

  t.end();
});

test('Components: Balance - Component', (t) => {
  const renderer = TestUtils.createRenderer();

  renderer.render((
    <Balance store={createStore()} />
  ));

  const BalanceView = renderer.getRenderOutput();

  console.log(BalanceView);

  t.pass();
  t.end();
});
