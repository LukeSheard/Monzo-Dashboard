import DevTools from 'components/dev-tools';
import Header from 'components/header';
import Helmet from 'react-helmet';
import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Grid,
} from 'react-bootstrap';

const {
  NODE_ENV,
} = process.env;
const _DEV_ = (NODE_ENV || 'development') !== 'production';

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
      <div id="monzo-app">
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
          ].concat(_DEV_ ? [] : [
            {
              rel: 'stylesheet',
              href: '/static/style.css',
              type: 'text/css',
            },
          ])}
          meta={[
            {
              charset: 'UTF-8',
            },
            {
              name: 'description',
              content: 'A Monzo dashboard application to check your online finances',
            },
            {
              name: 'keywords',
              content: 'Monzo,GetMonzo,Finance',
            },
            {
              name: 'Author',
              content: 'Luke Sheard',
            },
          ]}
          titleTemplate="%s | Monzo Dashboard"
        />
        {(_DEV_ && isMounted) && <DevTools />}
        <Header />
        <Grid componentClass="main">
					{children}
        </Grid>
      </div>
    );
  }
}
