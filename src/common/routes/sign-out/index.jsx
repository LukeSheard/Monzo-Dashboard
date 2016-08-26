import React, {
  Component,
  PropTypes,
} from 'react';

import {
  connect,
} from 'react-redux';

import {
  goBack,
  push,
} from 'react-router-redux';

import {
  Button,
  Col,
  Grid,
  Jumbotron,
  PageHeader,
  Row,
} from 'react-bootstrap';

import {
  removeToken,
} from 'store/session/duck';

export const mapStateToProps = () => ({});

export const mapDispatchToProps = (dispatch) => ({
  onCancel: () => dispatch(goBack()),
  signOut: () => {
    dispatch(removeToken());
    dispatch(push('/'));
  },
});

@connect(mapStateToProps, mapDispatchToProps)
export default class SignOut extends Component {
  static propTypes = {
    onCancel: PropTypes.func,
    signOut: PropTypes.func,
  }

  render() {
    const {
      onCancel,
      signOut,
    } = this.props;

    return (
      <Jumbotron>
        <Grid>
          <Row>
            <PageHeader>
              Confirm
            </PageHeader>
            <p>
              Confirm that you want to sign out from the application.
            </p>
          </Row>
          <Row>
            <Col sm={4} smOffset={2} onClick={signOut}>
              <Button block bsStyle="danger">
                Confirm
              </Button>
            </Col>
            <Col sm={4} smOffset={1}>
              <Button block bsStyle="primary" onClick={onCancel}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Grid>
      </Jumbotron>
    );
  }
}
