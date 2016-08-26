import {
  createAction,
  handleActions,
} from 'redux-actions';

const ATTEMPT = 'BALANCE_LOAD_ATTEMPT';
const FAILURE = 'BALANCE_LOAD_FAILURE';
const SUCCESS = 'BALANCE_LOAD_SUCCESS';

export const attemptToRetrieveBalance = createAction(ATTEMPT);
export const failureToRetrieveBalance = createAction(FAILURE, err => new Error(err));
export const successToRetrieveBalance = createAction(SUCCESS);

export const initialState = {
  loading: false,
  data: {},
};
export default handleActions({
  [attemptToRetrieveBalance]: () => ({
    ...initialState,
    loading: true,
  }),
  [failureToRetrieveBalance]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.message,
  }),
  [successToRetrieveBalance]: (ignored, action) => ({
    ...initialState,
    data: action.payload,
  }),
}, initialState);
