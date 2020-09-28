import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ChakraProvider, CSSReset } from '@chakra-ui/core';

import { publicRoutes } from '../routes';

import NotificationProvider from './providers/Notification';
import PublicRoute from './helpers/PublicRoute';

function displayPublicRoutes() {
  return publicRoutes.map((publicRoute) => (
    <PublicRoute key={publicRoute.key} path={publicRoute.path} component={publicRoute.component} />
  ));
}

function App() {
  return (
    <ChakraProvider>
      <CSSReset />

      <NotificationProvider>
        <Router>
          <Switch>{displayPublicRoutes()}</Switch>
        </Router>
      </NotificationProvider>
    </ChakraProvider>
  );
}

export default App;
