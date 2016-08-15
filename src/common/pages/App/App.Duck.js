import jwtDecode from 'jwt-decode';

const RECEIVE_TYPE = 'SESSION_RECEIVE_TOKEN';
const REMOVE_TYPE = 'SESSION_REMOVE_TOKEN';

export const receiveToken = (token) => ({
  type: RECEIVE_TYPE,
  payload: {
    token,
  },
});
receiveToken.type = RECEIVE_TYPE;

export const removeToken = () => ({
  type: REMOVE_TYPE,
});
removeToken.type = RECEIVE_TYPE;

const initialState = {
  loading: false,
  data: {},
};
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case RECEIVE_TYPE: {
      const token = action.payload.token;

      return {
        ...state,
        data: {
          bearer: token,
          token: jwtDecode(token),
        },
      };
    }
    case REMOVE_TYPE: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
