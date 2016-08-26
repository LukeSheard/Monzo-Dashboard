import {
  createAction,
  handleActions,
} from 'redux-actions';

const ATTEMPT = 'ACCOUNTS_LOAD_ATTEMPT';
const FAILURE = 'ACCOUNTS_LOAD_FAILURE';
const SUCCESS = 'ACCOUNTS_LOAD_SUCCESS';
const PRIME = 'ACCOUNTS_PRIME';

export const attemptToRetrieveAccounts = createAction(ATTEMPT);
export const failureToRetrieveAccounts = createAction(FAILURE, err => new Error(err));
export const successToRetrieveAccounts = createAction(SUCCESS, ({ accounts }) => accounts);
export const primeAccount = createAction(PRIME);

export const initialState = {
  loading: false,
  data: {},
};
export default handleActions({
  [attemptToRetrieveAccounts]: () => ({
    ...initialState,
    loading: true,
  }),
  [failureToRetrieveAccounts]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.message,
  }),
  [successToRetrieveAccounts]: (ignored, action) => ({
    ...initialState,
    data: action.payload,
  }),
  [primeAccount]: (state, action) => ({
    ...state,
    selected: action.payload,
  }),
}, initialState);
