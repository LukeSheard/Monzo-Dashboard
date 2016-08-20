import React, {
  Component,
  PropTypes,
} from 'react';

import {
  Grid,
} from 'react-bootstrap';

import Header from 'components/header';

export default class Public extends Component {
  static propTypes = {
    children: PropTypes.any,
  }

  render() {
    const {
      children,
    } = this.props;

    return (
      <div>
        <Header />
        <main>
          <Grid>
            {children}
          </Grid>
        </main>
      </div>
    );
  }
}
