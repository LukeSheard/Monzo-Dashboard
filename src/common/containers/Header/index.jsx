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

import {
  Link,
} from 'react-router';

import s from './style';

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
      <Navbar className={s.header} inverse>
        <Navbar.Header>
          <Navbar.Brand className={s.brand}>
            <Link to="/">
              <img
                alt="Mondo Logo"
                className={s.brandLogo}
                src={require('static/logo_horz_darkbg.png')}
                style={{
                  height: '36px',
                }}
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {loggedIn ? (
            <Nav pullRight>
              <NavItem href="/dashboard">
                Dashboard
              </NavItem>
              <NavItem href="/settings">
                Settings
              </NavItem>
              <NavItem href="/sign-out">
                Sign Out
              </NavItem>
            </Nav>
          ) : (
            <Nav pullRight>
              <NavItem href="/api/forward">
                Login
              </NavItem>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
