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
  tokenValid,
} from 'selectors/token';

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
  activeUrl: get('routing.locationBeforeTransitions.pathname', state),
  loggedIn: tokenValid(state),
}))
export default class Header extends Component {
  static propTypes = {
    activeUrl: PropTypes.string,
    loggedIn: PropTypes.bool,
  }

  static defaultProps = {
    loggedIn: false,
  }

  render() {
    const {
      activeUrl,
      loggedIn,
    } = this.props;

    return (
      <Navbar className={s.header} componentClass="header" inverse>
        <Navbar.Header>
          <Navbar.Brand className={s.brand}>
            <Link to="">
              <img
                alt="Mondo Logo"
                className={s.brandLogo}
                src={require('static/logo_dark.png')}
                style={{
                  height: '36px',
                }}
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav activeHref={activeUrl} className={s.nav} pullRight>
            <NavItem href="/about">
              About
            </NavItem>
            {loggedIn ? (
              <NavItem href="/dashboard">
                Dashboard
              </NavItem>
            ) : null}
            {loggedIn ? (
              <NavItem href="/dashboard/settings">
                Settings
              </NavItem>
            ) : null}
            {loggedIn ? (
              <NavItem href="/dashboard/sign-out">
                Sign Out
              </NavItem>
            ) : null}
            {loggedIn ? null : (
              <NavItem href="login">
                Login
              </NavItem>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
