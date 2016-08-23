import {
  reduxForm,
} from 'redux-form';

import React, {
  Component,
  PropTypes,
} from 'react';

import {
  Button,
  Col,
  Form,
} from 'react-bootstrap';

import FormField from 'components/form/field';

export const reduxFormConfig = {
  form: 'transactionSearch',
  fields: [
    'search',
  ],
};

@reduxForm(reduxFormConfig)
export default class SearchTransactionForm extends Component {
  static propTypes = {
    fields: PropTypes.shape({
      search: PropTypes.object,
    }),
  }

  render() {
    const {
      fields: {
        search,
      },
    } = this.props;

    return (
      <Form>
        <Col sm={12}>
          <FormField
            placeholder="Search transactions"
            {...search}
          />
        </Col>
        <Col sm={4} smOffset={8}>
          <Button block type="submit">
            Search
          </Button>
        </Col>
      </Form>
    );
  }
}
