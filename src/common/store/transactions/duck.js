import {
  createAction,
  handleActions,
} from 'redux-actions';

const ATTEMPT = 'TRANSACTIONS_LOAD_ATTEMPT';
const FAILURE = 'TRANSACTIONS_LOAD_FAILURE';
const SUCCESS = 'TRANSACTIONS_LOAD_SUCCESS';

export const attemptToRetrieveTransactions = createAction(ATTEMPT);
export const failureToRetrieveTransactions = createAction(FAILURE, err => new Error(err));
export const successToRetrieveTransactions = createAction(SUCCESS);

const initialState = {
  loading: false,
  data: {},
};
export default handleActions({
  [attemptToRetrieveTransactions]: () => ({
    ...initialState,
    loading: true,
  }),
  [failureToRetrieveTransactions]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [successToRetrieveTransactions]: (ignored, action) => ({
    ...initialState,
    data: action.payload.transactions,
  }),
}, initialState);
