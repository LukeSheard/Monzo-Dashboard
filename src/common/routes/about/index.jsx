import Helmet from 'react-helmet';
import React, {
  Component,
} from 'react';
import {
  Col,
  PageHeader,
  Row,
} from 'react-bootstrap';

export default class About extends Component {
  render() {
    return (
      <div>
        <Helmet title="About" />
        <Row>
          <Col sm={12}>
            <PageHeader>
              <div>
                Monzo Dashboard
              </div>
              <div>
                <small>A simple tool for checking your Monzo balance online</small>
              </div>
            </PageHeader>
          </Col>
        </Row>
        <Row>
          <Col sm={7}>
            <h2>
              Review your transactions
            </h2>
          </Col>
        </Row>
      </div>
    );
  }
}
