import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { Flex, Box } from '@chakra-ui/core';

import { privateRoutes } from '../../routes';

import Sidebar from './Sidebar';
import Section from './Section';
import Breadcrumb from './Breadcrumb';
import PrivateRoute from '../helpers/PrivateRoute';

function displayPrivateRoutes() {
  return privateRoutes.map((privateRoute) => (
    <PrivateRoute
      exact={!!privateRoute.exactPath}
      key={privateRoute.key}
      path={privateRoute.path}
      component={privateRoute.component}
    />
  ));
}

function Main() {
  return (
    <Box flex='1' position='relative'>
      <Flex>
        <Sidebar />

        <Section>
          <Breadcrumb />
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/home' />} />
            {displayPrivateRoutes()}
          </Switch>
        </Section>
      </Flex>
    </Box>
  );
}

export default Main;
