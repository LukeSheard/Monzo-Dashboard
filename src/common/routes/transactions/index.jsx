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
import Search from 'components/search-transaction-form';
import TransactionRow from 'components/transaction-row';

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
          <Col sm={6} lg={7}>
            <Balance />
          </Col>
          <Col sm={6} lg={5}>
            <Search />
          </Col>
        </Row>
        <Row>
          <Col sm={6} lg={7}>
            <section className={s.transactionList}>
              {transactions.map((transaction) => (
                <TransactionRow key={transaction.id} {...transaction} />
              ))}
            </section>
          </Col>
          <Col sm={6} lg={5}>
            stuff
          </Col>
        </Row>
      </div>
    );
  }
}
