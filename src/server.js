import sslRedirect from 'heroku-ssl-redirect';
import express from 'express';
import { matchRoutes } from 'react-router-config';

import proxy from 'express-http-proxy';

import favicon from 'serve-favicon';

import Routes from './client/routes';
import renderer from './utils/renderer';
import createStore from './utils/createStore';

import { API_URL } from './utils';

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(sslRedirect(['production'], 301));
}

app.use('/api', proxy(API_URL));

app.use(express.static('public'));


app.get('*', (req, res) => {
  const store = createStore(req);

  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData(store) : null;
    });

  Promise.all(promises).then(() => {
    return res.send(renderer(req, store));
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('listening on', port));
