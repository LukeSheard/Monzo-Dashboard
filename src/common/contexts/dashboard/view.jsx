import React, {
  Component,
  PropTypes,
} from 'react';

import Helmet from 'react-helmet';

import {
  Grid,
} from 'react-bootstrap';

import Header from 'components/header';
import loadAccounts from './saga';
import userisAuthenticated from './helmet';

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
