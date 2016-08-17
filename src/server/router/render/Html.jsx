import React, {
  Component,
  PropTypes,
} from 'react';

import DocumentTitle from 'react-document-title';

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

    const body = (
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );

    return (
      <html>
        <head>
          <title>
            {DocumentTitle.rewind()}
          </title>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"
          />
          <GoogleFont typography={typography} />
          <TypographyStyle typography={typography} />
        </head>
        <body>
          <div
            id="react-mount"
            dangerouslySetInnerHTML={{
              __html: renderToStaticMarkup(body),
            }}
          ></div>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.INITIAL_STATE = ${JSON.stringify(store.getState())}`,
            }}
            type="text/javascript"
          ></script>
          <script
            src="/static/bundle.js"
            type="text/javascript"
          />
        </body>
      </html>
    );
  }
}
