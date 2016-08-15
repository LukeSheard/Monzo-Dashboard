import React from 'react';

import {
  Link
} from 'react-router';

export default () => (
  <div>
    <div>
      <a href="/api/forward">
        Login
      </a>
    </div>
    <Link to="/dashboard">
      Dashboard
    </Link>
  </div>
);
