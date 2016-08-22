import {
  call,
} from 'redux-saga/effects';

export default (sagas) => function * waitForAll() {
  for (let i = 0; i < sagas.length; i += 1) {
    yield call(sagas[i]);
  }
};
