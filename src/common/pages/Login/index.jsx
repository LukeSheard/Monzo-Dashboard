import React, {
  Component,
  PropTypes,
} from 'react';

import {
  connect,
} from 'react-redux';

import {
  Button
} from 'react-bootstrap';

import {
  Actions as dashboardActions,
} from 'pages/Dashboard';

@connect(() => ({}), (dispatch) => ({
  viewDashboard: (e) => {
    e.preventDefault();
    dispatch(dashboardActions.attemptToRetrieveAccounts());
  },
}))
export default class Login extends Component {
  static propTypes = {
    viewDashboard: PropTypes.func,
  }

  render() {
    const {
      viewDashboard,
    } = this.props;

    return (
      <div>
        <div>
          <a href="/api/forward">
            Login
          </a>
        </div>
        <Button onClick={viewDashboard} href="/dashboard">
          Dashboard
        </Button>
      </div>
    );
  }
}
