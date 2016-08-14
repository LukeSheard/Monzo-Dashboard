import jwtDecode from 'jwt-decode';

const LOGIN_TYPE = 'SESSION_LOGIN';
const LOGOUT_TYPE = 'SESSION_LOGOUT';

export const sessionLogin = (token) => ({
  type: LOGIN_TYPE,
  payload: {
    token,
  },
});
sessionLogin.type = LOGIN_TYPE;

export const sessionLogout = () => ({
  type: LOGOUT_TYPE,
})
sessionLogout.type = LOGIN_TYPE;

const initialState = {
  loading: false,
  data: {},
};
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_TYPE: {
      return {
        ...state,
        data: {
          bearer: token,
          token: jwtDecode(token),
        },
      };
    }
    case LOGOUT_TYPE: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
