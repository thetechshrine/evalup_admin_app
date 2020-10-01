import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Heading, Stack, Button } from '@chakra-ui/core';

import GroupSelector from '../../core/groups/GroupSelector';

function BlockHeader({
  title,
  showActionButton = true,
  showGroupSelector = false,
  onGroupChange,
  includeGroupSelectorFirstEmptyItem,
  openDrawerLabel,
  onOpenDrawer
}) {
  return (
    <Flex justifyContent='space-between' alignItems='center'>
      <Heading>{title}</Heading>
      <Stack direction='row' spacing={4}>
        {showGroupSelector && (
          <GroupSelector onGroupChange={onGroupChange} includeEmptyFirstItem={includeGroupSelectorFirstEmptyItem} />
        )}

        {showActionButton && (
          <Button variant='outline' colorScheme='purple' size='lg' onClick={onOpenDrawer}>
            {openDrawerLabel}
          </Button>
        )}
      </Stack>
    </Flex>
  );
}

BlockHeader.propTypes = {
  title: PropTypes.string.isRequired,
  openDrawerLabel: PropTypes.string.isRequired,
  onOpenDrawer: PropTypes.func.isRequired,
  showGroupSelector: PropTypes.bool,
  onGroupChange: PropTypes.func,
  includeGroupSelectorFirstEmptyItem: PropTypes.bool,
  showActionButton: PropTypes.bool
};

export default BlockHeader;
