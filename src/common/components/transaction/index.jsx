import React, {
  Component,
  // PropTypes,
} from 'react';

import {
  connect,
} from 'react-redux';

// import Moment from 'moment';

import {
  Clearfix,
} from 'react-bootstrap';

// import {
//   FormattedNumber,
// } from 'react-intl';

import {
  getTransaction,
} from 'store/transaction/selectors';

export const mapStateToProps = getTransaction;

@connect(mapStateToProps)
export default class Transaction extends Component {

  render() {
    return (
      <Clearfix componentClass="section">
        Sup
      </Clearfix>
    );
  }
}
