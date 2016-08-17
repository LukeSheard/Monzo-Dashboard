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
  Selectors as accountSelectors,
} from 'pages/Account';

@connect((state) => ({
  accounts: accountSelectors.getAccounts(state),
  selectedAccount: accountSelectors.getSelectedAccount(state),
}))
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
    selectedAccount: PropTypes.shape({
      id: PropTypes.string,
      description: PropTypes.string,
      created: PropTypes.string,
    }),
  }

  static defaultProps = {
    accounts: [],
  }

  render() {
    const {
      accounts,
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
                    <option key={index} value={account.id}>
                      {account.description}
                    </option>
                  ))}
                </FormControl>
              </Form>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}
