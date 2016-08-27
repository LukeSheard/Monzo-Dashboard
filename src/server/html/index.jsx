import React, {
  Component,
  PropTypes,
} from 'react';

import Helmet from 'react-helmet';

import {
  addLocaleData,
  IntlProvider,
} from 'react-intl';
import en from 'react-intl/locale-data/en';

import {
  renderToStaticMarkup,
} from 'react-dom/server';

import {
  Provider,
} from 'react-redux';

import {
  RouterContext,
} from 'react-router';

import {
  GoogleFont,
  TypographyStyle,
} from 'react-typography';

import typography from './typography';

addLocaleData(en);

export default class HTML extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    renderProps: PropTypes.object.isRequired,
  }

  static defaultProps = {
    initialState: {},
  }

  render() {
    const {
      store,
      renderProps,
    } = this.props;

    const body = renderToStaticMarkup(
      <div>
        <Provider store={store}>
          <IntlProvider locale="en">
            <RouterContext {...renderProps} />
          </IntlProvider>
        </Provider>
      </div>
    );

    const {
      htmlAttributes,
      title,
      base,
      meta,
      link,
      script,
    } = Helmet.rewind();

    return (
      <html lang="en" {...htmlAttributes.toComponent()}>
        <head>
          {base.toComponent()}
          {meta.toComponent()}
          {title.toComponent()}
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"
          />
          <GoogleFont typography={typography} />
          <TypographyStyle typography={typography} />
          {link.toComponent()}
        </head>
        <body>
          <div
            id="react-mount"
            dangerouslySetInnerHTML={{
              __html: body,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.INITIAL_STATE = ${JSON.stringify(store.getState())}`,
            }}
            type="text/javascript"
          ></script>
          <script
            src="/static/bundle.js"
            type="text/javascript"
          ></script>
        </body>
      </html>
    );
  }
}
