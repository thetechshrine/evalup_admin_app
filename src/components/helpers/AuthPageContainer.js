import React from 'react';
import { Box, Flex, Stack } from '@chakra-ui/core';

import { childrenPropType } from '../../utils/default-prop-types';

import Card from './Card';
import Logo from './Logo';

function AuthPageContainer({ children }) {
  return (
    <Flex height='100vh' backgroundColor='#EBF8FF'>
      <Box flex={1} overflowY='auto'>
        <Stack spacing={3} width='32rem' margin='5rem auto'>
          <Logo color='purple.500' />
          <Card padding={10}>{children}</Card>
        </Stack>
      </Box>
    </Flex>
  );
}

AuthPageContainer.propTypes = {
  children: childrenPropType
};

export default AuthPageContainer;
