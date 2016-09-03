import React, {
  Component,
} from 'react';
import {
  getOr,
} from 'lodash/fp';
import {
  connect,
} from 'react-redux';

export const mapStateToProps = (state) => ({
  errorCode: getOr(500, 'routing.locationBeforeTransitions.query.code', state),
});

@connect(mapStateToProps)
export default class ErrorView extends Component {
  render() {
    console.log(this.props);

    return (
      <div>
        Error
      </div>
    );
  }
}
