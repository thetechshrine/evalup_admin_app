import React from 'react';
import { Box } from '@chakra-ui/core';

import dimens from '../../config/dimens';
import { privateRoutes } from '../../routes';

import SidebarMenu from './sidebar_menu/SidebarMenu';

function displaySidebarMenu() {
  return privateRoutes
    .filter((privateRoute) => privateRoute.sidebarMenu)
    .map((privateRoute) => (
      <SidebarMenu.Item
        key={privateRoute.key}
        icon={privateRoute.icon}
        title={privateRoute.title}
        url={privateRoute.path}
        active={window.location.pathname === privateRoute.path}
      />
    ));
}

function Sidebar() {
  return (
    <Box
      position='fixed'
      top={dimens.navbarHeight}
      bottom='0'
      width={dimens.sidebarWidth}
      background='#fafafa'
      boxShadow='inset 1px 0 5px 0 rgba(0, 0, 0, 0.1)'
    >
      <SidebarMenu>{displaySidebarMenu()}</SidebarMenu>
    </Box>
  );
}

export default Sidebar;
