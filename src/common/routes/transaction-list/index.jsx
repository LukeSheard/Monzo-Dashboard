import Balance from 'components/balance';
import TransactionGroup from 'components/transaction-list/group';
import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Col,
  Row,
} from 'react-bootstrap';
import {
  connect,
} from 'react-redux';
import {
  Sticky,
  StickyContainer,
} from 'react-sticky';
import {
  getGroupedTransactionsDates,
} from 'store/transactions/selectors';

import s from './style.scss';

export const mapStateToProps = (state) => ({
  transactionGroups: getGroupedTransactionsDates(state),
});

@connect(mapStateToProps)
export default class TransactionListView extends Component {
  static propTypes = {
    transactionGroups: PropTypes.array,
  }

  render() {
    const {
      transactionGroups,
    } = this.props;

    return (
      <StickyContainer style={{ zIndex: 4 }}>
        <Row>
          <Col md={6} lg={7}>
            <Sticky style={{ zIndex: 3 }} >
              <Balance />
            </Sticky>
            <StickyContainer className={s.transactionList}>
              {transactionGroups.map((date) => (
                <TransactionGroup
                  key={date}
                  date={date}
                />
              ))}
            </StickyContainer>
          </Col>
          <Col md={6} lg={5}>
            TransactionView
          </Col>
        </Row>
      </StickyContainer>
    );
  }
}
