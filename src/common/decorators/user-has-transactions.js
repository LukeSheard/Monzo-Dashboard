import Loading from 'components/loading';
import {
  get,
  isEmpty,
} from 'lodash/fp';
import {
  routerActions,
} from 'react-router-redux';
import {
  UserAuthWrapper as userAuthWrapper,
} from 'redux-auth-wrapper';

export default userAuthWrapper({
  // Selectors
  authSelector: get('transactions'),
  predicate: transactionData => !isEmpty(transactionData.data),
  authenticatingSelector: get('transactions.loading'),
  LoadingComponent: Loading,

  // Redirect Options
  failureRedirectPath: '/error',
  redirectAction: routerActions.replace,
  allowRedirectBack: false,

  // Wrapper Options
  wrapperDisplayName: 'TransactionProtectionWrapper',
});
