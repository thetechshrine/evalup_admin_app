import React from 'react';
import { Flex } from '@chakra-ui/core';

import dimens from '../../config/dimens';
import { childrenPropType } from '../../utils/default-prop-types';

function Section({ children }) {
  return (
    <Flex ml={dimens.sidebarWidth} padding={8} flex='1' flexDirection='column' overflowY='auto'>
      {children}
    </Flex>
  );
}

Section.propTypes = {
  children: childrenPropType
};

export default Section;
