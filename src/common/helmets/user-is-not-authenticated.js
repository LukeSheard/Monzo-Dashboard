import {
  get,
  getOr,
} from 'lodash/fp';

import {
  routerActions
} from 'react-router-redux';

import {
  UserAuthWrapper as userAuthWrapper,
} from 'redux-auth-wrapper';

export default userAuthWrapper({
  // Selectors
  authSelector: get('session.data.token'),
  predicate: token => getOr(0, 'exp', token) * 1000 <= new Date().getTime(),

  // Redirect Options
  allowRedirectBack: false,
  failureRedirectPath: '/dashboard',
  redirectAction: routerActions.replace,

  // Wrapper Options
  wrapperDisplayName: 'LoginRedirectWrapper',
});
