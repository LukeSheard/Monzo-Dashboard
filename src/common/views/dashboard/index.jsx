import React, {
  Component,
  PropTypes,
} from 'react';

import Helmet from 'react-helmet';

import {
  Grid,
} from 'react-bootstrap';

import loadAccounts from 'store/accounts/saga';

import Header from 'components/header';
import userisAuthenticated from 'decorators/user-is-authenticated';

import s from './style';

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
      <div className={s.dashboardMount}>
        <Helmet title="Dashboard" />
        <Header />
        <Grid componentClass="main" className={s.dashboard}>
          {children}
        </Grid>
      </div>
    );
  }
}
