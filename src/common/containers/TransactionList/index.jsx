import React, {
  Component,
  PropTypes,
} from 'react';

import {
  connect,
} from 'react-redux';

import Transaction from 'components/Transaction';

import {
  Actions as dashboardActions,
  Selectors as dashboardSelectors,
} from 'pages/Dashboard';

import s from './style';

export const mapStateToProps = (state) => ({
  transactions: dashboardSelectors.getTransactions(state),
});

@connect(mapStateToProps)
export default class TransactionList extends Component {
  static propTypes = {
    transactions: PropTypes.array,
  }

  render() {
    const {
      transactions,
    } = this.props;

    return (
      <div className={s.infinitePane}>
        {transactions.map((transaction, index) => (
          <Transaction
            key={transaction.id}
            {...transaction}
          />
        ))}
      </div>
    );
  }
}
