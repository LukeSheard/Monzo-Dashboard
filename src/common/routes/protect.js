import {
  get,
} from 'lodash/fp';

import {
  UserAuthWrapper as authWrapper,
} from 'redux-auth-wrapper';

import Area from 'components/Area';

import App, {
  Actions as appActions,
} from 'pages/App';

const protect = authWrapper({
  // Selectors
  authSelector: state => get('session.data.token', state),
  predicate: token => get('exp', token) * 1000 > new Date().getTime(),

  // Redirect Options
  allowRedirectBack: false,
  failureRedirectPath: '/',
  redirectAction: appActions.removeToken,

  // Wrapper Options
  wrapperDisplayName: 'DashboardProtection',
});

export default protect;
