import React from 'react';

import s from './style.scss';

const Loading = () => (
  <div className={s.loading}>
    <img
      alt="Loading"
      src={require('static/loader.gif')}
    />
  </div>
);

export default Loading;
