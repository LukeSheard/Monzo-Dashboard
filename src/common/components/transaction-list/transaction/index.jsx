import Moment from 'moment';
import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Clearfix,
} from 'react-bootstrap';
import {
  FormattedNumber,
} from 'react-intl';

import s from './style.scss';
import TransactionImage from './image';

export default class TransactionListTransaction extends Component {
  static propTypes = {
    amount: PropTypes.number,
    currency: PropTypes.string,
    date: PropTypes.instanceOf(Moment),
    decline: PropTypes.bool,
    declineReason: PropTypes.string,
    description: PropTypes.string,
    dupeId: PropTypes.string,
    id: PropTypes.string.isRequired,
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
      load,
      localAmount,
      localCurrency,
      merchant,
    } = this.props;

    return (
      <Clearfix componentClass="article" className={s.transactionContainer}>
        <TransactionImage
          load={load}
          {...merchant}
        />
        <section className={s.transactionBody}>
          <main className={s.transactionBodyRow}>
            <h2 className={s.transactionTitle}>
              {description}
            </h2>
            <div className={s.transactionAmount}>
              <h3 className={s.transactionAmountMain}>
                <FormattedNumber
                  style="currency"
                  currency={currency}
                  value={amount}
                />
              </h3>
              {localCurrency !== currency ? (
                <span>
                (
                  <FormattedNumber
                    style="currency"
                    currency={localCurrency}
                    value={localAmount}
                  />
                )
                </span>
              ) : null}
            </div>
          </main>
          <aside>
            {date.fromNow()}
          </aside>
        </section>
      </Clearfix>
    );
  }
}
