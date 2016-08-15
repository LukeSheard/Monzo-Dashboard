import {
  fork,
} from 'redux-saga/effects';

export default function * () {
  return yield [
    fork()
  ]
}
