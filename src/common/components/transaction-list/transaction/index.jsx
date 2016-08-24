import React, {
  Component,
  PropTypes,
} from 'react';

import Moment from 'moment';

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
      description,
    } = this.props;

    return (
      <div>
        {description}
      </div>
    );
  }
}
