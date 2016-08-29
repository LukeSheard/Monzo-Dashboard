import React, {
  Component,
  PropTypes,
} from 'react';

import {
  reduxForm,
} from 'redux-form';

import {
  Button,
  Col,
  Form,
  Row,
} from 'react-bootstrap';

import DateField from 'components/form/date';

export const reduxFormProps = {
  form: 'TransactionListFilters',
  fields: [
    'startDate',
    'endDate',
  ],
};

@reduxForm(reduxFormProps)
export default class TransactionFilters extends Component {
  static propTypes = {
    fields: PropTypes.shape({
      startDate: PropTypes.object,
      endDate: PropTypes.object,
    }),
  }

  render() {
    const {
      fields: {
        startDate,
        endDate,
      },
    } = this.props;

    return (
      <Form>
        <Row>
          <Col xs={6} md={4}>
            <DateField
              label="Start Date"
              {...startDate}
              todayButton
              disabled
            />
          </Col>
          <Col xs={6} md={4}>
            <DateField
              label="End Date"
              {...endDate}
              todayButton
              disabled
            />
          </Col>
          <Col xs={12} md={4}>
            <Button block disabled>
              Advanced
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
