import React, {
  Component,
  PropTypes,
} from 'react';

import Helmet from 'react-helmet';

import DevTools from 'components/dev-tools';

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
          base={{
            href: '/',
          }}
          defaultTitle="Home"
          htmlAttributes={{
            lang: 'en',
          }}

          meta={[
            {
              charset: 'UTF-8'
            },
            {
              name: 'description',
              content: 'A Mondo dashboard application to check your online finances'
            },
            {
              name: 'keywords',
              content: 'Mondo,GetMondo,Finance'
            },
            {
              name: 'Author',
              content: 'Luke Sheard'
            },
          ]}
          link={[
            {
              rel: 'icon',
              href: require('static/mark_isolated.png'),
              type: 'image/x-icon',
            }
          ]}
          titleTemplate="%s | Mondo Dashboard"
        />
        {isMounted && <DevTools />}
        {children}
      </div>
    );
  }
}
