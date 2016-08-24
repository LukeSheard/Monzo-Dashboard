import React, {
  Component,
  PropTypes,
} from 'react';

import {
  Grid,
} from 'react-bootstrap';

import Helmet from 'react-helmet';

import DevTools from 'components/dev-tools';
import Header from 'components/header';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.any,
  }

  componentWillMount() {
    this.setState({ isMounted: false });
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ isMounted: true });
  }

  render() {
    const {
      children,
    } = this.props;
    const {
      isMounted,
    } = this.state;

    return (
      <div id="mondo-app">
        <Helmet
          defaultTitle="Home"
          htmlAttributes={{
            lang: 'en',
          }}
          link={[
            {
              rel: 'icon',
              href: require('static/mark_isolated.png'),
              type: 'image/x-icon',
            },
          ]}
          meta={[
            {
              charset: 'UTF-8',
            },
            {
              name: 'description',
              content: 'A Mondo dashboard application to check your online finances',
            },
            {
              name: 'keywords',
              content: 'Mondo,GetMondo,Finance',
            },
            {
              name: 'Author',
              content: 'Luke Sheard',
            },
          ]}
          titleTemplate="%s | Mondo Dashboard"
        />
        {isMounted && <DevTools />}
        <Header />
        <Grid componentClass="main">
					{children}
        </Grid>
      </div>
    );
  }
}
