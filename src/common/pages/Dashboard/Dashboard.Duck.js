const ATTEMPT = 'DASHBOARD_TRANSACTIONS_ATTEMPT';
const FAILURE = 'DASHBOARD_TRANSACTIONS_FAILURE';
const SUCCESS = 'DASHBOARD_TRANSACTIONS_SUCCESS';

export const viewTransactions = () => ({
  type: 'viewTransactions',
});
viewTransactions.type = 'viewTransactions';

export const attemptToRetrieveTransactions = () => ({
  type: ATTEMPT,
});
attemptToRetrieveTransactions.type = ATTEMPT;

export const failureToRetrieveTransactions = (error) => ({
  type: FAILURE,
  error,
});
failureToRetrieveTransactions.type = FAILURE;

export const successToRetrieveTransactions = (transactions) => ({
  type: SUCCESS,
  payload: {
    transactions,
  },
});
successToRetrieveTransactions.type = SUCCESS;

export const initialState = {
  loading: false,
  data: [],
};
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case attemptToRetrieveTransactions.type: {
      return {
        ...state,
        loading: true,
      };
    }
    case failureToRetrieveTransactions.type: {
      return {
        ...state,
        loading: false,
      };
    }
    case successToRetrieveTransactions.type: {
      return {
        ...state,
        loading: false,
        page: 1,
        data: action.payload.transactions,
      };
    }
    default: {
      return state;
    }
  }
}
