import React, {
  Component,
  PropTypes,
} from 'react';

import {
  Sticky,
} from 'react-sticky';

import {
  connect,
} from 'react-redux';

import {
  getTransactionsFromGroup,
} from 'store/transactions/selectors';

import Transaction from 'components/transaction-list/transaction';

import s from './style';

export const mapStateToProps = (state, ownProps) => ({
  transactions: getTransactionsFromGroup(state, ownProps.date),
});

@connect(mapStateToProps)
export default class TransactionGroup extends Component {
  static propTypes = {
    date: PropTypes.string,
    transactions: PropTypes.array,
  }

  render() {
    const {
      date,
      transactions,
    } = this.props;

    return (
      <section className={s.transactionGroup}>
        <Sticky className={s.transactionGroupHeader} topOffset={65}>
          <h4>
            {date}
          </h4>
        </Sticky>
        <main className={s.transactionGroupContent}>
          {transactions.map((transaction) => (
            <Transaction
              key={transaction.id}
              {...transaction}
            />
          ))}
        </main>
      </section>
    );
  }
}
