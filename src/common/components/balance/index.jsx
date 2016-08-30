import React, {
  Component,
  PropTypes,
} from 'react';

import {
  connect,
} from 'react-redux';

import {
  Clearfix,
} from 'react-bootstrap';

import {
  FormattedNumber,
} from 'react-intl';

import {
  getBalance,
} from 'store/balance/selectors';

import s from './style.scss';

export const mapStateToProps = (state) => ({
  ...getBalance(state),
});

@connect(mapStateToProps)
export default class Balance extends Component {
  static propTypes = {
    balance: PropTypes.number,
    currency: PropTypes.string,
    spendToday: PropTypes.number,
    localCurrency: PropTypes.string,
    localExchangeRate: PropTypes.number,
    localSpend: PropTypes.arrayOf(PropTypes.shape({
      spendToday: PropTypes.number,
      currency: PropTypes.string,
    })),
  }

  render() {
    const {
      balance,
      currency,
      spendToday,
    } = this.props;

    return (
      <Clearfix className={s.balanceContainer}>
        <h2 className={s.balanceInfo}>
          <div>
            <FormattedNumber
              style="currency"
              currency={currency}
              value={balance}
            />
          </div>
          <small>
            Balance
          </small>
        </h2>
        <h2 className={s.balanceSpend}>
          <div>
            <FormattedNumber
              style="currency"
              currency={currency}
              value={spendToday}
            />
          </div>
          <small>
            Spend Today
          </small>
        </h2>
      </Clearfix>
    );
  }
}
