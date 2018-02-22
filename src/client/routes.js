import React from 'react';

import { renderRoutes } from 'react-router-config';

import { Route } from 'react-router-dom';

import Nav from './components/Nav';

import Dash from './pages/Dash';
import Auth from './pages/Auth';

const App = ({ route }) => {
  return (
    <main id='App'>
      <Route component={Nav} />

      {renderRoutes(route.routes)}
    </main>
  );
};

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        component: Dash,
        exact: true,
      },
      {
        path: '/auth',
        component: Auth,
      },
    ]
  }
];

export default routes;
