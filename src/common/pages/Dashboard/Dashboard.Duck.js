const ATTEMPT = 'DASHBOARD_ACCOUNTS_ATTEMPT';
const FAILURE = 'DASHBOARD_ACCOUNTS_FAILURE';
const SUCCESS = 'DASHBOARD_ACCOUNTS_SUCCESS';

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
      return {
        ...state,
        loading: false,
        data: action.payload.accounts,
        selected: action.payload.accounts.length > 0 ? 0 : null,
      };
    }
    default: {
      return state;
    }
  }
}
