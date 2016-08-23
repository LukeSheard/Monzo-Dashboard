import React, {
  Component,
  PropTypes,
} from 'react';

import {
  connect,
} from 'react-redux';

import Moment from 'moment';

import {
  Clearfix,
  Row,
} from 'react-bootstrap';

// import {
//   FormattedNumber,
// } from 'react-intl';

import {
  getTransaction,
} from 'store/transaction/selectors';

import s from './style';

export const mapStateToProps = getTransaction;

@connect(mapStateToProps)
export default class Transaction extends Component {
  static propTypes = {
    amount: PropTypes.number,
    currency: PropTypes.string,
    date: PropTypes.instanceOf(Moment),
    decline: PropTypes.bool,
    declineReason: PropTypes.string,
    description: PropTypes.string,
    dupeId: PropTypes.string,
    load: PropTypes.bool,
    localAmount: PropTypes.number,
    localCurrency: PropTypes.string,
    merchant: PropTypes.object,
  }

  render() {
    const {
      description,
      merchant,
    } = this.props;

    return (
      <Clearfix componentClass="section">
        <Row className={s.transactionHeader}>
          {/* <div className={s.transactionMap} /> */}
          <div
            className={s.transactionHeaderImg}
            style={{
              backgroundImage: `url(${merchant.logo})`,
            }}
          >
            <h3 className={s.transactionHeaderImgLetters}>
              {description.match(/\b\w/g).join('')}
            </h3>
          </div>
        </Row>
        <Row>
          <h2 className={s.transactionTitle}>
            {description}
          </h2>
        </Row>
      </Clearfix>
    );
  }
}
