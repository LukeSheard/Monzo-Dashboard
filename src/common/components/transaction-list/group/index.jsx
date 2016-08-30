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
  FormattedDate,
} from 'react-intl';

import {
  getTransactionsFromGroup,
} from 'store/transactions/selectors';

import Transaction from 'components/transaction-list/transaction';

import s from './style.scss';

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
        <Sticky className={s.transactionGroupHeader} topOffset={-5}>
          <h4>
            <FormattedDate
              value={date}
              day="2-digit"
              month="short"
              weekday="long"
              year="numeric"
            />
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
