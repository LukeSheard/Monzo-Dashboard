import React, {
  Component,
  PropTypes,
} from 'react';

import {
  Col,
  Form,
  Row,
} from 'react-bootstrap';

import {
  reduxForm,
} from 'redux-form';

import {
  getAccounts,
  getSelectedIndex,
} from 'selectors/accounts';

import Select from 'components/form/select';

export const formDetails = {
  destroyOnUnmount: false,
  form: 'Settings',
  fields: [
    'activeAccount',
  ],
};

export const mapStateToProps = (state) => ({
  accounts: getAccounts(state),
  initialValues: {
    activeAccount: getSelectedIndex(state),
  },
});

@reduxForm(formDetails, mapStateToProps)
export default class Settings extends Component {
  static propTypes = {
    accounts: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        description: PropTypes.string,
        created: PropTypes.string,
      })),
      PropTypes.array,
    ]),
    fields: PropTypes.shape({
      activeAccount: PropTypes.object,
    }),
    selectedIndex: PropTypes.number,
  }

  render() {
    const {
      accounts,
      fields: {
        activeAccount,
      },
    } = this.props;

    return (
      <Row>
        <Col sm={6}>
          <Form>
            <Select {...activeAccount} label="Select active account">
              {accounts.map((account, index) => (
                <option key={index} value={index}>
                  {account.description}
                </option>
              ))}
            </Select>
          </Form>
        </Col>
      </Row>
    );
  }
}
