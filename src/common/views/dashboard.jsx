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
      <div>
        <Helmet title="Dashboard" />
        <Header />
        <Grid componentClass="main">
          {children}
        </Grid>
      </div>
    );
  }
}
