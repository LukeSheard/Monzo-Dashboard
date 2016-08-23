import React, {
  Component,
  PropTypes,
} from 'react';

import {
  connect,
} from 'react-redux';

import {
  getGroupedTransactions,
} from 'store/transactions/selectors';

import Group from 'components/transactions/group';

import s from './style';

export const mapStateToProps = (state) => ({
  transactions: getGroupedTransactions(state),
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
      <div className={s.transactionList}>
        {transactions.map(([
          date,
          list,
        ]) => (
          <Group
            date={date}
            key={date}
            transactions={list}
          />
        ))}
      </div>
    );
  }
}
