import React, {
  Component,
  PropTypes,
} from 'react';

import Moment from 'moment';

import {
  FormattedDate,
} from 'react-intl';

import TransactionRow from 'components/transactions/transaction';

import s from './style';

export default class TransactionGroup extends Component {
  static propTypes = {
    date: PropTypes.oneOfType([
      PropTypes.instanceOf(Moment),
      PropTypes.string,
    ]),
    transactions: PropTypes.any,
  }

  render() {
    const {
      date,
      transactions,
    } = this.props;

    return (
      <section className={s.transactionGroup}>
        <header className={s.transactionGroupHeader}>
          <h4>
            <FormattedDate
              value={date}
              day="2-digit"
              month="short"
              weekday="long"
            />
          </h4>
        </header>
        <div>
          {transactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              {...transaction}
            />
          ))}
        </div>
      </section>
    );
  }
}
