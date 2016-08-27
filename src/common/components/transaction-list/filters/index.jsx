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

export const mapStateToProps = () => ({});

export const mapDispatchToProps = () => ({
  onSubmit: (values) => console.log(values),
});

@reduxForm(reduxFormProps, mapStateToProps, mapDispatchToProps)
export default class TransactionFilters extends Component {
  static propTypes = {
    fields: PropTypes.shape({
      startDate: PropTypes.object,
      endDate: PropTypes.object,
    }),
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
  }

  render() {
    const {
      fields: {
        startDate,
        endDate,
      },
      handleSubmit,
      resetForm,
    } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={6} md={3}>
            <DateField
              label="Start Date"
              {...startDate}
            />
          </Col>
          <Col xs={6} md={3}>
            <DateField
              label="End Date"
              todayButton
              {...endDate}
            />
          </Col>
          <Col xs={4} md={2}>
            <Button block disabled>
              Advanced
            </Button>
          </Col>
          <Col xs={4} md={2}>
            <Button
              block
              type="reset"
              onClick={resetForm}
            >
              Reset
            </Button>
          </Col>
          <Col xs={4} md={2}>
            <Button
              block
              bsStyle="primary"
              type="submit"
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
