import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/core';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import groupsActions from '../../../store/actions/groups';
import { GROUP_SELECTOR_EMPTY_FIRST_ITEM_ID, GROUP_SELECTOR_EMPTY_FIRST_ITEM_CODE } from '../../../utils/consts';

function GroupSelector({ onGroupChange, includeEmptyFirstItem = false }) {
  const dispatch = useDispatch();
  const { groups } = useSelector((state) => state.groups);
  if (includeEmptyFirstItem === true) {
    if (groups && groups.length > 0) {
      const foundGroup = groups.find((group) => group.id === GROUP_SELECTOR_EMPTY_FIRST_ITEM_ID);
      if (!foundGroup) {
        groups.unshift({
          id: GROUP_SELECTOR_EMPTY_FIRST_ITEM_ID,
          code: GROUP_SELECTOR_EMPTY_FIRST_ITEM_CODE
        });
      }
    }
  }

  useEffect(() => {
    dispatch(groupsActions.getGroups());
  }, [dispatch]);

  const [selectorLabel, setSelectorLabel] = useState('');

  function handleSelect(group) {
    setSelectorLabel(group.code);
    onGroupChange(group);
  }
  useEffect(() => {
    if (groups && groups.length > 0 && ['', GROUP_SELECTOR_EMPTY_FIRST_ITEM_CODE].includes(selectorLabel)) {
      handleSelect(groups[0]);
    }
  }, [groups]);

  function displayGroups() {
    return groups.map((group) => (
      <MenuItem margin='0' key={group.id} padding={2} onClick={() => handleSelect(group)}>
        <Text fontSize='xl'>{group.code}</Text>
      </MenuItem>
    ));
  }

  return (
    <Menu placement='bottom-end'>
      <MenuButton size='lg' variant='outline' as={Button} rightIcon={<ChevronDownIcon />}>
        <Text>{selectorLabel}</Text>
      </MenuButton>
      <MenuList>{displayGroups()}</MenuList>
    </Menu>
  );
}

GroupSelector.propTypes = {
  onGroupChange: PropTypes.func.isRequired,
  includeEmptyFirstItem: PropTypes.bool
};

export default GroupSelector;
