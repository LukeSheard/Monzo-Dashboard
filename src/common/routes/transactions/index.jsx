import React, {
  Component,
  PropTypes,
} from 'react';

import {
  connect,
} from 'react-redux';

import {
  Col,
  Row,
} from 'react-bootstrap';

import Balance from 'components/balance';
import TransactionList from 'components/transactions/list';
import Transaction from 'components/transaction';

import {
  isEmpty,
} from 'lodash/fp';

import {
  getTransactionId,
} from 'store/transaction/selectors';

export const mapStateToProps = (state) => ({
  query: getTransactionId(state),
});

@connect(mapStateToProps)
export default class TransactionView extends Component {
  static propTypes = {
    query: PropTypes.string,
  }

  render() {
    const {
      query,
    } = this.props;

    return (
      <div>
        <Row>
          <Col md={6} lg={7}>
            <Balance />
          </Col>
        </Row>
        <Row>
          <Col md={6} lg={7}>
            <TransactionList />
          </Col>
          <Col md={6} lg={5}>
            {isEmpty(query) ? null : <Transaction />}
          </Col>
        </Row>
      </div>
    );
  }
}
