import React, { useEffect, useContext } from 'react';
import { SimpleGrid } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import groupsActions from '../../store/actions/groups';

import { NotificationContext } from '../providers/Notification';
import Block from '../helpers/Block';
import GroupDrawer from '../core/groups/drawers/GroupDrawer';
import Group from '../core/groups/Group';
import useDisclosure from '../hooks/useDisclosure';

function Groups() {
  const dispatch = useDispatch();
  const notification = useContext(NotificationContext);
  const { groups, loading } = useSelector((state) => state.groups);
  const { shown, open, close } = useDisclosure();

  function handleSaveGroup(group) {
    close();
    dispatch(
      groupsActions.createGroup({
        group,
        notification
      })
    );
  }

  useEffect(() => {
    dispatch(groupsActions.getGroups());
  }, [dispatch]);

  function displayGroups() {
    return (
      <SimpleGrid columns={4} spacing={10}>
        {groups.map((group) => (
          <Group key={group.id} group={group} />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <>
      <Block>
        <Block.Header title='Classes' openDrawerLabel='Créer' onOpenDrawer={open} />
        <Block.Main loading={loading} dataLength={groups.length} emptyDataMessage='Aucune classe enregistrée'>
          {displayGroups()}
        </Block.Main>
      </Block>

      <GroupDrawer shown={shown} onClose={close} onSave={handleSaveGroup} />
    </>
  );
}

export default Groups;
