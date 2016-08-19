import {
  get,
} from 'lodash/fp';

import {
  createSelector,
} from 'reselect';

export default createSelector(get('session.data.bearer'), token => token);
