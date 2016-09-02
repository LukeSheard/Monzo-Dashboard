import React, {
  Component,
  PropTypes,
} from 'react';
import {
  get,
} from 'lodash/fp';
import {
  Nav,
  Navbar,
  NavItem,
} from 'react-bootstrap';
import {
  connect,
} from 'react-redux';
import {
  Link,
} from 'react-router';
import {
  IndexLinkContainer,
  LinkContainer,
} from 'react-router-bootstrap';
import {
  tokenValid,
} from 'store/session/selectors';

import s from './style.scss';

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
                alt="Monzo Logo"
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
            <LinkContainer to="/about">
              <NavItem href="/about">
                About
              </NavItem>
            </LinkContainer>
            {loggedIn ? (
              <IndexLinkContainer to="/dashboard/transactions">
                <NavItem href="/dashboard/transactions">
                  Dashboard
                </NavItem>
              </IndexLinkContainer>
            ) : null}
            {loggedIn ? (
              <LinkContainer to="/dashboard/settings">
                <NavItem href="/dashboard/settings">
                  Settings
                </NavItem>
              </LinkContainer>
            ) : null}
            {loggedIn ? (
              <LinkContainer to="/dashboard/sign-out">
                <NavItem href="/dashboard/sign-out">
                  Sign Out
                </NavItem>
              </LinkContainer>
            ) : null}
            {loggedIn ? null : (
              <LinkContainer to="/login">
                <NavItem href="/login">
                  Login
                </NavItem>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
