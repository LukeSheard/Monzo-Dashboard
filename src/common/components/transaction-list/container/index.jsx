import React, {
  Component,
  PropTypes,
} from 'react';

import {
  connect,
} from 'react-redux';

import {
  StickyContainer,
} from 'react-sticky';

import TransactionGroup from 'components/transaction-list/group';

import {
  getGroupedTransactionsDates,
} from 'store/transactions/selectors';

import s from './style';

export const mapStateToProps = (state) => ({
  transactionGroups: getGroupedTransactionsDates(state),
});

@connect(mapStateToProps)
export default class TransactionList extends Component {
  static propTypes = {
    transactionGroups: PropTypes.array,
  }

  render() {
    const {
      transactionGroups,
    } = this.props;

    return (
      <StickyContainer className={s.transactionList}>
        {transactionGroups.map((date) => (
          <TransactionGroup
            key={date}
            date={date}
          />
        ))}
      </StickyContainer>
    );
  }
}
