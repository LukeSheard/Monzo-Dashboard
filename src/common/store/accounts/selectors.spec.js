import test from 'tape';
import {
  getAccounts,
  getSelectedIndex,
  getSelectedAccount,
} from './selectors';

const selectedAccount = {
  id: 1234,
  name: 'Hello World',
};
const selected = 0;
const data = [
  selectedAccount,
  {
    id: 341,
    name: 'Other Name',
  },
];
const state = {
  accounts: {
    data,
    selected,
  },
};

test('Selectors: Accounts', (t) => {
  let actual;
  let expected;

  t.plan(3);

  actual = getAccounts(state);
  expected = data;
  t.deepEqual(
    actual, expected,
    'getAccounts selector will get all accounts'
  );

  actual = getSelectedIndex(state);
  expected = selected;
  t.equal(
    actual, expected,
    'getSelectedIndex get the selected index'
  );

  actual = getSelectedAccount(state);
  expected = selectedAccount;
  t.deepEqual(
    actual, expected,
    'getSelectedAccount gets the account data'
  );

  t.end();
});
