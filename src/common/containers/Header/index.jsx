import {
  get,
} from 'lodash/fp';

import React, {
  Component,
  PropTypes,
} from 'react';

import {
  connect,
} from 'react-redux';

import {
  Nav,
  Navbar,
  NavItem,
} from 'react-bootstrap';

import s from './style.scss';

@connect((state) => ({
  loggedIn: get('session.data.token.exp', state) * 1000 > new Date().getTime(),
}))
export default class Header extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool
  }

  static defaultProps = {
    loggedIn: false,
  }

  render() {
    const {
      loggedIn,
    } = this.props;

    return (
      <Navbar className={s.header}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">
              Mondo Web Banking
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
        {loggedIn ? (
          <Nav pullRight>
            <NavItem href="/dashboard">
              Dashboard
            </NavItem>
            <NavItem href="/sign-out">
              Sign Out
            </NavItem>
          </Nav>
        ) : (
          <Nav pullRight>
            <NavItem href="/login">
              Login
            </NavItem>
          </Nav>
        )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
