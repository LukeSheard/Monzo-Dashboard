import React, {
  Component,
} from 'react';

import userIsNotAuthenticated from 'decorators/user-is-not-authenticated';

@userIsNotAuthenticated
export default class Login extends Component {
  render() {
    return (
      <div>
        <a href="/token/forward">
          Login
        </a>
      </div>
    );
  }
}
