import React from 'react';

import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';

import { Helmet } from 'react-helmet';

import routes from '../client/routes';

export default (req, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        {renderRoutes(routes)}
      </StaticRouter>
    </Provider>
  );

  const helmet = Helmet.renderStatic()

  return `
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
        <link href="/app.css" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <div id='root'>${content}</div>

        <script>window.INITIAL_STATE = ${serialize(store.getState())}</script>
        <script src='/bundle.js'></script>
      </body>
    </html>
  `;
}
