import React, {
  Component,
  PropTypes,
} from 'react';

import {
  connect,
} from 'react-redux';

import {
  Link,
} from 'react-router';

import {
  Actions as accountActions,
} from 'contexts/dashboard';

export const mapStateToProps = () => ({});

export const mapDispatchToProps = (dispatch) => ({
  loadAccounts: () => dispatch(accountActions.attemptToRetrieveAccounts()),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class TransactionList extends Component {
  static propTypes = {
    loadAccounts: PropTypes.func,
  }

  render() {
    const {
      loadAccounts,
    } = this.props;

    return (
      <div>
        <h1>
          Transactions
        </h1>
        <div>
          <Link to="dashboard">
            Return to Dashboard
          </Link>
          <button onClick={loadAccounts}>
            Load Accounts again
          </button>
        </div>
      </div>
    );
  }
}
