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

export default class Transaction extends Component {
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
      <Clearfix componentClass="article">

      </Clearfix>
    );
  }
}
