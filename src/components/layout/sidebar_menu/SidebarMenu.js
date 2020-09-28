import React from 'react';
import { Box } from '@chakra-ui/core';

import { childrenPropType } from '../../../utils/default-prop-types';

import Icons from './Icons';
import SidebarMenuItem from './SidebarMenuItem';

function SidebarMenu({ children }) {
  return (
    <Box padding='2.5rem 2rem' overflowY='auto'>
      {children}
    </Box>
  );
}

SidebarMenu.propTypes = {
  children: childrenPropType
};
SidebarMenu.Item = SidebarMenuItem;

export { Icons };
export default SidebarMenu;
