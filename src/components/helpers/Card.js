import React from 'react';
import { Box } from '@chakra-ui/core';
import { childrenPropType } from '../../utils/default-prop-types';

function Card({ children, ...otherProps }) {
  return (
    <Box backgroundColor='white' rounded={5} boxShadow='0px 0px 10px 0 rgba(0, 0, 0, 0.1)' {...otherProps}>
      {children}
    </Box>
  );
}

Card.propTypes = {
  children: childrenPropType
};

export default Card;
