import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Box, Stack, Text } from '@chakra-ui/core';

function NavbarAction({ icon, title, ...otherProps }) {
  return (
    <MenuItem {...otherProps} padding={3}>
      <Stack isInline spacing={4} alignItems='center'>
        <Box as={icon} size='1.5rem' />
        <Text>{title}</Text>
      </Stack>
    </MenuItem>
  );
}

NavbarAction.propTypes = {
  icon: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired
};

export default NavbarAction;
