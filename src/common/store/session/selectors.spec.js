import test from 'tape';
import {
  getBearerToken,
  getToken,
  tokenValid,
} from './selectors';

import jwt from 'jsonwebtoken';


const bearer = jwt.sign({
  hello: 'World',
}, 'test', {
  expiresIn: '1h',
});
const token = {
  exp: new Date().getTime(),
};

const state = {
  session: {
    data: {
      bearer,
      token,
    },
  },
};

test('Selectors: Session', (t) => {
  let actual;
  let expected;
  t.plan(3);

  actual = getBearerToken(state);
  expected = bearer;
  t.equal(
    actual, expected,
    'getBearerToken should correctly get the bearer string'
  );

  actual = getToken(state);
  expected = token;
  t.deepEqual(
    actual, expected,
    'getToken should correctly get the token'
  );

  actual = tokenValid(state);
  expected = true;
  t.equal(
    actual, expected,
    'tokenValid should correctly check the validity of the token'
  );

  t.end();
});
