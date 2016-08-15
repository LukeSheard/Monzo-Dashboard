import React, {
  Component,
  PropTypes,
} from 'react';

import {
  connect,
} from 'react-redux';

import {
  Col,
  Form,
  FormControl,
  Grid,
  PageHeader,
  Row,
} from 'react-bootstrap';

import {
  loadAccounts,
} from './Dashboard.Saga';

import {
  getAccounts,
  getSelectedAccount,
} from './Dashboard.Selectors';

@connect((state) => ({
  accounts: getAccounts(state),
  selectedAccount: getSelectedAccount(state),
}))
export default class Dashboard extends Component {
  static propTypes = {
    accounts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      description: PropTypes.string,
      created: PropTypes.string,
    })),
    children: PropTypes.any,
    selectedAccount: PropTypes.shape({
      id: PropTypes.string,
      description: PropTypes.string,
      created: PropTypes.string,
    }),
  }

  static preload() {
    return [
      loadAccounts,
    ];
  }

  render() {
    const {
      accounts,
      children,
      selectedAccount,
    } = this.props;

    return (
      <Grid>
        <Row>
          <Col sm={6}>
            <PageHeader>
              Transactions
            </PageHeader>
            <div>
              <h4>
                Select Account
              </h4>
              <Form>
                <FormControl componentClass="select" placeholder="select">
                  {accounts.map((account, index) => (
                    <option key={index} value={index}>
                      {account.description}
                    </option>
                  ))}
                </FormControl>
              </Form>
            </div>
          </Col>
          <Col sm={6}>
            {children}
          </Col>
        </Row>
      </Grid>
    );
  }
}
