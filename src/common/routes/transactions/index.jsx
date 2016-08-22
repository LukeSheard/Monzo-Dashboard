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

import Transaction from 'components/transaction';

import {
  getTransactions,
} from 'store/transactions/selectors';

import s from './style';

export const mapStateToProps = (state) => ({
  transactions: getTransactions(state),
});

@connect(mapStateToProps)
export default class TransactionList extends Component {
  static propTypes = {
    transactions: PropTypes.any,
  }

  render() {
    const {
      transactions,
    } = this.props;

    return (
      <div>
        <Row>
          <Col sm={6}>
            <h1>
              Transactions
            </h1>
            <section className={s.transactionList}>
              {transactions.map((transaction) => (
                <Transaction id={transaction.id} {...transaction} />
              ))}
            </section>
          </Col>
        </Row>
      </div>
    );
  }
}
