import React, {
  PropTypes,
} from 'react';

import moment from 'moment';

import {
  Row,
  Panel,
} from 'react-bootstrap';

import s from './style';

const Transaction = ({
  merchant,
  description,
  settled,
}) => (
  <div className={s.transaction}>
    <header>
      <h2 className={s.transactionName}>
        {merchant ? merchant.name : description}
      </h2>
      <small className={s.transactionDate}>
        {moment(new Date(settled)).fromNow()}
      </small>
    </header>
  </div>
);

Transaction.propTypes = {
  merchant: PropTypes.object,
  description: PropTypes.string,
  settled: PropTypes.string,
};

export default Transaction;
