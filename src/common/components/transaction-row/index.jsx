import React, {
  Component,
  PropTypes,
} from 'react';

import Moment from 'moment';

import {
  Clearfix,
} from 'react-bootstrap';

import {
  FormattedNumber,
} from 'react-intl';

import s from './style';

export default class TransactionRow extends Component {
  static propTypes = {
    amount: PropTypes.number,
    currency: PropTypes.string,
    date: PropTypes.instanceOf(Moment),
    decline: PropTypes.bool,
    declineReason: PropTypes.string,
    description: PropTypes.string,
    dupeId: PropTypes.string,
    id: PropTypes.string,
    load: PropTypes.bool,
    localAmount: PropTypes.number,
    localCurrency: PropTypes.string,
    merchant: PropTypes.object,
  }

  render() {
    const {
      amount,
      currency,
      date,
      description,
      localCurrency,
      localAmount,
      merchant,
    } = this.props;

    return (
      <Clearfix componentClass="article" bsClass={s.transaction}>
        {merchant && merchant.logo ? (
          <div
            className={s.merchantLogo}
            style={{
              backgroundImage: `url(${merchant.logo})`,
            }}
          />
        ) : null}
        <div className={s.transactionInfo}>
          <summary className={s.transactionTitle}>
            <h3 className={s.transactionTitleName}>
              {description}
            </h3>
            <h3 className={s.transactionTitleDate}>
              {date.fromNow()}
            </h3>
          </summary>
          <div>
            <FormattedNumber
              style="currency"
              currency={currency}
              value={amount}
            />
            {localCurrency !== currency ? (
              <FormattedNumber
                style="currency"
                currency={localCurrency}
                value={localAmount}
              />
            ) : null}
          </div>
        </div>
      </Clearfix>
    );
  }
}
