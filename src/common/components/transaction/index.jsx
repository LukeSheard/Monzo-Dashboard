import React, {
  Component,
  PropTypes,
} from 'react';

import Load from './load';

export default class Transaction extends Component {
  static propTypes = {
    load: PropTypes.bool,
    transaction: PropTypes.object,
  }

  render() {
    const {
      load,
      ...transaction,
    } = this.props;

    switch (load) {
      case true: {
        return <Load {...transaction} />;
      }
      default: {
        return (
          <div>
            Hello
          </div>
        );
      }
    }
  }
}
