import {
  get,
} from 'lodash/fp';

import {
  UserAuthWrapper as authWrapper,
} from 'redux-auth-wrapper';

import {
  routerActions
} from 'react-router-redux';

const redirect = authWrapper({
  // Selectors
  authSelector: state => get('session.data.token', state),
  predicate: token => !(get('exp', token) * 1000 > new Date().getTime()),

  // Redirect Options
  allowRedirectBack: false,
  failureRedirectPath: '/dashboard',
  redirectAction: routerActions.replace,

  // Wrapper Options
  wrapperDisplayName: 'LoginRedirectWrapper',
});

export default redirect;
