import {
  getOr,
} from 'lodash/fp';

import {
  routerActions,
} from 'react-router-redux';

import {
  UserAuthWrapper as userAuthWrapper,
} from 'redux-auth-wrapper';

import {
  getToken,
} from 'store/session/selectors';

export default userAuthWrapper({
  // Selectors
  authSelector: getToken,
  predicate: token => getOr(0, 'exp', token) * 1000 <= new Date().getTime(),

  // Redirect Options
  allowRedirectBack: false,
  failureRedirectPath: '/dashboard',
  redirectAction: routerActions.replace,

  // Wrapper Options
  wrapperDisplayName: 'LoginRedirectWrapper',
});
