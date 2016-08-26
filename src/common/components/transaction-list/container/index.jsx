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

import {
  Col,
  Row,
} from 'react-bootstrap';

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
      <div>
        <Row>
          <Col xs={12}>
            Filter Places
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            Timeline
          </Col>
          <Col xs={10}>
            <StickyContainer className={s.transactionList} topOffset={50}>
              {transactionGroups.map((date) => (
                <TransactionGroup
                  key={date}
                  date={date}
                />
              ))}
            </StickyContainer>
          </Col>
        </Row>
      </div>
    );
  }
}
