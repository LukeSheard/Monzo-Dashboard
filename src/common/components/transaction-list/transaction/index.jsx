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
      description,
      load,
      merchant,
    } = this.props;

    return (
      <Clearfix componentClass="article" className={s.transactionContainer}>
        <TransactionImage
          load={load}
          {...merchant}
        />
        <div className={s.transactionBody}>
          <summary>
            <h3 className={s.transactionTitle}>
              {description}
            </h3>
          </summary>
          <main>
            <FormattedNumber
              style="currency"
              currency={currency}
              value={amount}
            />
          </main>
        </div>
      </Clearfix>
    );
  }
}
