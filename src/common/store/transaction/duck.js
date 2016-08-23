import {
  createAction,
  handleActions,
} from 'redux-actions';

const ATTEMPT = 'TRANSACTION_LOAD_ATTEMPT';
const FAILURE = 'TRANSACTION_LOAD_FAILURE';
const SUCCESS = 'TRANSACTION_LOAD_SUCCESS';

export const attemptToRetrieveTransaction = createAction(ATTEMPT, [
  () => ({}),
  (id) => ({
    id,
    redirect: false,
  }),
  (id, redirect) => ({
    id,
    redirect,
  }),
]);
export const failureToRetrieveTransaction = createAction(FAILURE, err => new Error(err));
export const successToRetrieveTransaction = createAction(SUCCESS);

const initialState = {
  loading: false,
  data: {},
};
export default handleActions({
  [attemptToRetrieveTransaction]: () => ({
    ...initialState,
    loading: true,
  }),
  [failureToRetrieveTransaction]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [successToRetrieveTransaction]: (ignored, action) => ({
    ...initialState,
    data: action.payload.transaction,
  }),
}, initialState);
