import React from 'react';
import { Heading } from '@chakra-ui/core';

function Logo(props) {
  return (
    <Heading as='h1' fontSize='2rem' letterSpacing='-.2rem' textAlign='center' {...props}>
      SAMAPP
    </Heading>
  );
}

export default Logo;
