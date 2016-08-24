import React, {
  Component,
} from 'react';

import {
  Col,
  Row,
} from 'react-bootstrap';

import {
  Sticky,
  StickyContainer,
} from 'react-sticky';

import userHasTransactions from 'decorators/user-has-transactions';

import Balance from 'components/balance';
import TransactionList from 'components/transaction-list';

@userHasTransactions
export default class TransactionListView extends Component {
  render() {
    return (
      <StickyContainer style={{ zIndex: 4 }}>
        <Row>
          <Col md={6} lg={7}>
            <Sticky style={{ zIndex: 3 }} >
              <Balance />
            </Sticky>
            <TransactionList />
          </Col>
        </Row>
      </StickyContainer>
    );
  }
}
