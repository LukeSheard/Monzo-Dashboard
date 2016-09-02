import cx from 'classnames';
import React, {
  Component,
  PropTypes,
} from 'react';

import s from './style.scss';

export default class TransactionListImage extends Component {
  static propTypes = {
    atm: PropTypes.bool,
    load: PropTypes.bool,
    logo: PropTypes.string,
    name: PropTypes.string,
  }

  render() {
    const {
      atm,
      load,
      logo,
      name,
    } = this.props;

    return (
      <div
        className={cx(s.transactionListImage, {
          [s.atm]: atm,
          [s.load]: load,
          [s.logo]: !!logo,
        })}
        style={logo ? {
          backgroundImage: `url(${logo})`,
        } : null}
      >
        {(atm || !!name) ? (
          <h3 className={s.transactionListImageLetters}>
            {atm ? 'ATM' : name.split(' ').map(w => w[0]).slice(0, 2).join('')}
          </h3>
        ) : null}
      </div>
    );
  }
}
