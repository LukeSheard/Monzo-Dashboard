import React, {
  Component,
  PropTypes,
} from 'react';

import Area from 'components/Area';

import {
  loadAccounts,
} from './Account.Saga';

export default class Account extends Component {
  static propTypes = {
    children: PropTypes.any,
  }

  static preload() {
    return [
      loadAccounts,
    ];
  }

  render() {
    const {
      children,
    } = this.props;

    return (
      <Area>
        {children}
      </Area>
    );
  }
}
