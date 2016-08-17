import React, {
  Component,
  PropTypes,
} from 'react';

import {
  Col,
  Grid,
  Row,
} from 'react-bootstrap';

import {
  loadTransactions,
} from './Dashboard.Saga';

import TransactionList from 'containers/TransactionList';

export default class Dashboard extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  static preload() {
    return [
      loadTransactions,
    ];
  }

  render() {
    const {
      children,
    } = this.props;

    return (
      <Grid>
        <Row>
          <Col sm={6}>
            <TransactionList />
          </Col>
          <Col sm={6}>
            {children}
          </Col>
        </Row>
      </Grid>
    );
  }
}
