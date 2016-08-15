import {
  fork,
  join,
} from 'redux-saga/effects';

export default (sagas) => function * () {
  return yield sagas.map((saga) => fork(saga));
};
