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
export const successToRetrieveAccounts = createAction(SUCCESS);
export const primeAccount = createAction(PRIME);

const initialState = {
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
    error: action.payload,
  }),
  [successToRetrieveAccounts]: (ignored, action) => ({
    ...initialState,
    data: action.payload,
    selected: 0,
  }),
  [primeAccount]: (state, action) => ({
    ...state,
    selected: action.payload,
  })
}, initialState);
