import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@chakra-ui/core';
import styled from 'styled-components';

const activeState = {
  color: 'white',
  backgroundColor: 'purple.500',
  backgroundColorHex: '#805AD5'
};

const hoverState = {
  backgroundColor: '#C4F1F9'
};

const defaultState = {
  color: 'gray.400'
};

function SidebarMenuItem({ className, icon, title, active = false, url = '/' }) {
  return (
    <NavLink to={url}>
      <Box
        className={className}
        padding={5}
        rounded={15}
        backgroundColor={active ? activeState.backgroundColor : ''}
        color={active ? activeState.color : defaultState.color}
      >
        <Stack isInline spacing={4} alignItems='center'>
          <Box as={icon} size='1.5rem' />
          <Text fontSize='lg' fontWeight='500'>
            {title}
          </Text>
        </Stack>
      </Box>
    </NavLink>
  );
}

SidebarMenuItem.propTypes = {
  className: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool,
  url: PropTypes.string
};

export default styled(SidebarMenuItem)`
  transition: all 300ms;

  :hover {
    background-color: ${(props) => (props.active ? activeState.backgroundColorHex : hoverState.backgroundColor)};
  }
`;
