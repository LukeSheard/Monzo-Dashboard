import React, {
  Component,
  PropTypes,
} from 'react';

import {
  connect,
} from 'react-redux';

import {
  goBack,
} from 'react-router-redux';

import {
  Button,
  Col,
  Grid,
  Jumbotron,
  PageHeader,
  Row,
} from 'react-bootstrap';

export const mapStateToProps = () => ({});

export const mapDispatchToProps = (dispatch) => ({
  onCancel: () => dispatch(goBack()),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class SignOut extends Component {
  static propTypes = {
    onCancel: PropTypes.func,
  }

  render() {
    const {
      onCancel,
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
            <Col sm={4} smOffset={1}>
              <Button block bsStyle="danger" onClick={onCancel}>
                Cancel
              </Button>
            </Col>
            <Col sm={4} smOffset={2}>
              <Button block bsStyle="primary">
                Confirm
              </Button>
            </Col>
          </Row>
        </Grid>
      </Jumbotron>
    );
  }
}
