import React, { useEffect } from 'react';
import { Flex } from '@chakra-ui/core';
import { useDispatch } from 'react-redux';

import authActions from '../../store/actions/auth';
import storage from '../../utils/storage';

import Navbar from './Navbar';
import Main from './Main';
import ConfirmationDialog from '../helpers/dialogs/ConfirmationDialog';
import Loading from '../helpers/Loading';

function Layout() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (storage.isAuthenticate()) dispatch(authActions.getUserProfile());
  }, [dispatch]);

  return (
    <Flex flexDirection='column'>
      <Navbar />
      <Main />

      <ConfirmationDialog />
      <Loading />
    </Flex>
  );
}

export default Layout;
