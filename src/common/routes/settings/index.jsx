import React, {
  Component,
  PropTypes,
} from 'react';

import {
  Button,
  Col,
  Form,
  Row,
} from 'react-bootstrap';

import {
  reduxForm,
} from 'redux-form';

import {
  Actions as accountActions,
} from 'views/dashboard';

import {
  getAccounts,
  getSelectedIndex,
} from 'store/accounts/selectors';

import Select from 'components/form/select';

export const formDetails = {
  destroyOnUnmount: false,
  form: 'Settings',
  fields: [
    'activeAccount',
  ],
  asyncBlurFields: [
    'activeAccount',
  ],
};

export const mapStateToProps = (state) => ({
  accounts: getAccounts(state),
  initialValues: {
    activeAccount: getSelectedIndex(state),
  },
});

export const mapDispatchToProps = (dispatch) => ({
  asyncValidate: ({ activeAccount }) => new Promise((resolve) => {
    resolve(dispatch(accountActions.primeAccount(activeAccount)));
  }),
  onSubmit: ({ activeAccount }) => dispatch(accountActions.primeAccount(activeAccount)),
});

@reduxForm(formDetails, mapStateToProps, mapDispatchToProps)
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
    handleSubmit: PropTypes.func.isRequired,
  }

  render() {
    const {
      accounts,
      fields: {
        activeAccount,
      },
      handleSubmit,
    } = this.props;

    return (
      <Row>
        <Col sm={6}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col sm={12}>
                <Select {...activeAccount} label="Select active account">
                  {accounts.map((account, index) => (
                    <option key={index} value={index}>
                      {account.description}
                    </option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row>
              <Col sm={6} smPush={6}>
                <Button
                  block
                  bsStyle="primary"
                  type="submit"
                >
                  Refresh
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    );
  }
}
