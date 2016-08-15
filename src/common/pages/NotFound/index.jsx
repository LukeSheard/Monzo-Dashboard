import React, {
  Component,
  PropTypes,
} from 'react';

import {
  Link,
} from 'react-router';

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <h1>
          Not Found
        </h1>
        <div>
          <Link to="/dashboard">
            Return Home
          </Link>
        </div>
      </div>
    );
  }
}
