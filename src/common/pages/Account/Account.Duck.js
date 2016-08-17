import {
  getOr,
} from 'lodash/fp';

const ATTEMPT = 'ACCOUNTS_LOAD_ATTEMPT';
const FAILURE = 'ACCOUNTS_LOAD_FAILURE';
const SUCCESS = 'ACCOUNTS_LOAD_SUCCESS';

export const attemptToRetrieveAccounts = () => ({
  type: ATTEMPT,
});
attemptToRetrieveAccounts.type = ATTEMPT;

export const failureToRetrieveAccounts = (error) => ({
  type: FAILURE,
  error,
});
failureToRetrieveAccounts.type = FAILURE;

export const successToRetrieveAccounts = (accounts) => ({
  type: SUCCESS,
  payload: {
    accounts,
  },
});
successToRetrieveAccounts.type = SUCCESS;

export const initialState = {
  loading: false,
  data: {},
};
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case attemptToRetrieveAccounts.type: {
      return {
        ...state,
        loading: true,
      };
    }
    case failureToRetrieveAccounts.type: {
      return {
        ...state,
        loading: false,
      };
    }
    case successToRetrieveAccounts.type: {
      const accounts = getOr([], 'payload.accounts', action);

      return {
        ...state,
        loading: false,
        data: accounts,
        selected: 0,
      };
    }
    default: {
      return state;
    }
  }
}
