import {
  get,
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

export default userAuthWrapper({
  // Selectors
  authSelector: get('session.data.token'),
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
