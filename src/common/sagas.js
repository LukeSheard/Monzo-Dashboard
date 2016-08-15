import {
  fork,
} from 'redux-saga/effects';

import {
  Saga as Dashboard,
} from 'pages/Dashboard';

export default function * () {
  return yield [
    fork(Dashboard),
  ];
}
