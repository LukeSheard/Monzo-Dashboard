import {
  getOr,
} from 'lodash/fp';

import {
  replace,
} from 'react-router-redux';

import {
	removeToken,
} from 'store/session/duck';

import {
  UserAuthWrapper as userAuthWrapper,
} from 'redux-auth-wrapper';

import {
  getToken,
} from 'store/session/selectors';

export default userAuthWrapper({
  // Selectors
  authSelector: getToken,
  predicate: token => getOr(0, 'exp', token) * 1000 > new Date().getTime(),

  // Redirect Options
  allowRedirectBack: false,
  failureRedirectPath: '/',
  redirectAction: (newLoc) => (dispatch) => {
    dispatch(removeToken());
    dispatch(replace(newLoc));
  },

  // Wrapper Options
  wrapperDisplayName: 'DashboardContextProtection',
});
