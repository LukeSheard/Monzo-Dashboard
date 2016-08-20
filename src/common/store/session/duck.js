import jwtDecode from 'jwt-decode';

const RECEIVE = 'SESSION_RECEIVE_TOKEN';
const REMOVE = 'SESSION_REMOVE_TOKEN';

import {
  createAction,
  handleActions,
} from 'redux-actions';

export const receiveToken = createAction(RECEIVE);
export const removeToken = createAction(REMOVE);

const initialState = {
  loading: false,
  data: {},
};
export default handleActions({
  [receiveToken]: (state, action) => ({
    ...state,
    data: {
      bearer: action.payload,
      token: jwtDecode(action.payload),
    },
  }),
  [removeToken]: () => initialState,
}, initialState);
