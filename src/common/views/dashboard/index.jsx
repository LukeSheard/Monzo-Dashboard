import React, {
  Component,
  PropTypes,
} from 'react';

import Helmet from 'react-helmet';

import loadAccounts from 'store/accounts/saga';

import userisAuthenticated from 'decorators/user-is-authenticated';

import s from './style.scss';

@userisAuthenticated
export default class Dashboard extends Component {
  static propTypes = {
    children: PropTypes.any,
  }

  static preload() {
    return [
      loadAccounts,
    ];
  }

  render() {
    const {
      children,
    } = this.props;

    return (
      <div className={s.dashboard}>
        <Helmet title="Dashboard" />
        {children}
      </div>
    );
  }
}
